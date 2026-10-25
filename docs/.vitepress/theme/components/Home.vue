<template>
	<div class="home">
		<div class="image">
			<!--
				必须用 ClientOnly 包住。

				componentName 由 randomBox() 随机选（Circle / GlassBox / Rubik / AnimationModel），
				服务端和客户端各随一次，选到不同组件时 hydration 就对不上：
				Vue 会复用 SSR 那棵 DOM，把新组件的子节点塞进旧组件的根元素里，
				根元素的 class 却不是新组件的 —— 实测拿到过 GlassBox 的 id="container" + 丢了 class="rubik"。
				一旦 class="rubik" 丢了，`.rubik{position:relative;height:100%}` 全部失效，
				里面 `position:absolute;inset:0` 的 .rubik__stage 只能去向 body 找包含块，
				canvas 被撑成整页高度（实测 1152x2186），魔方放大四倍还盖住下面的内容。

				这几张 canvas 本来就没法 SSR，跳过服务端渲染既消除水合不一致，也不会有布局跳动
				（.image 有固定 500px 高度）。
			-->
			<ClientOnly>
				<component :is="componentName" />
			</ClientOnly>
		</div>
		<div class="content">
			<div class="title">Fade away</div>
			<Transition name="fade" mode="out-in">
				<div class="desc" v-if="text" :key="text">{{ text }}</div>
			</Transition>
			<div class="btns">
				<a class="btn1" href="/docs/vitepress">VitePress</a>
				<a class="btn2" href="/docs/收藏的网站/">网址导航</a>
			</div>
		</div>
		<Projects />
	</div>
</template>

<script setup>
import Circle from './ThreeComponents/Circle.vue'
import GlassBox from './ThreeComponents/GlassBox.vue'
import Rubik from './ThreeComponents/Rubik.vue'
import AnimationModel from './ThreeComponents/AnimationModel.vue'

import { onMounted, ref, onUnmounted, shallowRef } from 'vue'
import { getRandom } from '../utils/utils'
import Projects from './Projects.vue'

const textArr = [
	'花有重开日，人无再少年',
	'街喧闹，人过往，且记曾相识，不为少年留',
	'欲买桂花同载酒，终不似，少年游',
	'种一棵树最好的时间是在十年前，其次就是现在',
	'未曾绽放就要枯萎吗',
	'看山是山，看山不是山，看山还是山',
	'十年生死两茫茫，五年生死一茫茫',
	'去年今日此门中，人面桃花相映红',
]
const text = ref('')
const timer = ref()
const textIndex = ref(0)
const componentName = shallowRef(Rubik)
const boxArr = [Circle, GlassBox, Rubik, AnimationModel]
/** 预览用：?box=rubik / circle / glass / animation 可直接指定首屏展示的组件 */
const boxByName = {
	rubik: Rubik,
	circle: Circle,
	glass: GlassBox,
	animation: AnimationModel,
}

const randomBox = () => {
	componentName.value = boxArr[getRandom(0, boxArr.length - 1)]
}
randomBox()
const changeText = () => {
	text.value = textArr[textIndex.value]
	textIndex.value++
	if (textIndex.value >= textArr.length) {
		textIndex.value = 0
	}
}
changeText()
onMounted(() => {
	// 在挂载后再处理预览参数，避免服务端与客户端渲染结果不一致
	const picked = boxByName[
		(new URLSearchParams(window.location.search).get('box') || '').toLowerCase()
	]
	if (picked) componentName.value = picked

	timer.value = setInterval(() => {
		changeText()
	}, 5000)
})
onUnmounted(() => {
	clearInterval(timer.value)
})
</script>

<style lang="scss" scoped>
.home {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	.image {
		width: 100%;
		height: 500px;
		display: flex;
		justify-content: center;
		align-items: center;
		/* 魔方/玻璃盒的 canvas 是绝对定位铺满的，兜底裁剪，避免溢出撑破首屏 */
		overflow: hidden;
		/*
			兜底：让 .image 自己成为定位包含块。
			子组件的 `.xxx__stage` 是 position:absolute;inset:0，正常情况下它的包含块是组件根元素
			（`.rubik{position:relative}`）。万一组件根的 class 因为任何原因没生效，
			没有这一行，stage 会一路找到 body，把 canvas 撑成整页高度；有这一行就最多被裁成 500px。
		*/
		position: relative;
	}

	.content {
		min-width: 500px;
		height: 200px;
		/* 魔方的操作按钮/提示是绝对定位在 .image 底部的，
		   留出间距免得和标题贴在一起 */
		margin-top: 24px;

		.title {
			background: var(--vp-home-hero-name-background);
			-webkit-background-clip: text;
			background-clip: text;
			-webkit-text-fill-color: var(--vp-home-hero-name-color);
			height: 70px;
			line-height: 64px;
			font-weight: 600;
			font-size: 56px;
			text-align: center;
		}

		.desc {
			font-size: 24px;
			line-height: 36px;
			margin: 20px 0;
			color: var(--vp-c-text-2);
			width: 100%;
			text-align: center;
		}

		.btns {
			display: flex;
			justify-content: center;
			margin-top: 30px;
			overflow: hidden;
			text-align: center;

			a {
				width: 106px;
				border-radius: 8px;
				height: 40px;
				border-radius: 20px;
				font-size: 14px;
				transition: color 0.25s, border-color 0.25s, background-color 0.25s;
				font-family: var(--vp-font-family-base);
				font-weight: 600;
				font-synthesis: style;
				text-rendering: optimizeLegibility;
				-webkit-font-smoothing: antialiased;
				text-decoration: none;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.btn1 {
				color: var(--vp-button-brand-text);
				border-color: var(--vp-button-brand-border);
				background-color: var(--vp-button-brand-bg);
				margin-right: 100px;
			}

			.btn2 {
				border-color: var(--vp-button-alt-border);
				color: var(--vp-button-alt-text);
				background-color: var(--vp-button-alt-bg);
			}
		}
	}
}


.fade-leave-active {
	transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
	opacity: 1;
}

.fade-enter-active {
	transition: all 0.5s ease;
	opacity: 1;
}

.fade-enter-from {
	opacity: 0;
}

.fade-leave-to {
	opacity: 0;
}
</style>
