<template>
	<div class="home">
		<div class="image">
			<Circle />
		</div>
		<div class="content">
			<div class="title">Fade away</div>
			<div class="desc">{{ text }}</div>
			<div class="btns">
				<a class="btn1" href="/docs/vitepress">VitePress</a>
				<a class="btn2" href="/docs/收藏的网站/">网址导航</a>
			</div>
		</div>
	</div>
</template>

<script setup>
import Circle from './Circle.vue'
import { onMounted, ref, onUnmounted } from 'vue'
const textArr = [
	'花有重开日，人无再少年',
	'街喧闹，人过往，且记曾相识，不为少年留',
	'欲买桂花同载酒，终不似，少年游',
	'种一棵树最好的时间是在十年前，其次就是现在',
	'未曾绽放就要枯萎吗',
]
const text = ref('')
const timer = ref()
const textIndex = ref(0)
const changeText = () => {
	text.value = textArr[textIndex]
	textIndex.value++
	if (textIndex.value >= textArr.length) {
		textIndex.value = 0
	}
}
onMounted(() => {
	changeText()
	timer.value = setInterval(() => {
		changeText()
	}, 1000 * 10)
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
	}
	.content {
		min-width: 500px;
		height: 200px;
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
</style>
