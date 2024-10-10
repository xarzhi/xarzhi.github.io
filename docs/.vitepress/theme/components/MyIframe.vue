<template>
	<div class="my-iframe">
		<div v-if="loading" class="loading">
			<div class="spinner">
				<div class="rect1"></div>
				<div class="rect2"></div>
				<div class="rect3"></div>
				<div class="rect4"></div>
				<div class="rect5"></div>
			</div>
		</div>
		<iframe :src="src" frameborder="0" ref="Iframe"></iframe>
	</div>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue'
const loading = ref(false)
const Iframe = ref(null)
const props = defineProps({
	src: {
		type: String,
		default: '',
	},
})
const iframeLoad = () => {
	loading.value = true
	const iframe = Iframe.value
	if (iframe.attachEvent) {
		iframe.attachEvent('onload', () => {
			loading.value = false
		})
	} else {
		iframe.onload = () => {
			loading.value = false
		}
	}
}

onMounted(() => {
	iframeLoad()
})
</script>

<style lang="scss" scoped>
.my-iframe {
	border-radius: 10px;
	overflow: hidden;
	width: 100%;
	height: 500px;
	position: relative;
	.loading {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgb(255, 255, 255);
		display: flex;
		justify-content: center;
		align-items: center;
		left: 0;
		top: 0;
		.spinner {
			margin: 100px auto;
			width: 50px;
			height: 40px;
			text-align: center;
			font-size: 10px;
		}

		.spinner > div {
			background-color: #1782ff;
			height: 100%;
			width: 6px;
			display: inline-block;
			margin-right: 3px;
			-webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
			animation: sk-stretchdelay 1.2s infinite ease-in-out;
		}

		.spinner .rect2 {
			-webkit-animation-delay: -1.1s;
			animation-delay: -1.1s;
		}

		.spinner .rect3 {
			-webkit-animation-delay: -1s;
			animation-delay: -1s;
		}

		.spinner .rect4 {
			-webkit-animation-delay: -0.9s;
			animation-delay: -0.9s;
		}

		.spinner .rect5 {
			-webkit-animation-delay: -0.8s;
			animation-delay: -0.8s;
		}

		@-webkit-keyframes sk-stretchdelay {
			0%,
			40%,
			100% {
				-webkit-transform: scaleY(0.4);
			}
			20% {
				-webkit-transform: scaleY(1);
			}
		}

		@keyframes sk-stretchdelay {
			0%,
			40%,
			100% {
				transform: scaleY(0.4);
				-webkit-transform: scaleY(0.4);
			}
			20% {
				transform: scaleY(1);
				-webkit-transform: scaleY(1);
			}
		}
	}
}
</style>
