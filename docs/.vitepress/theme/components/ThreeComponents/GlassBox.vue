<template>
	<div id="container" ref="containerRef"></div>
</template>

<script setup>
import * as THREE from 'three'
import { ref, onMounted } from 'vue'
onMounted(() => {
	init()
})

let container
let containerRef = ref(null)

let camera, scene, renderer

function init() {
	container = containerRef.value
	console.log(container)

	camera = new THREE.PerspectiveCamera(50, 800 / 500, 1, 10)
	camera.position.z = 2

	scene = new THREE.Scene()

	const vertexCount = 200 * 3

	const geometry = new THREE.BufferGeometry()

	const positions = []
	const colors = []

	for (let i = 0; i < vertexCount; i++) {
		// adding x,y,z
		positions.push(Math.random() - 0.5)
		positions.push(Math.random() - 0.5)
		positions.push(Math.random() - 0.5)

		// adding r,g,b,a
		colors.push(Math.random() * 255)
		colors.push(Math.random() * 255)
		colors.push(Math.random() * 255)
		colors.push(Math.random() * 255)
	}

	const positionAttribute = new THREE.Float32BufferAttribute(positions, 3)
	const colorAttribute = new THREE.Uint8BufferAttribute(colors, 4)

	colorAttribute.normalized = true // this will map the buffer values to 0.0f - +1.0f in the shader

	geometry.setAttribute('position', positionAttribute)
	geometry.setAttribute('color', colorAttribute)

	const material = new THREE.RawShaderMaterial({
		uniforms: {
			time: { value: 1.0 },
		},
		vertexShader: `precision mediump float;
			precision mediump int;

			uniform mat4 modelViewMatrix; // optional
			uniform mat4 projectionMatrix; // optional

			attribute vec3 position;
			attribute vec4 color;

			varying vec3 vPosition;
			varying vec4 vColor;

			void main()	{

				vPosition = position;
				vColor = color;

				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			}`,
		fragmentShader: `precision mediump float;
			precision mediump int;

			uniform float time;

			varying vec3 vPosition;
			varying vec4 vColor;

			void main()	{

				vec4 color = vec4( vColor );
				color.r += sin( vPosition.x * 10.0 + time ) * 0.5;

				gl_FragColor = color;

			}`,
		side: THREE.DoubleSide,
		transparent: true,
	})

	const mesh = new THREE.Mesh(geometry, material)
	scene.add(mesh)

	renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.setSize(800, 500)
	renderer.setClearColor(0x000000, 0)
	renderer.setAnimationLoop(animate)
	container.appendChild(renderer.domElement)

	window.addEventListener('resize', onWindowResize)
}

function onWindowResize() {
	camera.aspect = 800 / 500
	camera.updateProjectionMatrix()

	renderer.setSize(800, 500)
}

function animate() {
	const time = performance.now()

	const object = scene.children[0]

	object.rotation.y = time * 0.0005
	object.material.uniforms.time.value = time * 0.005

	renderer.render(scene, camera)
}
</script>

<style lang="scss" scoped></style>
