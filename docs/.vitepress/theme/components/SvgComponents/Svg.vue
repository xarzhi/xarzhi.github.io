<template>
	<div>
		<div class="box" v-if="props.from === 'strokeDashoffset'">
			<button @click="sub">-</button>
			<button @click="add">+</button>
			strokeDashoffset：{{ strokeDashoffset }}
			<svg width="500" height="50" xmlns="http://www.w3.org/2000/svg">
				<line
					x1="10"
					y1="10"
					x2="300"
					y2="10"
					stroke="black"
					stroke-width="10"
					stroke-dasharray="20 20"
					:stroke-dashoffset="strokeDashoffset"
					class="line"
				></line>
			</svg>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
	from: {
		type: String,
		default: '',
	},
})

const strokeDashoffset = ref(0)

const add = () => {
	strokeDashoffset.value += 1
}
const sub = () => {
	strokeDashoffset.value -= 1
}
</script>

<style lang="scss" scoped>
button {
	min-width: 80px;
	height: 30px;
	border-radius: 5px;
	border: 1px solid #000;
	margin-right: 10px;
}
.box {
	box-shadow: 0 0 5px 0 #ddd;
	border-radius: 8px;
	padding: 10px;
	svg {
		box-shadow: 0 0 5px 0 #ddd;
		margin: 10px;
		border-radius: 8px;
		padding: 10px;
	}
}
</style>
