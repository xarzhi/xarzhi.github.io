import * as THREE from 'three'
// 注意：本项目 three 为 0.135（没有 `three/addons/*` 的 exports 映射），
// 因此这里用 `three/examples/jsm/*` 的完整路径。
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import {
	FACE_TURN,
	createSolvedState,
	isSolvedUpToRotation,
	solveCube,
	turnAxis,
} from './solver'
import type { Axis, CubeState, Face, Layer, Move } from './solver'

export type { Axis, Face, Layer } from './solver'

/** 单个小方块的边长与格点间距（间距固定为 1，缝隙由边长决定） */
const CUBIE_SIZE = 0.96
const CUBIE_RADIUS = 0.035
const STICKER_SIZE = 0.9
const STICKER_DEPTH = 0.02
/** 贴纸圆角半径 */
const STICKER_RADIUS = 0.11

/** 圆角矩形轮廓：每个色块都是一块圆角贴纸 */
function createStickerShape(size: number, radius: number) {
	const s = size / 2
	const r = Math.min(radius, s)
	const shape = new THREE.Shape()
	shape.moveTo(-s, -s + r)
	shape.lineTo(-s, s - r)
	shape.quadraticCurveTo(-s, s, -s + r, s)
	shape.lineTo(s - r, s)
	shape.quadraticCurveTo(s, s, s, s - r)
	shape.lineTo(s, -s + r)
	shape.quadraticCurveTo(s, -s, s - r, -s)
	shape.lineTo(-s + r, -s)
	shape.quadraticCurveTo(-s, -s, -s, -s + r)
	shape.closePath()
	return shape
}

/** 标准配色：上白下黄、右红左橙、前绿后蓝 */
const STICKER_COLORS: Record<Face, number> = {
	U: 0xf6f9ff,
	D: 0xffd51e,
	R: 0xe0283c,
	L: 0xff8f1f,
	F: 0x1fc46d,
	B: 0x2a70f0,
}

/**
 * three 0.135 没有现代的色彩管理：十六进制颜色会被直接当作线性值，
 * 再配合 sRGB 输出就会「编码两次」，颜色整体发白（绿变青、红变粉）。
 * 这里显式把 sRGB 颜色转成线性，渲染结果才和现代 three 一致。
 */
const srgb = (hex: number) => new THREE.Color(hex).convertSRGBToLinear()

const FACE_NORMALS: { face: Face; normal: THREE.Vector3 }[] = [
	{ face: 'R', normal: new THREE.Vector3(1, 0, 0) },
	{ face: 'L', normal: new THREE.Vector3(-1, 0, 0) },
	{ face: 'U', normal: new THREE.Vector3(0, 1, 0) },
	{ face: 'D', normal: new THREE.Vector3(0, -1, 0) },
	{ face: 'F', normal: new THREE.Vector3(0, 0, 1) },
	{ face: 'B', normal: new THREE.Vector3(0, 0, -1) },
]

const Z_AXIS = new THREE.Vector3(0, 0, 1)
const TURN_DURATION = 0.22
const QUEUE_LIMIT = 36
/**
 * 自动复原的步长：层先法一条解法通常一百多步，太慢会看得着急，
 * 太快又看不清，所以按「整段大约 8 秒」反推每步时长，并夹在一个舒服的区间里。
 * 注意实际会略长一点：60fps 下每步会被向上取整到整帧，
 * 下限 0.04s 也是给一帧（0.0167s）留的余量，再短就等于白算。
 */
const solveStepDuration = (steps: number) => Math.min(0.22, Math.max(0.04, 8 / steps))

interface PendingTurn {
	axis: Axis
	layer: Layer
	dir: 1 | -1
	duration: number
}

interface ActiveTurn {
	pivot: THREE.Group
	cubies: THREE.Group[]
	axis: Axis
	dir: 1 | -1
	duration: number
	elapsed: number
}

export interface CubeController {
	root: THREE.Group
	turn: (face: Face, prime?: boolean) => void
	/** 按任意轴与层直接转动：拖动交互会用到中间层（layer = 0） */
	rotate: (axis: Axis, layer: Layer, dir: 1 | -1) => void
	scramble: (moves?: number) => void
	reset: () => void
	/**
	 * 一步一步自动复原：用层先法（LBL）现算一条真实解法再逐步播放。
	 * @returns 需要走的步数，0 表示当前已经是还原状态（不会启动动画）
	 */
	solve: (onDone?: () => void) => number
	/** 是否正在自动复原 */
	isSolving: () => boolean
	/** 魔方是否已经复原（决定“复原”按钮是否可用） */
	isSolved: () => boolean
	update: (delta: number) => void
	dispose: () => void
}

/** 缓入缓出，让转动有“咬合”的手感 */
const easeInOutCubic = (t: number) =>
	t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

/**
 * 构建一个 3×3×3 魔方：26 个小方块 + 外表面贴纸。
 * 转动通过“临时 pivot 分组 -> 旋转 -> 世界变换烘焙回小方块”完成，
 * 不依赖任何外部动画库，状态始终由每个小方块的 position/quaternion 表示。
 */
export function createRubiksCube(): CubeController {
	const root = new THREE.Group()

	const bodyGeometry = new RoundedBoxGeometry(
		CUBIE_SIZE,
		CUBIE_SIZE,
		CUBIE_SIZE,
		4,
		CUBIE_RADIUS
	)
	// 圆角贴纸：圆角矩形轮廓向法线方向薄挤出
	const stickerGeometry = new THREE.ExtrudeGeometry(
		createStickerShape(STICKER_SIZE, STICKER_RADIUS),
		{
			depth: STICKER_DEPTH,
			bevelEnabled: false,
			curveSegments: 6,
		}
	)
	stickerGeometry.translate(0, 0, -STICKER_DEPTH / 2)

	const bodyMaterial = new THREE.MeshStandardMaterial({
		color: srgb(0x020306),
		roughness: 0.88,
		metalness: 0.06,
		// three 0.135 没有 scene.environmentIntensity，改用材质自身强度控制环境反射
		envMapIntensity: 0.18,
	})

	const stickerMaterials = new Map<Face, THREE.MeshStandardMaterial>()
	for (const face of Object.keys(STICKER_COLORS) as Face[]) {
		stickerMaterials.set(
			face,
			new THREE.MeshStandardMaterial({
				color: srgb(STICKER_COLORS[face]),
				roughness: 0.4,
				metalness: 0,
				envMapIntensity: 0.09,
			})
		)
	}

	// ---- 生成 26 个小方块 -------------------------------------------------
	const cubies: THREE.Group[] = []
	const homes = new Map<
		THREE.Group,
		{ position: THREE.Vector3; quaternion: THREE.Quaternion }
	>()

	for (let x = -1; x <= 1; x++) {
		for (let y = -1; y <= 1; y++) {
			for (let z = -1; z <= 1; z++) {
				if (x === 0 && y === 0 && z === 0) continue // 核心块不可见

				const cubie = new THREE.Group()
				cubie.position.set(x, y, z)
				cubie.add(new THREE.Mesh(bodyGeometry, bodyMaterial))

				for (const { face, normal } of FACE_NORMALS) {
					// 只有朝外的面才贴颜色
					if (normal.x * x + normal.y * y + normal.z * z !== 1) continue
					const sticker = new THREE.Mesh(
						stickerGeometry,
						stickerMaterials.get(face)!
					)
					sticker.position.copy(normal).multiplyScalar(CUBIE_SIZE / 2)
					sticker.quaternion.setFromUnitVectors(Z_AXIS, normal)
					cubie.add(sticker)
				}

				root.add(cubie)
				cubies.push(cubie)
				homes.set(cubie, {
					position: cubie.position.clone(),
					quaternion: cubie.quaternion.clone(),
				})
			}
		}
	}

	// ---- 内部黑色球核 ----------------------------------------------------
	// 方块之间 0.04 的缝隙会一直通到内部，没有遮挡时会透出画面背景。
	// 放一个半径 1.3 的球：缝隙深处被黑色填住，同时小于转动层的最小外露半径（约 1.39），
	// 所以转层时不会把方块吞进去。
	const coreGeometry = new THREE.SphereGeometry(1.3, 48, 32)
	const coreMaterial = new THREE.MeshStandardMaterial({
		color: 0x020306,
		roughness: 1,
		metalness: 0,
		envMapIntensity: 0.12,
	})
	const core = new THREE.Mesh(coreGeometry, coreMaterial)
	core.name = 'cube-core'
	core.raycast = () => {} // 不参与鼠标拾取
	root.add(core)

	// ---- 转动队列 --------------------------------------------------------
	const queue: PendingTurn[] = []
	let active: ActiveTurn | null = null

	/**
	 * 渲染之外还维护一份「纯逻辑」的魔方状态（见 ./solver.ts）。
	 * 每转完一层就同步一次，求解器读的就是这份状态 —— 它不知道也不可能
	 * 知道你是怎么把魔方打乱的，只能像人一样看着六面颜色现算解法。
	 */
	let logic: CubeState = createSolvedState()
	/** 自动复原的剩余步骤；null 表示当前不在复原 */
	let solveSteps: PendingTurn[] | null = null
	/** 复原结束的一次性回调 */
	let solveDone: (() => void) | null = null

	const begin = (turn: PendingTurn) => {
		const pivot = new THREE.Group()
		pivot.name = 'turn-pivot'
		root.add(pivot)

		const layerCubies = cubies.filter(
			(cubie) => Math.round(cubie.position[turn.axis]) === turn.layer
		)
		// attach 会保留世界变换，把小方块从 root 转移到 pivot 下
		for (const cubie of layerCubies) pivot.attach(cubie)

		active = { pivot, cubies: layerCubies, ...turn, elapsed: 0 }
	}

	const finish = () => {
		if (!active) return
		const { pivot, cubies: layerCubies, axis, layer, dir } = active

		// 逻辑状态跟着转（自动化复原、打乱、拖拽都走这里，三条路径不会失真）
		turnAxis(logic, axis, layer, dir)

		pivot.updateMatrixWorld(true)
		root.updateMatrixWorld(true)

		for (const cubie of layerCubies) {
			root.attach(cubie)
			// 90° 转动后格点坐标仍是整数，取整消除浮点漂移
			cubie.position.set(
				Math.round(cubie.position.x),
				Math.round(cubie.position.y),
				Math.round(cubie.position.z)
			)
			cubie.quaternion.normalize()
		}

		pivot.clear()
		root.remove(pivot)
		active = null
	}

	const push = (
		axis: Axis,
		layer: Layer,
		dir: 1 | -1,
		duration: number
	) => {
		if (queue.length >= QUEUE_LIMIT) return
		queue.push({ axis, layer, dir, duration })
	}

	/** 推进一步动画：一次只转一层，转完才轮到下一层 */
	const stepTurn = (delta: number) => {
		// 自动复原：等当前这一步彻底转完，才启动下一步，
		// 这样视觉上就是一层一层按顺序还原，而不是一口气连转。
		if (!active && solveSteps) {
			const next = solveSteps.shift()
			if (next) {
				begin(next)
			} else {
				solveSteps = null
				const done = solveDone
				solveDone = null
				if (done) done()
			}
		}

		if (!active && queue.length > 0) begin(queue.shift())
		if (!active) return

		active.elapsed += delta
		const progress = Math.min(active.elapsed / active.duration, 1)
		const eased = easeInOutCubic(progress)
		active.pivot.rotation[active.axis] = active.dir * (Math.PI / 2) * eased

		if (progress >= 1) finish()
	}

	return {
		root,

		turn(face, prime = false) {
			const def = FACE_TURN[face]
			push(
				def.axis,
				def.layer,
				(prime ? -def.dir : def.dir) as 1 | -1,
				TURN_DURATION
			)
		},

		rotate(axis, layer, dir) {
			push(axis, layer, dir, TURN_DURATION)
		},

		scramble(moves = 20) {
			const faces = Object.keys(FACE_TURN) as Face[]
			let last = ''
			for (let i = 0; i < moves; i++) {
				let face = faces[Math.floor(Math.random() * faces.length)]
				while (face === last) {
					face = faces[Math.floor(Math.random() * faces.length)]
				}
				last = face
				const def = FACE_TURN[face]
				push(
					def.axis,
					def.layer,
					(Math.random() > 0.5 ? -def.dir : def.dir) as 1 | -1,
					0.1
				)
			}
		},

		reset() {
			queue.length = 0
			// 如果在复原途中被强制复位，通知调用方复原已结束
			if (solveSteps) {
				solveSteps = null
				const done = solveDone
				solveDone = null
				if (done) done()
			}
			// 先把正在转的那一层落位（finish 会顺带改逻辑状态），
			// 再重建逻辑状态 —— 顺序反过来会被这一步补转，刚复位的魔方立刻又歪了
			finish()
			logic = createSolvedState()
			for (const cubie of cubies) {
				const home = homes.get(cubie)!
				cubie.position.copy(home.position)
				cubie.quaternion.copy(home.quaternion)
			}
		},

		solve(onDone) {
			// 已经在复原，不重入
			if (solveSteps) return 0
			// 丢弃还没执行的转动：它们从未真正发生
			queue.length = 0
			// 正在转的那一层先转到位，逻辑状态和画面才是同一个局面
			if (active) {
				active.elapsed = active.duration
				stepTurn(0)
			}

			let moves: Move[]
			try {
				moves = solveCube(logic)
			} catch (error) {
				// 求解器兜底：算不出来就什么都不做，别把魔方停在半路
				console.warn('[rubik] 层先法求解失败', error)
				return 0
			}
			if (moves.length === 0) return 0

			// 180° 会拆成两个 90°，实际播放步数比解法步数多，按实际步数定步长
			const playLength = moves.reduce((n, mv) => n + (mv.amount === 2 ? 2 : 1), 0)
			const duration = solveStepDuration(playLength)
			const steps: PendingTurn[] = []
			for (const move of moves) {
				const def = FACE_TURN[move.face]
				// amount: 1 = 顺时针 90°，2 = 180°，3 = 逆时针 90°
				const turn: PendingTurn = {
					axis: def.axis,
					layer: def.layer,
					dir: (move.amount === 3 ? -def.dir : def.dir) as 1 | -1,
					duration,
				}
				steps.push(turn)
				// 180° 的转动拆成两个 90°，动画和逻辑才对得上
				if (move.amount === 2) steps.push({ ...turn })
			}

			solveSteps = steps
			solveDone = onDone || null
			return steps.length
		},

		isSolving() {
			return solveSteps !== null
		},

		isSolved() {
			return isSolvedUpToRotation(logic)
		},

		update(delta) {
			stepTurn(delta)
		},

		dispose() {
			queue.length = 0
			solveSteps = null
			solveDone = null
			if (active) {
				active.pivot.clear()
				root.remove(active.pivot)
				active = null
			}
			bodyGeometry.dispose()
			stickerGeometry.dispose()
			coreGeometry.dispose()
			bodyMaterial.dispose()
			coreMaterial.dispose()
			stickerMaterials.forEach((material) => material.dispose())
			root.clear()
		},
	}
}
