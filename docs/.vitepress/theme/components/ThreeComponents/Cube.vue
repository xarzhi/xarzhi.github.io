<template>
	<div class="container" ref="container"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Rubiks from '../../utils/rubiks'
const container = ref(null)
onMounted(() => {
	new Rubiks(container.value)
})
</script>
