<template>
	<div
		class="x-carousel"
		@mouseenter="pause"
		@mouseleave="resume"
	>
		<div class="stage">
			<div
				v-for="(img, i) in images"
				:key="i"
				class="slide"
				:class="{ active: i === current }"
			>
				<img :src="img" :alt="alt" draggable="false" />
			</div>
		</div>

		<button
			v-if="images.length > 1"
			class="nav prev"
			aria-label="上一张"
			@click="prev"
		>
			<svg viewBox="0 0 24 24" width="18" height="18">
				<path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</button>
		<button
			v-if="images.length > 1"
			class="nav next"
			aria-label="下一张"
			@click="next"
		>
			<svg viewBox="0 0 24 24" width="18" height="18">
				<path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</button>

		<div v-if="images.length > 1" class="dots">
			<span
				v-for="(img, i) in images"
				:key="i"
				class="dot"
				:class="{ on: i === current }"
				@click="go(i)"
			></span>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
	images: { type: Array, default: () => [] },
	alt: { type: String, default: '' },
	interval: { type: Number, default: 4000 },
})

const current = ref(0)
let timer = null

function next() {
	current.value = (current.value + 1) % props.images.length
}

function prev() {
	current.value = (current.value - 1 + props.images.length) % props.images.length
}

function go(i) {
	if (i === current.value) return
	current.value = i
	reset()
}

function pause() {
	if (timer) clearInterval(timer)
}

function resume() {
	if (props.images.length > 1) start()
}

function reset() {
	pause()
	resume()
}

function start() {
	timer = setInterval(next, props.interval)
}

onMounted(() => {
	if (props.images.length > 1) start()
})

onBeforeUnmount(() => {
	if (timer) clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.x-carousel {
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
	border-radius: 8px;
	background: var(--vp-c-bg-soft);

	.stage {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.slide {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		visibility: hidden;
		transition:
			opacity 0.5s ease,
			visibility 0.5s;

		&.active {
			opacity: 1;
			visibility: visible;
		}

		img {
			height: 100%;
			width: auto;
			max-width: 100%;
			object-fit: contain;
			user-select: none;
			-webkit-user-drag: none;
		}
	}

	.nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border: none;
		border-radius: 50%;
		cursor: pointer;
		color: #fff;
		background: rgba(0, 0, 0, 0.35);
		backdrop-filter: blur(4px);
		opacity: 0;
		transition:
			opacity 0.25s,
			background-color 0.25s;

		&:hover {
			background: rgba(0, 0, 0, 0.55);
		}

		&.prev {
			left: 10px;
		}

		&.next {
			right: 10px;
		}
	}

	&:hover .nav {
		opacity: 1;
	}

	.dots {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 10px;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;

		.dot {
			width: 6px;
			height: 6px;
			border-radius: 3px;
			cursor: pointer;
			background: rgba(255, 255, 255, 0.5);
			transition:
				width 0.25s,
				background-color 0.25s;

			&.on {
				width: 18px;
				background: #fff;
			}
		}
	}
}
</style>
