<template>
	<div class="circle_box" ref="box"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import * as THREE from 'three'
const init = () => {
	// 创建一个场景
	const scene = new THREE.Scene()
	// 创建一个相机
	const camera = new THREE.PerspectiveCamera(40, 800 / 500, 1, 2000)
	// 设置相机的位置
	camera.position.set(0, 0, 40)
	// 创建一个渲染器
	const renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true,
	})
	renderer.setClearColor(0x000000, 0)
	//设置渲染尺寸
	renderer.setSize(800, 500)
	const box = document.querySelector('.circle_box')
	box.append(renderer.domElement)

	const max = 346
	for (let i = 0; i < max; i++) {
		const group = new THREE.Group()

		const heartShape = new THREE.Shape()
		heartShape.moveTo(-2, -2)
		heartShape.lineTo(-2, 2)
		heartShape.lineTo(2, 2)
		heartShape.lineTo(2, -2)

		const geometry = new THREE.ShapeGeometry(heartShape)

		const material = new THREE.MeshBasicMaterial({
			color: `hsl(${(360 / max) * i}, 100%, 50%)`,
		})

		const plane = new THREE.Line(geometry, material, THREE.LinePieces)

		plane.position.x = 10 // 圆环半径
		plane.rotation.z = -i / 20
		group.rotation.y = ((360 / max) * i * Math.PI) / 180

		group.add(plane)
		scene.add(group)
	}
	let rotateSpeed = 0.001
	scene.rotation.x = Math.PI / 8
	const animation = () => {
		requestAnimationFrame(animation)
		camera.aspect = 800 / 500
		camera.updateProjectionMatrix()
		scene.rotation.y -= rotateSpeed
		renderer.render(scene, camera)
	}
	animation()
	renderer.setPixelRatio(devicePixelRatio)

	let middle = 500 / 2
	window.onresize = function () {
		renderer.setSize(800, 500)
		camera.aspect = 800 / window.innerHeight
		camera.updateProjectionMatrix()
		middle = 500 / 2
	}

	document.addEventListener('mousemove', e => {
		rotateSpeed = -(e.clientX - middle) * 0.00002
	})
}

onMounted(() => {
	init()
})
</script>

