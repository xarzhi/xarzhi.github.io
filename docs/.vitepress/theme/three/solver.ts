/**
 * 纯逻辑的 3×3 魔方模型 + 层先法（LBL）求解器。
 *
 * 这一层完全不依赖 three.js，可以单独在 Node 里跑测试；
 * 渲染层（three/rubiks.ts）只负责把这里算出来的步骤播成动画。
 *
 * 坐标系与渲染层一致：
 *   x: R(+) / L(-)   y: U(+) / D(-)   z: F(+) / B(-)
 * 转动方向遵循右手定则：绕 +axis 转 +90°，即 `dir = +1`。
 *
 * 求解用的是「魔方小站」那套入门层先法，全部是市面上通用公式：
 *   1. 底层十字        —— 白棱归位（这里用 BFS 求最短插入，落点仍是人手的十字）
 *   2. 底角归位        —— R' D' R D 循环
 *   3. 中棱归位        —— U R U' R' U' F' U F / U' F' U F U R U' R'
 *   4. 顶棱面位（十字）—— F R U R' U' F'
 *   5. 顶角面位        —— R' D' R D 循环翻角
 *   6. 顶角归位        —— U R U' L' U R' U' L
 *   7. 顶棱归位        —— R U' R U R U R U' R' U' R2
 *
 * 注意：上面这些公式都是「白色面在底」的经典写法，而本项目里白色在顶。
 * 因此统一用 mirrorAlg() 做一次上下镜像（U <-> D 并且反向）之后再使用 ——
 * 镜像后的公式同样是「市面上通用的那一套」，只是照着镜像面念而已。
 */

export type Face = 'U' | 'D' | 'R' | 'L' | 'F' | 'B'
export type Axis = 'x' | 'y' | 'z'
export type Layer = -1 | 0 | 1
export type Amount = 1 | 2 | 3

export interface Move {
	face: Face
	amount: Amount
}

export type Vec = number[]
/** 3×3 旋转矩阵，行主序，元素都是 -1/0/1 */
export type Mat = number[]

export const FACES: Face[] = ['U', 'D', 'R', 'L', 'F', 'B']

const NORMAL: Record<Face, Vec> = {
	U: [0, 1, 0],
	D: [0, -1, 0],
	R: [1, 0, 0],
	L: [-1, 0, 0],
	F: [0, 0, 1],
	B: [0, 0, -1],
}

/**
 * 面 -> 转轴 / 所在层 / 90° 手性。
 * 与渲染层共用同一张表，保证逻辑状态和三维动画永远一致。
 */
export const FACE_TURN: Record<Face, { axis: Axis; layer: 1 | -1; dir: 1 | -1 }> = {
	R: { axis: 'x', layer: 1, dir: -1 },
	L: { axis: 'x', layer: -1, dir: 1 },
	U: { axis: 'y', layer: 1, dir: -1 },
	D: { axis: 'y', layer: -1, dir: 1 },
	F: { axis: 'z', layer: 1, dir: -1 },
	B: { axis: 'z', layer: -1, dir: 1 },
}

/** 绕 +axis 右手定则 +90° 的旋转矩阵 */
const ROT_POS: Record<Axis, Mat> = {
	x: [1, 0, 0, 0, 0, -1, 0, 1, 0],
	y: [0, 0, 1, 0, 1, 0, -1, 0, 0],
	z: [0, -1, 0, 1, 0, 0, 0, 0, 1],
}

const IDENTITY: Mat = [1, 0, 0, 0, 1, 0, 0, 0, 1]

/* ------------------------------------------------------------------ */
/* 矩阵工具                                                            */
/* ------------------------------------------------------------------ */

const matVec = (m: Mat, v: Vec): Vec => [
	m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
	m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
	m[6] * v[0] + m[7] * v[1] + m[8] * v[2],
]

const matMul = (a: Mat, b: Mat): Mat => {
	const out = new Array<number>(9)
	for (let r = 0; r < 3; r++) {
		for (let c = 0; c < 3; c++) {
			out[r * 3 + c] = a[r * 3] * b[c] + a[r * 3 + 1] * b[3 + c] + a[r * 3 + 2] * b[6 + c]
		}
	}
	return out
}

const matTranspose = (m: Mat): Mat => [m[0], m[3], m[6], m[1], m[4], m[7], m[2], m[5], m[8]]

const sameVec = (a: Vec, b: Vec) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2]

const sameMat = (a: Mat, b: Mat) => a.every((v, i) => v === b[i])

/** 由 Rx / Ry 生成的 24 个整体旋转 */
const ROTATIONS_24: Mat[] = (() => {
	const seen = new Map<string, Mat>()
	const queue: Mat[] = [IDENTITY]
	seen.set(IDENTITY.join(','), IDENTITY)
	while (queue.length) {
		const m = queue.pop()!
		for (const gen of [ROT_POS.x, ROT_POS.y]) {
			const next = matMul(m, gen)
			const key = next.join(',')
			if (seen.has(key)) continue
			seen.set(key, next)
			queue.push(next)
		}
	}
	return [...seen.values()]
})()

/* ------------------------------------------------------------------ */
/* 魔方状态                                                            */
/* ------------------------------------------------------------------ */

export interface Piece {
	/** 还原状态下所在格点 */
	home: Vec
	/** 贴纸颜色，按贴纸法线顺序排列 */
	colors: Face[]
	pos: Vec
	/** 从初始朝向到当前朝向的旋转矩阵 */
	rot: Mat
}

export interface CubeState {
	pieces: Piece[]
}

/** 角块：顺时针 3 张贴纸 */
const CORNER_COLORS: Face[][] = [
	['U', 'R', 'F'],
	['U', 'F', 'L'],
	['U', 'L', 'B'],
	['U', 'B', 'R'],
	['D', 'F', 'R'],
	['D', 'L', 'F'],
	['D', 'B', 'L'],
	['D', 'R', 'B'],
]

/** 棱块：2 张贴纸 */
const EDGE_COLORS: Face[][] = [
	['U', 'R'],
	['U', 'F'],
	['U', 'L'],
	['U', 'B'],
	['D', 'R'],
	['D', 'F'],
	['D', 'L'],
	['D', 'B'],
	['F', 'R'],
	['F', 'L'],
	['B', 'L'],
	['B', 'R'],
]

const sumNormals = (colors: Face[]): Vec => {
	const v = [0, 0, 0]
	for (const c of colors) {
		v[0] += NORMAL[c][0]
		v[1] += NORMAL[c][1]
		v[2] += NORMAL[c][2]
	}
	return v
}

const faceOfVec = (v: Vec): Face => {
	for (const f of FACES) {
		if (sameVec(NORMAL[f], v)) return f
	}
	throw new Error(`不是合法的面法线: ${v.join(',')}`)
}

export function createSolvedState(): CubeState {
	const pieces: Piece[] = []
	const push = (colors: Face[]) => {
		pieces.push({
			home: sumNormals(colors),
			colors: colors.slice(),
			pos: sumNormals(colors),
			rot: IDENTITY.slice(),
		})
	}
	CORNER_COLORS.forEach(push)
	EDGE_COLORS.forEach(push)
	// 6 个中心块：整体旋转（拖拽中层）时会跟着走，也要跟踪
	FACES.forEach(face => push([face]))
	return { pieces }
}

export function cloneState(state: CubeState): CubeState {
	return {
		pieces: state.pieces.map(p => ({
			home: p.home.slice(),
			colors: p.colors.slice(),
			pos: p.pos.slice(),
			rot: p.rot.slice(),
		})),
	}
}

/** 绕某个轴转某一层（只转 90°） */
function rotateLayer(state: CubeState, axis: Axis, layer: Layer, mat: Mat) {
	const index = axis === 'x' ? 0 : axis === 'y' ? 1 : 2
	for (const piece of state.pieces) {
		if (Math.round(piece.pos[index]) !== layer) continue
		const nextPos = matVec(mat, piece.pos)
		const nextRot = matMul(mat, piece.rot)
		for (let i = 0; i < 3; i++) piece.pos[i] = nextPos[i]
		for (let i = 0; i < 9; i++) piece.rot[i] = nextRot[i]
	}
}

/** 按面转动：amount 为 1/2/3（顺时针 90°/180°/270°） */
export function applyMove(state: CubeState, face: Face, amount: number = 1) {
	const times = ((amount % 4) + 4) % 4
	if (!times) return
	const { axis, layer, dir } = FACE_TURN[face]
	const mat = dir > 0 ? ROT_POS[axis] : matTranspose(ROT_POS[axis])
	for (let i = 0; i < times; i++) rotateLayer(state, axis, layer, mat)
}

/** 按「轴 + 层 + 方向」转动 90°：拖拽中层、打乱都走这条路 */
export function turnAxis(state: CubeState, axis: Axis, layer: Layer, dir: 1 | -1) {
	const mat = dir > 0 ? ROT_POS[axis] : matTranspose(ROT_POS[axis])
	rotateLayer(state, axis, layer, mat)
}

/**
 * 块是否在还原位置。
 * 中心块只有一个颜色，转动时会在原地自转（rot 不是单位阵），外观完全不变，
 * 所以中心块只比位置、不比朝向。
 */
export const isPieceSolved = (piece: Piece) =>
	sameVec(piece.pos, piece.home) && (piece.colors.length === 1 || sameMat(piece.rot, IDENTITY))

export const isStateSolved = (state: CubeState) => state.pieces.every(isPieceSolved)

/**
 * 「每面同色」就算复原。
 *
 * 魔方真正的复原态本来就允许整体转动（白朝上还是白朝下都算复原），
 * 而拖拽中层相当于把整个魔方转了一下 —— 这种局面只用面转动是回不到
 * 「白朝上」那个唯一朝向的，所以判断是否还需要复原时用这个更宽松的口径。
 */
export function isSolvedUpToRotation(state: CubeState): boolean {
	const faceColor = new Map<Face, Face>()
	for (const piece of state.pieces) {
		for (const color of piece.colors) {
			const face = faceOfVec(stickerDir(piece, color))
			const exist = faceColor.get(face)
			if (exist === undefined) faceColor.set(face, color)
			else if (exist !== color) return false
		}
	}
	return true
}

/** 贴纸当前指向的法线 */
export const stickerDir = (piece: Piece, color: Face): Vec => matVec(piece.rot, NORMAL[color])

const findPiece = (state: CubeState, colors: Face[]): Piece => {
	const found = state.pieces.find(
		p => p.colors.length === colors.length && colors.every(c => p.colors.includes(c))
	)
	if (!found) throw new Error(`找不到块: ${colors.join('')}`)
	return found
}

const findEdge = (state: CubeState, colors: Face[]) => findPiece(state, colors)
const findCorner = (state: CubeState, colors: Face[]) => findPiece(state, colors)

/* ------------------------------------------------------------------ */
/* 公式工具                                                            */
/* ------------------------------------------------------------------ */

/** "R U R' U2" -> Move[] */
export function parseAlg(text: string): Move[] {
	return text
		.trim()
		.split(/\s+/)
		.map(token => {
			const face = token[0].toUpperCase() as Face
			if (!FACES.includes(face)) throw new Error(`未知的面: ${token}`)
			const rest = token.slice(1)
			const amount: Amount = rest === '2' ? 2 : rest === "'" ? 3 : 1
			return { face, amount }
		})
}

/** 上下镜像：U <-> D 且反向（对应「白色在底」与「白色在顶」两套念法） */
export function mirrorAlg(moves: Move[]): Move[] {
	return moves.map(({ face, amount }) => ({
		face: face === 'U' ? 'D' : face === 'D' ? 'U' : face,
		amount: (((4 - amount) % 4) || 4) as Amount,
	}))
}

export function invertAlg(moves: Move[]): Move[] {
	return moves
		.slice()
		.reverse()
		.map(({ face, amount }) => ({ face, amount: ((4 - amount) % 4) as Amount }))
}

/** 用一个整体旋转去共轭整条公式：把公式搬到别的槽位 */
function conjAlg(moves: Move[], rot: Mat): Move[] {
	return moves.map(({ face, amount }) => ({ face: faceOfVec(matVec(rot, NORMAL[face])), amount }))
}

/** 绕 y 轴转 k 个 90°（URF -> UBR -> ULB -> UFL 这种顺序） */
const yRotation = (k: number): Mat => {
	let m = IDENTITY.slice()
	for (let i = 0; i < ((k % 4) + 4) % 4; i++) m = matMul(ROT_POS.y, m)
	return m
}

/* ------------------------------------------------------------------ */
/* 第一步：底层（白色）十字 —— BFS 求最短插入                            */
/* ------------------------------------------------------------------ */

const EDGE_SLOTS = EDGE_COLORS.map(sumNormals)

const slotIndexOf = (pos: Vec) => {
	const index = EDGE_SLOTS.findIndex(slot => sameVec(slot, pos))
	if (index < 0) throw new Error(`不是棱块槽位: ${pos.join(',')}`)
	return index
}

/**
 * 该槽位所在的那些面。
 * 注意判据是 `法线 · 位置 === 1`（贴纸贴在这个面上），不能用绝对值 ——
 * 用绝对值会让 (-1,0,-1) 同时命中 R 和 L 两个面，后面算朝向就全乱了。
 */
const slotFaces = (pos: Vec): Face[] =>
	FACES.filter(f => NORMAL[f][0] * pos[0] + NORMAL[f][1] * pos[1] + NORMAL[f][2] * pos[2] === 1)

/** 棱块压缩状态：槽位 * 2 + 首张贴纸朝向（0/1），共 24 种 */
const reduceEdge = (piece: Piece): number => {
	const slot = slotIndexOf(piece.pos)
	const faces = slotFaces(piece.pos)
	const dir = stickerDir(piece, piece.colors[0])
	return slot * 2 + (sameVec(dir, NORMAL[faces[0]]) ? 0 : 1)
}

const homeEdgeState = (piece: Piece): number => {
	const slot = slotIndexOf(piece.home)
	const faces = slotFaces(piece.home)
	return slot * 2 + Math.max(0, faces.indexOf(piece.colors[0]))
}

/** 18 个基本转动对 24 种棱块状态的映射表 */
const EDGE_MOVE_TABLE: Uint8Array[] = (() => {
	const table: Uint8Array[] = []
	const probe: CubeState = { pieces: [] }
	for (let slot = 0; slot < 12; slot++) {
		const pos = EDGE_SLOTS[slot]
		const faces = slotFaces(pos)
		for (let ori = 0; ori < 2; ori++) {
			probe.pieces[slot * 2 + ori] = {
				home: pos.slice(),
				colors: ori === 0 ? [faces[0], faces[1]] : [faces[1], faces[0]],
				pos: pos.slice(),
				rot: IDENTITY.slice(),
			}
		}
	}
	for (const face of FACES) {
		for (let amount = 1; amount <= 3; amount++) {
			const map = new Uint8Array(24)
			for (let i = 0; i < 24; i++) {
				const one: CubeState = { pieces: [{ ...probe.pieces[i], pos: probe.pieces[i].pos.slice(), rot: IDENTITY.slice() }] }
				applyMove(one, face, amount)
				map[i] = reduceEdge(one.pieces[0])
			}
			table.push(map)
		}
	}
	return table
})()

const MOVE_INDEX: Move[] = (() => {
	const list: Move[] = []
	for (const face of FACES) for (const amount of [1, 2, 3] as Amount[]) list.push({ face, amount })
	return list
})()

const SPACE = 24 * 24 * 24 * 24

/**
 * 用 BFS 把 4 条白棱一次归位（就是人手「先摆十字」那一步，只是路径最短）。
 * 只关心这 4 条棱，其它块暂时乱着无所谓。
 */
function solveCross(state: CubeState): Move[] {
	const pieces = [
		findEdge(state, ['U', 'F']),
		findEdge(state, ['U', 'R']),
		findEdge(state, ['U', 'B']),
		findEdge(state, ['U', 'L']),
	]
	const goal = pieces.map(homeEdgeState)
	const start = pieces.map(reduceEdge)
	const encode = (s: number[]) => ((s[0] * 24 + s[1]) * 24 + s[2]) * 24 + s[3]

	const startKey = encode(start)
	const goalKey = encode(goal)
	if (startKey === goalKey) return []

	const parent = new Int32Array(SPACE).fill(-1)
	const used = new Uint8Array(SPACE)
	const queue = new Int32Array(SPACE)
	let head = 0
	let tail = 0
	parent[startKey] = startKey
	queue[tail++] = startKey

	const slots: number[] = [0, 0, 0, 0]
	while (head < tail) {
		const key = queue[head++]
		if (key === goalKey) break
		let rest = key
		for (let i = 3; i >= 0; i--) {
			slots[i] = rest % 24
			rest = Math.floor(rest / 24)
		}
		for (let mv = 0; mv < EDGE_MOVE_TABLE.length; mv++) {
			const map = EDGE_MOVE_TABLE[mv]
			const next = encode([map[slots[0]], map[slots[1]], map[slots[2]], map[slots[3]]])
			if (parent[next] !== -1) continue
			parent[next] = key
			used[next] = mv
			queue[tail++] = next
		}
	}

	if (parent[goalKey] === -1) throw new Error('十字搜索失败')

	const path: Move[] = []
	let cur = goalKey
	while (cur !== startKey) {
		path.push(MOVE_INDEX[used[cur]])
		cur = parent[cur]
	}
	return path.reverse()
}

/* ------------------------------------------------------------------ */
/* 求解上下文                                                          */
/* ------------------------------------------------------------------ */

interface Ctx {
	cube: CubeState
	moves: Move[]
}

const doMove = (ctx: Ctx, face: Face, amount: number = 1) => {
	const a = ((amount % 4) + 4) % 4
	if (!a) return
	applyMove(ctx.cube, face, a)
	ctx.moves.push({ face, amount: a as Amount })
}

const doAlg = (ctx: Ctx, alg: Move[]) => {
	for (const mv of alg) doMove(ctx, mv.face, mv.amount)
}

/* ------------------------------------------------------------------ */
/* 第二步：底角归位（白色角块）                                          */
/* ------------------------------------------------------------------ */

/** U 层四个角槽，顺序对应 yRotation(0..3) */
const CORNER_ORDER: Face[][] = [
	['U', 'R', 'F'],
	['U', 'B', 'R'],
	['U', 'L', 'B'],
	['U', 'F', 'L'],
]

const isUCornerPlaced = (piece: Piece) =>
	sameVec(piece.pos, piece.home) && sameVec(stickerDir(piece, 'U'), NORMAL.U)

/**
 * 角块在目标位正下方时的三种插入情形（白色贴纸朝 R / F / D）。
 * 都是人手用的短公式（R' D' R 这种「转开-转底-转回」的结构），
 * 只动目标角块，十字和已经归位的角块都不受影响。
 */
const CORNER_INSERTS: Move[][] = ["R' D' R", "F D F'", "R' D R F D2 F'"].map(parseAlg)

/** 角块卡在顶层时，把它挤到下层用的三步公式 */
const CORNER_EXTRACT = parseAlg("R' D R")

/** 底层（白十字 + 已归位的白角 + 已归位的中棱）是否都还完好 */
function keepIntact(cube: CubeState, solvedCorners: Face[][], solvedEdges: Face[][]): boolean {
	for (const colors of solvedCorners) {
		if (!isPieceSolved(findPiece(cube, colors))) return false
	}
	for (const colors of solvedEdges) {
		if (!isPieceSolved(findPiece(cube, colors))) return false
	}
	// 白十字
	return cube.pieces.every(p => (p.colors.length === 2 && p.colors.includes('U') ? isPieceSolved(p) : true))
}

function solveFirstLayerCorners(ctx: Ctx) {
	const solved: Face[][] = []

	for (let k = 0; k < 4; k++) {
		const colors = CORNER_ORDER[k]
		const target = sumNormals(colors)
		const ready = [target[0], -1, target[2]]
		const inserts = CORNER_INSERTS.map(alg => conjAlg(alg, yRotation(k)))
		const check = (cube: CubeState) =>
			isUCornerPlaced(findCorner(cube, colors)) && keepIntact(cube, solved, [])
		const corner = findCorner(ctx.cube, colors)
		let guard = 0

		while (!isUCornerPlaced(corner)) {
			if (guard++ > 20) throw new Error(`底角归位失败: ${colors.join('')}`)
			if (corner.pos[1] === -1) {
				// 先转到目标槽位正下方
				let spins = 0
				while (!sameVec(corner.pos, ready) && spins++ < 4) doMove(ctx, 'D', 1)
				// 三种朝向各有一条短公式，挑一条真能插进去的
				const hit = inserts.find(alg => tryProgram(ctx, alg, check))
				if (!hit) {
					throw new Error(
						`底角插入失败: ${colors.join('')} pos=${corner.pos.join(',')} ready=${ready.join(',')} white=${stickerDir(corner, 'U').join(',')}`
					)
				}
				doAlg(ctx, hit)
			} else {
				// 卡在顶层：用它所在槽位那一列的三步公式把它挤下去
				const index = CORNER_ORDER.findIndex(c => sameVec(sumNormals(c), corner.pos))
				doAlg(ctx, conjAlg(CORNER_EXTRACT, yRotation(index)))
			}
		}
		solved.push(colors)
	}
}

/* ------------------------------------------------------------------ */
/* 第三步：中棱归位                                                      */
/* ------------------------------------------------------------------ */

/** 中层四个棱槽，顺序对应 yRotation(0..3)：FR -> BR -> BL -> FL */
const MIDDLE_ORDER: Face[][] = [
	['F', 'R'],
	['B', 'R'],
	['B', 'L'],
	['F', 'L'],
]

interface ReadyState {
	pos: Vec
	/** 每个颜色对应的朝向 */
	dirs: Vec[]
}

/** 由公式逆推「准备位」：对还原态做公式的逆，目标棱块会落在一个底层槽位上 */
function computeReadyState(formula: Move[], colors: Face[]): ReadyState {
	const probe = createSolvedState()
	for (const mv of invertAlg(formula)) applyMove(probe, mv.face, mv.amount)
	const piece = findEdge(probe, colors)
	return { pos: piece.pos.slice(), dirs: piece.colors.map(c => stickerDir(piece, c)) }
}

/** 中棱插入的两条经典公式（往右插 / 往左插），白色在底时就是 U R U' R' U' F' U F 那套 */
const MIDDLE_FORMULAS: Move[][] = ["U R U' R' U' F' U F", "U' F' U F U R U' R'"].map(text =>
	mirrorAlg(parseAlg(text))
)

/**
 * 边块还要转几个 D 才能对上准备位；对不上返回 -1。
 * 只做计算，不动真实状态。
 */
function findDSpin(edge: Piece, ready: ReadyState): number {
	let pos = edge.pos.slice()
	let dirs = edge.colors.map(c => stickerDir(edge, c))
	const mat = ROT_POS.y
	for (let n = 0; n < 4; n++) {
		if (sameVec(pos, ready.pos) && dirs.every((d, i) => sameVec(d, ready.dirs[i]))) return n
		pos = matVec(mat, pos)
		dirs = dirs.map(d => matVec(mat, d))
	}
	return -1
}

function solveMiddleEdges(ctx: Ctx) {
	const solved: Face[][] = []

	for (let k = 0; k < 4; k++) {
		const colors = MIDDLE_ORDER[k]
		const rot = yRotation(k)
		// 同一个棱槽有「往右插」「往左插」两条公式，准备位不同，哪条对得上就用哪条
		const entries = MIDDLE_FORMULAS.map(formula => {
			const conj = conjAlg(formula, rot)
			return { formula: conj, ready: computeReadyState(conj, colors) }
		})
		const check = (cube: CubeState) =>
			isPieceSolved(findEdge(cube, colors)) && keepIntact(cube, CORNER_ORDER, solved)
		const edge = findEdge(ctx.cube, colors)
		let guard = 0

		while (!isPieceSolved(edge)) {
			if (guard++ > 20) throw new Error(`中棱归位失败: ${colors.join('')}`)
			if (edge.pos[1] === 0) {
				// 在中层但位置/朝向不对：先用该槽位的公式把它换到底层
				const index = MIDDLE_ORDER.findIndex(c => sameVec(sumNormals(c), edge.pos))
				doAlg(ctx, conjAlg(MIDDLE_FORMULAS[0], yRotation(Math.max(0, index))))
				continue
			}

			let done = false
			for (const { formula, ready } of entries) {
				const spins = findDSpin(edge, ready)
				if (spins < 0) continue
				const program: Move[] = []
				for (let i = 0; i < spins; i++) program.push({ face: 'D', amount: 1 })
				program.push(...formula)
				if (tryProgram(ctx, program, check)) {
					doAlg(ctx, program)
					done = true
					break
				}
			}
			if (done) continue

			// 两条公式都对不上（正常不会发生）：退回「转到正下方再念公式」
			let spins = 0
			while (!sameVec(edge.pos, entries[0].ready.pos) && spins++ < 4) doMove(ctx, 'D', 1)
			doAlg(ctx, entries[0].formula)
		}
		solved.push(colors)
	}
}

/* ------------------------------------------------------------------ */
/* 顶层（黄色面）                                                        */
/* ------------------------------------------------------------------ */

/** 底部两层是否完好（顶层公式都不该破坏它） */
const firstTwoLayersSolved = (cube: CubeState): boolean =>
	cube.pieces.every(piece => {
		if (piece.colors.length === 2 && !piece.colors.includes('U') && !piece.colors.includes('D')) {
			return isPieceSolved(piece) // 中层棱
		}
		if (piece.colors.includes('U')) return isPieceSolved(piece) // 底层块 + U 中心
		return true
	})

const crossOriented = (cube: CubeState): boolean =>
	cube.pieces
		.filter(p => p.colors.length === 2 && p.colors.includes('D'))
		.every(p => sameVec(stickerDir(p, 'D'), NORMAL.D))

const cornersOriented = (cube: CubeState): boolean =>
	cube.pieces.filter(p => p.colors.length === 3 && p.colors.includes('D')).every(p => sameVec(stickerDir(p, 'D'), NORMAL.D))

const cornersPlaced = (cube: CubeState): boolean =>
	cube.pieces.filter(p => p.colors.length === 3 && p.colors.includes('D')).every(isPieceSolved)

/** 施加一段候选程序后是否达标（在副本上试，失败了不影响真实状态） */
function tryProgram(ctx: Ctx, program: Move[], check: (cube: CubeState) => boolean): boolean {
	const probe = cloneState(ctx.cube)
	for (const mv of program) applyMove(probe, mv.face, mv.amount)
	return check(probe)
}

/** 顶层各步要额外保证「前两层不被弄乱」 */
const withF2L =
	(check: (cube: CubeState) => boolean) =>
	(cube: CubeState): boolean =>
		check(cube) && firstTwoLayersSolved(cube)

/**
 * 顶层「转 D 定位 + 念公式」的小搜索。
 *
 * 人手做顶层时就是：先转顶层把花样摆对，念一遍公式，再转顶层摆对，再念一遍……
 * 这里把这个过程枚举出来：每次念公式之前转几个 D 是独立的，逐层加深搜到能达标为止。
 * （如果只允许固定步长的 D，会漏掉「点 -> L -> 一字 -> 十字」这种需要换着摆的连招。）
 */
function applyLLFormula(ctx: Ctx, formula: Move[], check: (cube: CubeState) => boolean, label: string) {
	// 已经是目标状态就直接跳过，别硬把好局面转坏
	if (check(ctx.cube)) return

	const buildWith = (alg: Move[], offsets: number[], reps: number): Move[] => {
		const program: Move[] = []
		for (let i = 0; i <= reps; i++) {
			for (let k = 0; k < offsets[i]; k++) program.push({ face: 'D', amount: 1 })
			if (i < reps) program.push(...alg)
		}
		return program
	}

	// 先把候选都生成出来，按总步数从短到长试，解法才不会突然长出一大截。
	// 公式的正向和逆向都算候选 —— 三循环换方向常常能少做一两遍。
	const candidates: Move[][] = []
	for (const alg of [formula, invertAlg(formula)]) {
		for (let reps = 1; reps <= 4; reps++) {
			const offsets = new Array<number>(reps + 1).fill(0)
			const total = 4 ** (reps + 1)
			for (let code = 0; code < total; code++) {
				let rest = code
				for (let i = 0; i <= reps; i++) {
					offsets[i] = rest % 4
					rest = Math.floor(rest / 4)
				}
				candidates.push(buildWith(alg, offsets, reps))
			}
		}
	}
	candidates.sort((a, b) => a.length - b.length)

	for (const program of candidates) {
		if (tryProgram(ctx, program, check)) {
			doAlg(ctx, program)
			return
		}
	}
	throw new Error(`${label}公式搜索失败`)
}

/** 顶棱面位：F R U R' U' F' */
const solveLLCross = (ctx: Ctx) =>
	applyLLFormula(ctx, mirrorAlg(parseAlg("F R U R' U' F'")), withF2L(crossOriented), '顶棱面位')

/** 顶角面位：R' D' R D 循环翻角 */
function solveLLCornersOrientation(ctx: Ctx) {
	const trigger = mirrorAlg(parseAlg("R' D' R D"))
	const work = [1, -1, 1] // 右前下，翻角时盯住这个位置
	let guard = 0

	while (!cornersOriented(ctx.cube)) {
		if (guard++ > 30) throw new Error('顶角面位失败')
		// 找一个没朝下的角块，转到工作面
		const bad = ctx.cube.pieces.find(
			p => p.colors.length === 3 && p.colors.includes('D') && !sameVec(stickerDir(p, 'D'), NORMAL.D)
		)!
		let spins = 0
		while (!sameVec(bad.pos, work) && spins++ < 4) doMove(ctx, 'D', 1)

		// 反复念公式，直到这个角块回到工作面并且黄色朝下
		let count = 0
		while (!(sameVec(bad.pos, work) && sameVec(stickerDir(bad, 'D'), NORMAL.D))) {
			doAlg(ctx, trigger)
			if (++count > 8) throw new Error('顶角翻转不收敛')
		}
	}
}

/** 顶角归位：U R U' L' U R' U' L */
const solveLLCornerPerm = (ctx: Ctx) =>
	applyLLFormula(ctx, mirrorAlg(parseAlg("U R U' L' U R' U' L")), withF2L(cornersPlaced), '顶角归位')

/** 顶棱归位：R U' R U R U R U' R' U' R2 */
const solveLLEdgePerm = (ctx: Ctx) =>
	applyLLFormula(ctx, mirrorAlg(parseAlg("R U' R U R U R U' R' U' R2")), withF2L(isStateSolved), '顶棱归位')

/* ------------------------------------------------------------------ */
/* 整体旋转对齐（拖拽过中层时，中心块会跑位）                             */
/* ------------------------------------------------------------------ */

/** 找出把当前中心块摆回原位所需的整体旋转；已经对齐则返回 null */
function findCenterFrame(cube: CubeState): Mat | null {
	const centers = cube.pieces.filter(p => p.colors.length === 1)
	if (centers.every(p => sameVec(p.pos, p.home))) return null
	for (const cand of ROTATIONS_24) {
		if (centers.every(p => sameVec(matVec(cand, p.home), p.pos))) return cand
	}
	throw new Error('中心块状态异常')
}

const applyMatrixToPieces = (cube: CubeState, mat: Mat) => {
	for (const piece of cube.pieces) {
		const pos = matVec(mat, piece.pos)
		const rot = matMul(mat, piece.rot)
		for (let i = 0; i < 3; i++) piece.pos[i] = pos[i]
		for (let i = 0; i < 9; i++) piece.rot[i] = rot[i]
	}
}

/** 相邻同面转动合并（R R' 直接消掉），让解法更干净 */
function cancelMoves(moves: Move[]): Move[] {
	const out: Move[] = []
	for (const mv of moves) {
		const last = out[out.length - 1]
		if (last && last.face === mv.face) {
			const amount = (last.amount + mv.amount) % 4
			out.pop()
			if (amount) out.push({ face: mv.face, amount: amount as Amount })
		} else {
			out.push({ face: mv.face, amount: mv.amount })
		}
	}
	return out
}

/* ------------------------------------------------------------------ */
/* 对外入口                                                            */
/* ------------------------------------------------------------------ */

/**
 * 用层先法求一条复原路径（不会改动传入的状态）。
 * 返回的每一步都是「面 + 圈数」，交给渲染层播动画即可。
 */
export function solveCube(source: CubeState): Move[] {
	if (isSolvedUpToRotation(source)) return []

	const cube = cloneState(source)
	const frame = findCenterFrame(cube)
	if (frame) applyMatrixToPieces(cube, matTranspose(frame))

	const ctx: Ctx = { cube, moves: [] }

	doAlg(ctx, solveCross(cube))
	solveFirstLayerCorners(ctx)
	solveMiddleEdges(ctx)
	solveLLCross(ctx)
	solveLLCornersOrientation(ctx)
	solveLLCornerPerm(ctx)
	solveLLEdgePerm(ctx)

	if (!isStateSolved(cube)) throw new Error('层先法求解失败')

	const result = frame
		? ctx.moves.map(mv => ({ face: faceOfVec(matVec(frame, NORMAL[mv.face])), amount: mv.amount }))
		: ctx.moves
	return cancelMoves(result)
}
