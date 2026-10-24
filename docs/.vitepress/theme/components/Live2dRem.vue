<template>
	<!-- 看板娘由 OML2D 自行挂载到 body，这里只作为启动点，不参与布局 -->
	<div class="live2d-host" aria-hidden="true"></div>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { withBase } from 'vitepress'

/**
 * 雷姆看板娘（Live2D）
 * - 运行时 oh-my-live2d 与模型文件都已本地化到 /public/live2d/ 下，不依赖外链
 * - 只在客户端初始化：脚本注入与 WebGL 都在 onMounted 内完成，SSR 构建不受影响
 * - 模型为 Cubism 2 格式（rem.model.json），oh-my-live2d 内置了 Cubism 2/5 SDK
 */
const RUNTIME_PATH = '/live2d/oml2d.min.js'
const MODEL_PATH = '/live2d/rem/assets/rem.model.json'

let scriptPromise = null
let instance = null
let disposed = false

function loadRuntime() {
	if (window.OML2D) return Promise.resolve(window.OML2D)
	if (scriptPromise) return scriptPromise

	scriptPromise = new Promise((resolve, reject) => {
		const script = document.createElement('script')
		script.src = withBase(RUNTIME_PATH)
		script.async = true
		script.onload = () => {
			window.OML2D ? resolve(window.OML2D) : reject(new Error('OML2D 未挂到全局'))
		}
		script.onerror = () => reject(new Error('看板娘运行时加载失败'))
		document.head.appendChild(script)
	})

	return scriptPromise
}

onMounted(async () => {
	if (instance || disposed) return
	// 没有 WebGL 就不用尝试了
	if (!window.WebGLRenderingContext) return

	try {
		const OML2D = await loadRuntime()
		if (disposed || instance) return

		instance = OML2D.loadOml2d({
			models: [
				{
					name: '雷姆',
					path: withBase(MODEL_PATH),
					scale: 0.1,
					position: [0, 60],
					stageStyle: { width: 300, height: 420 },
					// 之前是 0（静音）。模型的动作已经绑定了 voice/*.mp3，
					// 点击会播放对应动作 + 语音，所以这里必须给非零音量。
					volume: 0.6,
				},
			],
			// 站点右侧已有「回到顶部」的小猫动画，看板娘放左下角
			dockedPosition: 'left',
			mobileDisplay: false,
			primaryColor: '#7f8dff',
			sayHello: false,
			transitionTime: 700,
			tips: {
				welcomeTips: {
					message: {
						daybreak: '早上好！一日之计在于晨，今天也要元气满满哦~',
						morning: '上午好，代码写累了就起来走走吧~',
						noon: '中午啦，记得好好吃午饭哦~',
						afternoon: '下午容易犯困呢，要不要来杯咖啡？',
						dusk: '傍晚了，今天辛苦啦~',
						night: '晚上好，欢迎来到 Fade away 的笔记本~',
						lateNight: '已经这么晚了呀，早点休息吧，晚安~',
						weeHours: '这么晚还不睡吗？当心熬夜秃头哦！',
					},
				},
			},
		})
	} catch (error) {
		console.warn('[live2d] 雷姆看板娘加载失败：', error)
	}
})

onBeforeUnmount(() => {
	disposed = true
})
</script>

<style scoped>
.live2d-host {
	display: none;
}
</style>
