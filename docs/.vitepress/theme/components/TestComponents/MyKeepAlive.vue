<template>
	<div class="demo">
		<button
			@click="com = Add"
			:style="{
				background: com === Add ? '#409eff' : '#ddd',
				color: com === Add ? '#fff' : '#333',
			}"
		>
			组件一
		</button>
		<button
			@click="com = Input"
			:style="{
				background: com === Input ? '#409eff' : '#ddd',
				color: com === Input ? '#fff' : '#333',
			}"
		>
			组件二
		</button>
		<br />
		<KeepAlive :include="include" :exclude="exclude">
			<component :is="com" />
		</KeepAlive>
	</div>
</template>

<script setup>
import { ref, shallowRef, h, defineComponent, reactive } from 'vue'

defineProps({
	keepalive: Boolean,
	include: Array,
	exclude: Array,
})
const Add = defineComponent({
	name: 'Add',
	setup() {
		const count = ref(0)
		return () => {
			return h(
				'div',
				{
					style: {
						height: '50px',
						display: 'flex',
						alignItems: 'center',
					},
				},
				[
					h('span', `count: ${count.value}`),
					h(
						'button',
						{
							onClick: () => count.value++,
							style: {
								background: '#ddd',
								width: '25px',
								height: '25px',
								borderRadius: '5px',
								marginLeft: '10px',
							},
							name: 'Add',
						},
						'+1'
					),
				]
			)
		}
	},
})
const Input = defineComponent({
	name: 'Input',
	setup() {
		const count = ref('')
		return () => {
			return h(
				'div',
				{
					style: {
						height: '50px',
						display: 'flex',
						alignItems: 'center',
					},
				},
				[
					h('input', {
						value: count.value,
						onChange: e => (count.value = e.target.value),
						style: { width: '200px', border: '1px solid #ddd', borderRadius: '4px', padding: '3px' },
					}),
				]
			)
		}
	},
})
const com = shallowRef(Add)
</script>

<style lang="scss" scoped>
.demo {
	box-shadow: 0 3px 12px rgba(0, 0, 0, 0.07), 0 1px 4px rgba(0, 0, 0, 0.07);
	padding: 10px;
	border-radius: 4px;
}
button {
	margin-right: 10px;
	width: 70px;
	height: 30px;
	border: 1px solid #ddd;
	border-radius: 5px;
}
</style>
