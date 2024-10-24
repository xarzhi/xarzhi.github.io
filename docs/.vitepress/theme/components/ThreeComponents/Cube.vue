<template>
	<div class="cube">
		<div class="container" ref="container"></div>
		<a href="https://pengfeiw.github.io/minicode/threejs-rubik" target="_blank">Auther is here</a>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Rubiks from '../../utils/rubiks'
const container = ref(null)
onMounted(() => {
	new Rubiks(container.value)
})
</script>

<style scoped lang="scss">
.cube{
	&:hover{
		a{
			display: block;
		}
	}
}
a{
	display: none;
	text-decoration: none;
	position: absolute;
}
</style>
