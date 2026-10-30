<template>
	<div
		class="animodel"
		:class="{ 'is-interactive': canInteract, 'is-ready': ready }"
	>
		<div ref="container" class="animodel__stage"></div>

		<!-- 模型 4MB + Draco 解码器，慢网下必须给个加载反馈 -->
		<p v-if="mounted && !ready && !failed" class="animodel__loading">
			模型加载中{{ progress > 0 ? ` ${progress}%` : '…' }}
		</p>
		<p v-else-if="mounted && failed" class="animodel__loading is-error">
			模型加载失败，刷新页面重试
		</p>

		<!--
			底部文案（操作提示 + CC 署名）已按要求去掉，画布现在铺满整个容器。
			注意：Littlest Tokyo 的作者 Glen Fox 以 CC Attribution 协议发布，
			署名是授权条件。如果这个站点要公开发布，建议在页面某处（比如关于/致谢）
			保留一句 "Littlest Tokyo by Glen Fox · CC Attribution"。
		-->
	</div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

/**
 * three.js 官方示例 webgl_animation_keyframes 的 Vue 版
 * https://threejs.org/examples/#webgl_animation_keyframes
 *
 * 模型 LittlestTokyo.glb 是 Draco 压缩的（extensionsRequired: KHR_draco_mesh_compression），
 * 所以 public/draco/ 下的解码器必须一起存在，否则 GLTFLoader 会直接抛错。
 * 模型与解码器都本地化过，不依赖外网 CDN。
 */
const MODEL_PATH = '/models/gltf/LittlestTokyo.glb'
const DRACO_PATH = '/draco/'

const props = defineProps({
	/** 是否允许拖动旋转视角（触屏设备会自动关闭，避免抢占页面滚动） */
	interactive: { type: Boolean, default: true },
})

const container = ref(null)
const mounted = ref(false)
const ready = ref(false)
const failed = ref(false)
const progress = ref(0)
const canInteract = ref(false)

let disposeScene = null

onMounted(() => {
	const host = container.value
	if (!host) return

	// 触屏设备关闭交互：只做展示，避免 canvas 吃掉页面滚动
	const finePointer =
		typeof window.matchMedia === 'function'
			? window.matchMedia('(pointer: fine)').matches
			: true
	canInteract.value = props.interactive && finePointer

	// ---- 基础（以下参数与官方示例逐项对应）-----------------------------
	const scene = new THREE.Scene()

	// 官方示例：PerspectiveCamera( 40, aspect, 1, 100 ) + position.set( 5, 2, 8 )，
	// 注视点是 controls.target 的 (0, 0.5, 0)
	const TARGET = new THREE.Vector3(0, 0.5, 0)
	// 官方是全屏页，直接用它的机位；首页这块容器只有 500px 高、底部还要放提示文字，
	// 所以沿同一方向整体后拉 10%，让城市底座和底部文案之间留出空白。
	const BASE_DISTANCE = new THREE.Vector3(5, 2, 8).distanceTo(TARGET) * 1.1

	const camera = new THREE.PerspectiveCamera(40, 1, 1, 100)
	camera.position.set(5, 2, 8)

	const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
	// 官方用的是 devicePixelRatio，这里封顶 2：城市模型面数不少，再超采样没必要
	renderer.setPixelRatio(Math.min(Math.max(window.devicePixelRatio, 1), 2))
	// three 0.135 没有 outputColorSpace，只能设 outputEncoding，
	// 否则模型整体会偏暗/偏灰（线性当 sRGB 用）
	if ('outputEncoding' in renderer) renderer.outputEncoding = THREE.sRGBEncoding
	host.appendChild(renderer.domElement)

	// 环境光照：官方靠 RoomEnvironment 烘一张 PMREM 当 scene.environment，
	// 模型的玻璃和金属质感全靠它。官方还给了 scene.background = 0xbfe3dd，
	// 这里是首页里的一块区域，透明背景才能同时适配亮/暗色主题，所以不设背景。
	const pmrem = new THREE.PMREMGenerator(renderer)
	const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
	scene.environment = envTexture
	pmrem.dispose()

	// ---- 视角控制 ------------------------------------------------------
	let controls = null
	if (canInteract.value) {
		controls = new OrbitControls(camera, renderer.domElement)
		controls.target.copy(TARGET)
		controls.update()
		controls.enablePan = false
		controls.enableDamping = true
		// 官方示例是全屏页，滚轮缩放不影响别的东西；这里是首页中的一块，
		// 鼠标划过时吞掉滚轮会挡住页面滚动，所以把缩放关掉。
		controls.enableZoom = false
	}

	// ---- 加载模型 ------------------------------------------------------
	const dracoLoader = new DRACOLoader()
	dracoLoader.setDecoderPath(withBase(DRACO_PATH))

	const loader = new GLTFLoader()
	loader.setDRACOLoader(dracoLoader)

	let mixer = null
	let model = null
	// 卸载后别再往已经 dispose 的场景里塞东西
	let cancelled = false

	// 释放模型自带的几何/材质/贴图
	const disposeObject = (root) => {
		root.traverse((obj) => {
			if (!obj.isMesh) return
			obj.geometry?.dispose()
			const materials = Array.isArray(obj.material)
				? obj.material
				: [obj.material]
			materials.forEach((material) => {
				if (!material) return
				// 材质上挂的贴图（map/normalMap/emissiveMap…）也要一起释放
				Object.values(material).forEach((value) => {
					if (value && value.isTexture) value.dispose()
				})
				material.dispose()
			})
		})
	}

	loader.load(
		withBase(MODEL_PATH),
		(gltf) => {
			// 下载期间组件已经被卸载：把刚解析出来的资源直接丢掉，避免泄漏
			if (cancelled) {
				disposeObject(gltf.scene)
				return
			}

			model = gltf.scene
			// 模型原始单位很大，官方按 0.01 缩放并整体挪到 (1, 1, 0)
			model.position.set(1, 1, 0)
			model.scale.set(0.01, 0.01, 0.01)
			scene.add(model)

			// 关键帧动画：整个城市只有一条 clip（Take 001），循环播放
			mixer = new THREE.AnimationMixer(model)
			mixer.clipAction(gltf.animations[0]).play()

			ready.value = true
		},
		(event) => {
			// 服务器带 content-length 才有 total，拿不到就只显示「加载中…」
			if (event && event.total > 0) {
				progress.value = Math.min(
					99,
					Math.round((event.loaded / event.total) * 100)
				)
			}
		},
		(error) => {
			console.error('[AnimationModel] LittlestTokyo 模型加载失败：', error)
			failed.value = true
		}
	)

	// ---- 自适应 --------------------------------------------------------
	// 竖屏 / 窄屏时水平视野变窄，城市会被左右裁掉。
	// 这里只沿相机到注视点的方向调整距离，不动朝向，用户拖出来的角度不会被重置。
	let lastK = 0
	const resize = () => {
		const width = host.clientWidth
		const height = host.clientHeight
		if (!width || !height) return
		const aspect = width / height

		camera.aspect = aspect
		camera.updateProjectionMatrix()
		// 第三个参数 false：不写 inline 尺寸，显示尺寸交给 CSS。
		// 生产构建下 CSS 是外链，组件可能先于样式表挂载，此时会读到错误的容器高度；
		// 若同时写死 inline 尺寸，canvas 会把容器反过来撑大，形成不可恢复的错误布局。
		renderer.setSize(width, height, false)

		const k =
			aspect >= 1.5 ? 1 : Math.min(1 + (1.5 - aspect) * 0.6, 1.45)
		if (k !== lastK) {
			const offset = camera.position.clone().sub(TARGET)
			if (offset.lengthSq() > 1e-6) {
				offset.multiplyScalar((BASE_DISTANCE * k) / offset.length())
				camera.position.copy(TARGET).add(offset)
			}
			lastK = k
		}
	}
	const observer = new ResizeObserver(resize)
	observer.observe(host)
	resize()
	// 样式表可能晚于组件挂载，load 之后再校准一次相机比例
	const onWindowLoad = () => resize()
	if (document.readyState === 'complete') {
		requestAnimationFrame(onWindowLoad)
	} else {
		window.addEventListener('load', onWindowLoad, { once: true })
	}

	// ---- 渲染循环（离开视口或切到后台时暂停，省电）---------------------
	const clock = new THREE.Clock()
	let raf = 0
	let running = false

	const tick = () => {
		// 切回标签页时 getDelta 会很大，钳一下，否则动画会瞬间跳一大段
		const delta = Math.min(clock.getDelta(), 0.05)

		if (mixer) mixer.update(delta)
		if (controls) controls.update()

		renderer.render(scene, camera)
		raf = requestAnimationFrame(tick)
	}

	const start = () => {
		if (running) return
		running = true
		clock.start()
		raf = requestAnimationFrame(tick)
	}
	const stop = () => {
		running = false
		cancelAnimationFrame(raf)
	}

	/**
	 * 是否在视口内。必须自己记状态：
	 * IntersectionObserver 只在「相交状态变化」时回调，切到别的标签页再切回来时，
	 * 元素的相交状态没变过（一直在视口里），回调根本不会再触发。
	 * 所以「隐藏时 stop() 之后谁来 start()」只能靠 visibilitychange 自己判断，
	 * 两个信号合并成一个 applyVisibility()，缺一个就会出现
	 * 「切回来画布不动了、拖也没反应」的假死。
	 */
	let inViewport = true

	/**
	 * 切走时如果鼠标一直按着，pointerup 会丢在别的标签页里，
	 * OrbitControls 的内部 state 就卡在 ROTATE（回来不按键拖也会跟着转）。
	 * 回到前台时补发一个 pointerup 把它复位；没有监听者时就是个空操作。
	 */
	const releaseStuckPointer = () => {
		const doc = renderer.domElement.ownerDocument
		try {
			doc.dispatchEvent(
				new PointerEvent('pointerup', { pointerId: 1, bubbles: true })
			)
		} catch (error) {
			// 老浏览器没有 PointerEvent 构造器，忽略即可
		}
	}

	const applyVisibility = () => {
		const shouldRun =
			inViewport && document.visibilityState !== 'hidden'
		if (!shouldRun) {
			stop()
			return
		}
		if (!running) {
			// 只在「由停到跑」这一次做补偿，滚出滚进视口时不会误触发
			if (controls) {
				releaseStuckPointer()
				// 停掉的这段时间相机可能已经被拖动过，补渲染一帧
				controls.update()
			}
		}
		start()
	}

	const visibility = new IntersectionObserver(
		(entries) => {
			inViewport = entries.some((entry) => entry.isIntersecting)
			applyVisibility()
		},
		{ threshold: 0 }
	)
	visibility.observe(host)

	document.addEventListener('visibilitychange', applyVisibility)
	start()

	mounted.value = true

	// ---- 清理 ----------------------------------------------------------
	disposeScene = () => {
		cancelled = true
		stop()
		visibility.disconnect()
		document.removeEventListener('visibilitychange', applyVisibility)
		observer.disconnect()
		window.removeEventListener('load', onWindowLoad)

		if (mixer) {
			mixer.stopAllAction()
			mixer.uncacheRoot(mixer.getRoot())
			mixer = null
		}
		if (model) {
			scene.remove(model)
			disposeObject(model)
			model = null
		}

		if (controls) controls.dispose()
		dracoLoader.dispose()
		envTexture.dispose()
		renderer.dispose()
		renderer.domElement.remove()
	}
})

onBeforeUnmount(() => {
	disposeScene?.()
	disposeScene = null
})
</script>

<!--
	这里刻意不用 scoped：
	本组件是在 Home 里通过 <component :is> 动态渲染的，SSR 阶段动态组件会丢失
	scopeId（产物 CSS 是 .animodel[data-v-xxx]，而 DOM 上只有 class="animodel"），
	一旦 scoped，构建后样式整体失效，画布高度会塌成整个文档高度。
	类名统一用 animodel 前缀，全局不会冲突。
-->
<style>
.animodel {
	position: relative;
	width: 100%;
	height: 100%;
	min-height: 320px;
}

.animodel__stage {
	position: absolute;
	inset: 0;
	/* 模型加载完之后再淡入，避免先出现一个空白的 WebGL 画布 */
	opacity: 0;
	transition: opacity 0.5s ease;
}

.animodel.is-ready .animodel__stage {
	opacity: 1;
}

.animodel__stage canvas {
	display: block;
	width: 100%;
	height: 100%;
	pointer-events: none;
}

.animodel.is-interactive .animodel__stage canvas {
	pointer-events: auto;
	cursor: grab;
	touch-action: none;
}

.animodel.is-interactive .animodel__stage canvas:active {
	cursor: grabbing;
}

.animodel__loading {
	position: absolute;
	inset: 0;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	/* 用 !important 压住全局 .vp-doc p 的 margin */
	margin: 0 !important;
	font-size: 12px;
	letter-spacing: 0.08em;
	color: var(--vp-c-text-3);
	pointer-events: none;
}

.animodel__loading.is-error {
	color: var(--vp-c-danger-1, #e5484d);
}

/*
 * 底部文案区已移除（原来放「拖动旋转视角」提示和 CC 署名），
 * 画布现在铺满整个 .animodel 容器。若要把署名加回来，记得别用各自的 absolute 定位 ——
 * hint 是 <p>，绝对定位的 bottom 按 margin box 算，很容易和署名叠在一起（魔方组件踩过）。
 */
@media (max-width: 720px) {
	.animodel {
		min-height: 260px;
	}
}
</style>
