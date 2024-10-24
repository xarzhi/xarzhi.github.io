<template>
	<div class="demo">
		<button @click="show[demo] = !show[demo]" class="btn" v-if="![6, 7, 8, 9].includes(demo)">Toggle</button>

		<div v-if="demo === 1">
			<Transition>
				<p v-if="show[demo]">hello</p>
			</Transition>
		</div>
		<div v-if="demo === 2">
			<Transition name="slide-fade">
				<p v-if="show[demo]">hello</p>
			</Transition>
		</div>
		<div v-if="demo === 3">
			<Transition name="bounce">
				<p v-if="show[demo]" style="text-align: center">Hello here is some bouncy text!</p>
			</Transition>
		</div>
		<div v-if="demo === 4">
			<!-- 假设你已经在页面中引入了 Animate.css -->
			<Transition
				name="custom-classes"
				enter-active-class="animate__animated animate__tada"
				leave-active-class="animate__animated animate__bounceOutRight"
			>
				<p v-if="show[demo]">hello</p>
			</Transition>
		</div>
		<div v-if="demo === 5">
			<Transition name="nested" :duration="550">
				<div v-if="show[demo]" class="outer">
					<div class="inner">Hello</div>
				</div>
			</Transition>
		</div>
		<div v-if="demo === 6">
			点击切换按钮：
			<Transition name="btn-show">
				<button class="btn poa" v-if="docState === 'saved'" @click="docState = 'edited'">Edit</button>
				<button class="btn poa" v-else-if="docState === 'edited'" @click="docState = 'editing'">Save</button>
				<button class="btn poa" v-else-if="docState === 'editing'" @click="docState = 'saved'">Cancel</button>
			</Transition>
		</div>
		<div v-if="demo === 7">
			点击切换按钮：
			<Transition name="btn-show" mode="out-in">
				<button class="btn" v-if="docState === 'saved'" @click="docState = 'edited'">Edit</button>
				<button class="btn" v-else-if="docState === 'edited'" @click="docState = 'editing'">Save</button>
				<button class="btn" v-else-if="docState === 'editing'" @click="docState = 'saved'">Cancel</button>
			</Transition>
		</div>
		<div v-if="demo === 8">
			<button
				class="btn"
				style="margin-right: 10px"
				@click="items.splice(getRandom(0, items.length - 1), 0, items.length + 1)"
			>
				任意位置添加一项
			</button>
			<button class="btn" @click="items.splice(getRandom(0, items.length - 1), 1)">任意位置移除一项</button>
			<TransitionGroup name="list" tag="ul">
				<li v-for="item in items" :key="item">
					{{ item }}
				</li>
			</TransitionGroup>
		</div>
		<div v-if="demo === 9">
			<button
				class="btn"
				style="margin-right: 10px"
				@click="items.splice(getRandom(0, items.length - 1), 0, items.length + 1)"
			>
				任意位置添加一项
			</button>
			<button class="btn" @click="items.splice(getRandom(0, items.length - 1), 1)">任意位置移除一项</button>
			<TransitionGroup name="list1" tag="ul">
				<li v-for="item in items" :key="item">
					{{ item }}
				</li>
			</TransitionGroup>
		</div>
	</div>
</template>

<script setup>
import { getRandom } from '../../utils/utils'
import { reactive, ref } from 'vue'
defineProps({
	demo: Number,
})
const docState = ref('saved')
const show = reactive([false, false, false, false, false, false, false])
const items = ref([1, 2, 3])
</script>
<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
</style>
<style lang="scss" scoped>
.demo {
	box-shadow: 0 3px 12px rgba(0, 0, 0, 0.07), 0 1px 4px rgba(0, 0, 0, 0.07);
	padding: 10px;
	border-radius: 4px;
	margin-bottom: 20px;
	min-height: 50px;
}
.btn {
	padding: 3px 8px;
	border: 1px solid #c5c5c5;
	border-radius: 5px;
	margin-bottom: 20px;
}
/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
// *********************************demo2
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
	transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
	transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
	transform: translateX(20px);
	opacity: 0;
}

// *************************************demo3
.bounce-enter-active {
	animation: bounce-in 0.5s;
}
.bounce-leave-active {
	animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
	0% {
		transform: scale(0);
	}
	50% {
		transform: scale(1.25);
	}
	100% {
		transform: scale(1);
	}
}

// *************************demo5
/* 应用于嵌套元素的规则 */
.nested-enter-active .inner,
.nested-leave-active .inner {
	transition: all 0.3s ease-in-out;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
	transform: translateX(30px);
	opacity: 0;
}
.outer {
	background: #eee;
	padding: 30px;
	min-height: 100px;
}
.inner {
	background: #ccc;
	color: #213547;
	padding: 30px;
	min-height: 100px;
}

// **********demo6
.btn-show-enter-active {
	transition: all 0.3s ease-in-out;
}
.btn-show-leave-active {
	transition: all 0.3s ease-in-out;
}
.btn-show-enter-from {
	transform: translateY(-30px);
	opacity: 0;
}
.btn-show-leave-to {
	transform: translateY(30px);
	opacity: 0;
}
.poa {
	position: absolute;
}

// ****************demo8
.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(30px);
}

.list1-move,
.list1-enter-active,
.list1-leave-active {
	transition: all 0.5s ease;
}
.list1-enter-from,
.list1-leave-to {
	opacity: 0;
	transform: translateX(30px);
}
/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list1-leave-active {
	position: absolute;
}
</style>
