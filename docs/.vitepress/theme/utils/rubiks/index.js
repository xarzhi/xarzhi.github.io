import createCamera from './components/camera'
import createScene from './components/scene'
import createRenderer from './components/renderer'
import { Cube } from './core/cube'
import { MouseControl, TouchControl } from './core/control'
const setSize = (container, camera, renderer) => {
	camera.aspect = 800 / 500
	camera.updateProjectionMatrix()
	renderer.setSize(800, 500)
	renderer.setPixelRatio(window.devicePixelRatio)
}
class Rubiks {
	constructor(container) {
		this._controls = []
		this.camera = createCamera()
		this.scene = createScene()
		this.renderer = createRenderer()

		container.appendChild(this.renderer.domElement)
		// auto resize
		window.addEventListener('resize', () => {
			setSize(container, this.camera, this.renderer)
			this.render()
		})
		setSize(container, this.camera, this.renderer)
		this.setOrder( 3 )
		this.startAnimation()
	}
	setOrder(order) {
		this.scene.remove(...this.scene.children)
		if (this._controls.length > 0) {
			this._controls.forEach(control => control.dispose())
		}
		const cube = new Cube(order)
		this.scene.add(cube)
		this.cube = cube
		this.render()
		const winW = this.renderer.domElement.clientWidth
		const winH = this.renderer.domElement.clientHeight
		const coarseSize = cube.getCoarseCubeSize(this.camera, { w: winW, h: winH })
		const ratio = Math.max(2.2 / (winW / coarseSize), 2.2 / (winH / coarseSize))
		this.camera.position.z *= ratio
		this._controls.push(
			new MouseControl(this.camera, this.scene, this.renderer, cube),
			new TouchControl(this.camera, this.scene, this.renderer, cube)
		)
		this.render()
	}
	/**
	 * 打乱
	 */
	disorder() {
		if (this.cube) {
		}
	}
	/**
	 * 还原
	 */
	restore() {
		if (this.cube) {
			this.cube.restore()
			this.render()
		} else {
			console.error('RESTORE_ERROR: this.cube is undefined.')
		}
	}
	render() {
		this.renderer.render(this.scene, this.camera)
	}
	startAnimation() {
		const animation = time => {
			time /= 1000 // convert to seconds
			if (this.cube) {
				if (time < 2) {
					this.cube.position.z = (-1 + time / 2) * 100
				} else {
					this.cube.position.z = 0
				}
				const dis = time
				this.cube.position.y = Math.sin(dis) * 0.3
			}
			this.render()
			requestAnimationFrame(animation)
		}
		requestAnimationFrame(animation)
	}
}
export default Rubiks
