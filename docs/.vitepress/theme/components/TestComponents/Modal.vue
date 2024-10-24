<template>
	<button @click="showModal" class="btn">点击弹出模态框</button>
	<teleport to="body" v-if="show">
		<div class="cover" @click="show = false">
			<div class="modal">
				<slot></slot>
			</div>
		</div>
	</teleport>
</template>
<script setup>
import { ref } from 'vue'
const show = ref(false)
const showModal = () => {
	show.value = true
}
</script>

<style lang="scss" scoped>
.btn {
	padding: 0 5px;
	height: 30px;
	border-radius: 3px;
	background-color: #1677ff;
	transition: background-color 0.3s ease-in-out;
	color: #fff;
	&:hover {
		background-color: #4096ff;
	}
	&:active {
		background-color: #0958d9;
	}
}
.cover {
	position: fixed;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.2);
	left: 0;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 9999;
	.modal {
		width: 800px;
		height: 500px;
		border-radius: 5px;
		background: #fff;
		padding: 20px;
		box-sizing: border-box;
		box-shadow: 2px 2px 30px 10px rgb(168, 168, 168);
	}
}
</style>
