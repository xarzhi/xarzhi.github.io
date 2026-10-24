<template>
	<div class="rubik" :class="{ 'is-interactive': interactive, 'is-solving': solving }">
		<div ref="container" class="rubik__stage"></div>

		<!--
			右上角工具条：打乱 / 复位 / 一步一步自动复原。
			三个按钮必须放在同一个定位容器里，否则窄屏时各自绝对定位到右上角会互相重叠。
		-->
		<div v-if="mounted && showControls" class="rubik__toolbar">
			<button type="button" class="rubik__btn" :disabled="solving" @click="scramble">打乱</button>
			<button type="button" class="rubik__btn rubik__btn--ghost" :disabled="solving" @click="reset">复位</button>

			<!-- 一步一步自动还原：现算一条层先法（LBL）解法再逐步播放 -->
			<button
				type="button"
				class="rubik__restore"
				:disabled="solving || !canRestore"
				:title="canRestore ? '用层先法公式自动复原' : '魔方已经是还原状态'"
				@click="handleSolve"
			>
				<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
					<path
						d="M9 14.5 5 10.5l4-4"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M5 10.5h9a4.5 4.5 0 0 1 0 9h-2"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<span>{{ solving ? '复原中' : '复原' }}</span>
			</button>
		</div>
	</div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { createRubiksCube } from '../../three/rubiks'

const props = defineProps({
	/** 是否允许拖拽/滚轮交互（触屏设备会自动关闭，避免抢占页面滚动） */
	interactive: { type: Boolean, default: true },
	/** 是否显示右上角的打乱/复位/复原按钮 */
	showControls: { type: Boolean, default: true },
})

const container = ref(null)
const mounted = ref(false)
const cubeRef = shallowRef(null)

/** 正在自动复原：期间锁定一切手动操作 */
const solving = ref(false)
/** 是否还有可复原的转动（没有的话右上角按钮置灰） */
const canRestore = ref(false)

/** 键盘快捷键：F/R/U/B/L/D 顺时针，Shift 反向（仅鼠标悬停在魔方上时生效） */
const KEY_FACES = ['F', 'R', 'U', 'B', 'L', 'D']

let disposeScene = null

// 下面几个操作都会改变转动历史，顺手把「复原」按钮的可用状态一起更新，
// 不依赖渲染循环里的轮询（渲染循环在后台标签页/不可见时会停）。
const turn = (face, prime) => {
	cubeRef.value?.turn(face, prime)
	canRestore.value = true
}
const scramble = () => {
	cubeRef.value?.scramble()
	canRestore.value = true
}
const reset = () => {
	cubeRef.value?.reset()
	canRestore.value = false
}

/** 用层先法求解并逐步播放：每转完一步才启动下一步 */
const handleSolve = () => {
	const cube = cubeRef.value
	if (!cube || solving.value) return

	// solve 返回需要走的步数，0 表示当前已经是还原状态
	const steps = cube.solve(() => {
		solving.value = false
	})
	if (steps === 0) return

	solving.value = true
	canRestore.value = false
}

defineExpose({ turn, scramble, reset, solve: handleSolve })

onMounted(() => {
	const host = container.value
	if (!host) return

	// 触屏设备关闭交互：魔方只做展示，避免 canvas 吃掉页面滚动
	const finePointer = typeof window.matchMedia === 'function' ? window.matchMedia('(pointer: fine)').matches : true
	const canInteract = props.interactive && finePointer

	// ---- 基础 ----------------------------------------------------------
	const scene = new THREE.Scene()

	const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 200)
	// 比原始 React 版略远一点：首页 .image 只有 500px 高，留点余量让魔方不至于顶满容器
	camera.position.set(5.86, 4.98, 7.15)

	const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
	// 至少按 2 倍像素渲染（低 DPI 屏也做超采样），圆角边缘更干净
	renderer.setPixelRatio(Math.min(Math.max(window.devicePixelRatio, 2), 2.5))
	// three 0.135 默认是线性输出，这里显式开启 sRGB 输出让塑料色更准
	if ('outputEncoding' in renderer) renderer.outputEncoding = THREE.sRGBEncoding
	host.appendChild(renderer.domElement)

	// 环境反射：让塑料与贴纸有细腻的光泽层次
	const pmrem = new THREE.PMREMGenerator(renderer)
	const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
	scene.environment = envTexture
	pmrem.dispose()

	// ---- 魔方 ----------------------------------------------------------
	const cube = createRubiksCube()
	cubeRef.value = cube
	scene.add(cube.root)

	// ---- 灯光 ----------------------------------------------------------
	scene.add(new THREE.HemisphereLight(0xdfe8ff, 0x101220, 0.62))

	const keyLight = new THREE.DirectionalLight(0xffffff, 2.9)
	keyLight.position.set(6, 9, 7)
	scene.add(keyLight)

	const fillLight = new THREE.DirectionalLight(0x9db0ff, 0.62)
	fillLight.position.set(-7, 3, -6)
	scene.add(fillLight)

	const bottomLight = new THREE.DirectionalLight(0xfff0d0, 0.35)
	bottomLight.position.set(0, -7, 4)
	scene.add(bottomLight)

	// ---- 视角控制 ------------------------------------------------------
	let controls = null
	if (canInteract) {
		controls = new OrbitControls(camera, renderer.domElement)
		controls.enableDamping = true
		controls.dampingFactor = 0.075
		controls.rotateSpeed = 0.8
		controls.enablePan = false
		controls.minDistance = 7
		controls.maxDistance = 17
		controls.target.set(0, 0, 0)
	}

	// ---- 拖拽魔方转层 --------------------------------------------------
	// 按下时拾取命中的面 -> 拖动超过阈值后，用「面法线 × 拖动方向」得到转轴，
	// 命中块在该轴上的坐标决定转哪一层，方向上严格与拖动一致。
	const raycaster = new THREE.Raycaster()
	const ndc = new THREE.Vector2()
	const dragPlane = new THREE.Plane()
	const normalMatrix = new THREE.Matrix3()
	const AXES = ['x', 'y', 'z']

	let drag = null

	// 复原期间锁掉视角控制，并丢弃进行中的拖拽
	watch(solving, value => {
		if (controls) controls.enabled = !value
		if (value) drag = null
	})

	const toNDC = event => {
		const rect = renderer.domElement.getBoundingClientRect()
		ndc.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1)
	}

	const onPointerDown = event => {
		// 自动复原期间不接受任何拖拽（既不能转层，也不转视角）
		if (!canInteract || solving.value || event.button !== 0 || drag) return
		toNDC(event)
		raycaster.setFromCamera(ndc, camera)
		const hits = raycaster.intersectObject(cube.root, true)
		// 没点中魔方：交给 OrbitControls 转视角
		if (hits.length === 0) return

		const hit = hits[0]
		if (!hit.face) return

		let node = hit.object
		while (node.parent && node.parent !== cube.root) node = node.parent
		// 命中的是正在转动的临时分组，忽略
		if (node.parent !== cube.root || node.name === 'turn-pivot') return

		// 命中面法线转到世界坐标，再吸附到最近的坐标轴
		normalMatrix.getNormalMatrix(hit.object.matrixWorld)
		const normal = hit.face.normal.clone().applyMatrix3(normalMatrix).normalize()
		const absNormal = [Math.abs(normal.x), Math.abs(normal.y), Math.abs(normal.z)]
		const maxIndex = absNormal.indexOf(Math.max(...absNormal))
		const snapped = new THREE.Vector3()
		snapped.setComponent(maxIndex, Math.sign(normal.getComponent(maxIndex)) || 1)

		drag = {
			cubie: node,
			normal: snapped,
			point: hit.point.clone(),
			startX: event.clientX,
			startY: event.clientY,
			pointerId: event.pointerId,
			fired: false,
		}

		// 按住魔方时不要让相机同时转动
		if (controls) controls.enabled = false
		renderer.domElement.setPointerCapture(event.pointerId)
	}

	const onPointerMove = event => {
		if (!drag || drag.pointerId !== event.pointerId || drag.fired) return

		const dx = event.clientX - drag.startX
		const dy = event.clientY - drag.startY
		if (Math.hypot(dx, dy) < 9) return

		// 把指针投到命中点所在的切平面，得到真实的世界位移
		toNDC(event)
		raycaster.setFromCamera(ndc, camera)
		dragPlane.setFromNormalAndCoplanarPoint(drag.normal, drag.point)
		const current = new THREE.Vector3()
		if (!raycaster.ray.intersectPlane(dragPlane, current)) return

		const dragWorld = current.sub(drag.point)
		if (dragWorld.lengthSq() < 1e-6) return

		// 转轴 = 面法线 × 拖动方向，取主导分量
		const axisVec = new THREE.Vector3().crossVectors(drag.normal, dragWorld)
		const absAxis = [Math.abs(axisVec.x), Math.abs(axisVec.y), Math.abs(axisVec.z)]
		const axis = AXES[absAxis.indexOf(Math.max(...absAxis))]
		const dir = axisVec[axis] > 0 ? 1 : -1
		const layer = Math.round(drag.cubie.position[axis])

		cube.rotate(axis, layer, dir)
		canRestore.value = true
		drag.fired = true
	}

	const onPointerUp = event => {
		if (!drag || drag.pointerId !== event.pointerId) return
		if (renderer.domElement.hasPointerCapture(event.pointerId)) {
			renderer.domElement.releasePointerCapture(event.pointerId)
		}
		drag = null
		if (controls) controls.enabled = true
	}

	const canvas = renderer.domElement
	if (canInteract) {
		canvas.addEventListener('pointerdown', onPointerDown)
		canvas.addEventListener('pointermove', onPointerMove)
		canvas.addEventListener('pointerup', onPointerUp)
		canvas.addEventListener('pointercancel', onPointerUp)
	}

	// ---- 键盘（悬停在魔方上时才接管按键，避免干扰搜索框等输入）----------
	let hovering = false
	const onEnter = () => (hovering = true)
	const onLeave = () => (hovering = false)
	const onKeyDown = event => {
		if (!hovering || solving.value || event.metaKey || event.ctrlKey || event.altKey) return
		const target = event.target
		if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return
		const face = event.key.toUpperCase()
		if (!KEY_FACES.includes(face)) return
		event.preventDefault()
		cube.turn(face, event.shiftKey)
		canRestore.value = true
	}
	if (canInteract) {
		host.addEventListener('pointerenter', onEnter)
		host.addEventListener('pointerleave', onLeave)
		window.addEventListener('keydown', onKeyDown)
	}

	// ---- 自适应 --------------------------------------------------------
	const resize = () => {
		const width = host.clientWidth
		const height = host.clientHeight
		if (!width || !height) return
		camera.aspect = width / height
		camera.updateProjectionMatrix()
		// 第三个参数传 false：不把像素宽高写进 canvas 的 inline style，
		// canvas 的显示尺寸交给 CSS（100% 铺满容器）决定。
		// 生产构建下 CSS 是外链，组件可能比样式表先挂载，此时这里会先读到「样式未生效」的
		// 巨大高度；若同时写死 inline 尺寸，canvas 会把容器反过来撑大，形成不可恢复的错误布局。
		renderer.setSize(width, height, false)
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
	let elapsed = 0
	let raf = 0
	let running = false

	const tick = () => {
		const delta = Math.min(clock.getDelta(), 0.05)
		elapsed += delta

		cube.update(delta)
		// 右上角「复原」按钮的可用状态跟着转动历史走
		const needRestore = !cube.isSolved()
		if (needRestore !== canRestore.value) canRestore.value = needRestore
		// 极轻微的呼吸浮动，让静止画面不死板
		cube.root.position.y = Math.sin(elapsed * 0.9) * 0.045

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

	const visibility = new IntersectionObserver(
		entries => {
			const visible = entries.some(entry => entry.isIntersecting)
			visible && document.visibilityState !== 'hidden' ? start() : stop()
		},
		{ threshold: 0 }
	)
	visibility.observe(host)

	const onVisibilityChange = () => {
		if (document.visibilityState === 'hidden') stop()
	}
	document.addEventListener('visibilitychange', onVisibilityChange)
	start()

	// ---- 提示文案 ------------------------------------------------------
	mounted.value = true

	// ---- 清理 ----------------------------------------------------------
	disposeScene = () => {
		stop()
		visibility.disconnect()
		document.removeEventListener('visibilitychange', onVisibilityChange)
		if (canInteract) {
			host.removeEventListener('pointerenter', onEnter)
			host.removeEventListener('pointerleave', onLeave)
			window.removeEventListener('keydown', onKeyDown)
		}
		canvas.removeEventListener('pointerdown', onPointerDown)
		canvas.removeEventListener('pointermove', onPointerMove)
		canvas.removeEventListener('pointerup', onPointerUp)
		canvas.removeEventListener('pointercancel', onPointerUp)
		drag = null
		observer.disconnect()
		window.removeEventListener('load', onWindowLoad)
		if (controls) controls.dispose()
		cube.dispose()
		envTexture.dispose()
		renderer.dispose()
		canvas.remove()
		cubeRef.value = null
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
	scopeId（产物 CSS 是 .rubik[data-v-xxx]，但 DOM 上是 class="rubik" 没有 data-v），
	一旦 scoped，构建后样式会整体失效，魔方容器高度塌掉、被撑成整个文档高度。
	类名已统一用 rubik__ 前缀，全局不会冲突。
-->
<style>
.rubik {
	position: relative;
	width: 100%;
	height: 100%;
	min-height: 320px;
}
.rubik__toolbar {
	opacity: 0;
	transition: opacity 0.3s;
}
.rubik:hover .rubik__toolbar {
	opacity: 1;
}

.rubik__stage {
	position: absolute;
	inset: 0;
}

.rubik__stage canvas {
	display: block;
	width: 100%;
	height: 100%;
	pointer-events: none;
}

.rubik.is-interactive .rubik__stage canvas {
	pointer-events: auto;
	cursor: grab;
	touch-action: none;
}

.rubik.is-interactive .rubik__stage canvas:active {
	cursor: grabbing;
}

/* 复原中：画布不再响应指针，手动拖拽/转视角全部失效 */
.rubik.is-solving .rubik__stage canvas {
	pointer-events: none;
	cursor: default;
}

/*
 * 右上角工具条：绝对定位到组件右上角，三个按钮横向排列。
 * 不要给每个按钮单独绝对定位 —— 窄屏下它们会挤在同一块区域互相重叠。
 */
.rubik__toolbar {
	position: absolute;
	top: 10px;
	right: 10px;
	z-index: 3;
	display: flex;
	align-items: center;
	gap: 8px;
}

/* 「复原」按钮：白底胶囊，靠图标旋转表达进行中 */
.rubik__restore {
	display: inline-flex;
	align-items: center;
	gap: 5px;
	box-sizing: border-box;
	height: 28px;
	padding: 0 11px;
	border-radius: 999px;
	border: 1px solid var(--vp-c-divider);
	background: var(--vp-c-bg);
	color: var(--vp-c-text-2);
	font-family: inherit;
	font-size: 12px;
	font-weight: 600;
	letter-spacing: 0.02em;
	cursor: pointer;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
	transition:
		color 0.15s ease,
		border-color 0.15s ease,
		opacity 0.15s ease,
		box-shadow 0.15s ease;
}

.rubik__restore:hover:not(:disabled) {
	color: var(--vp-c-brand-1);
	border-color: var(--vp-c-brand-1);
	box-shadow: 0 3px 14px rgba(0, 0, 0, 0.12);
}

.rubik__restore:active:not(:disabled) {
	transform: scale(0.96);
}

.rubik__restore:disabled {
	cursor: default;
	opacity: 0.5;
}

.rubik__restore svg {
	display: block;
	flex: none;
}

/* 复原中让图标持续旋转，明确告诉用户正在自动处理 */
.rubik.is-solving .rubik__restore svg {
	animation: rubik-restore-spin 0.9s linear infinite;
}

@keyframes rubik-restore-spin {
	to {
		transform: rotate(-360deg);
	}
}

/*
 * 底部操作区已移除（按钮统一进右上角工具条，底部不再有说明文字）。
 */
.rubik__btn {
	/* 和带 border 的复原按钮对齐：统一 border-box，三个按钮才是同一高度 */
	box-sizing: border-box;
	height: 28px;
	padding: 0 14px;
	border: none;
	border-radius: 999px;
	background: var(--vp-button-brand-bg);
	color: var(--vp-button-brand-text);
	font-family: inherit;
	font-size: 12px;
	font-weight: 600;
	letter-spacing: 0.06em;
	cursor: pointer;
	transition:
		filter 0.15s ease,
		transform 0.12s ease;
}

.rubik__btn:hover {
	filter: brightness(1.1);
}

.rubik__btn:active {
	transform: scale(0.96);
}

.rubik__btn:disabled {
	cursor: default;
	opacity: 0.5;
}

.rubik__btn--ghost {
	background: var(--vp-button-alt-bg);
	color: var(--vp-button-alt-text);
	border: 1px solid var(--vp-button-alt-border);
}

@media (max-width: 720px) {
	.rubik {
		min-height: 260px;
	}
	/* 窄屏收紧间距和内边距，保证三个按钮都塞得进右上角 */
	.rubik__toolbar {
		top: 8px;
		right: 8px;
		gap: 6px;
	}
	.rubik__btn {
		padding: 0 11px;
	}
	.rubik__restore {
		padding: 0 9px;
	}
}
</style>
