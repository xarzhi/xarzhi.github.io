/**
 * 单击行内代码即复制 —— VitePress 主题插件
 *
 * 针对的是正文里的行内代码，也就是 Markdown 用**单个反引号**写的 `` `code` ``，
 * 渲染出来是 `<p>… <code>…</code> …</p>`。围栏代码块（三个反引号）默认**不处理**，
 * 想一并开启传 `codeBlock: true`。
 *
 * ```js
 * // docs/.vitepress/theme/index.js
 * import { codeClickCopy } from './plugins/code-click-copy'
 *
 * export default {
 *   extends: DefaultTheme,
 *   enhanceApp({ app }) {
 *     app.use(codeClickCopy())
 *   },
 * }
 * ```
 *
 * ## 几个关键实现决定（改之前先读）
 *
 * 1. **行内 code 取 `textContent`，围栏代码块取 `innerText`。**
 *    代码里的连续空格必须原样保留，而 `innerText` 走的是渲染结果、会按 CSS 折叠空白；
 *    `textContent` 是原始文本，对行内 code 才对。
 *    反过来，围栏代码块必须用 `innerText` —— Shiki 把每行包成 `<span class="line">`，
 *    `textContent` 会把所有行拼成一整行。
 *
 * 2. **必须放过「用户正在选字」的情况。**
 *    拖选文字后松手会补一个 `click`（mousedown/mouseup 落在同一元素时），双击选词也会。
 *    判据：`getSelection()` 非空且 `!isCollapsed` 就 return；再拿 `event.detail > 1` 挡多击。
 *    行内 code 很短，用户双击选中它的情况比代码块更常见，这道判断尤其重要。
 *
 * 3. **链接里的行内 code 不能抢。**
 *    `` [`foo`](./x.md) `` 会渲染成 `<a><code>foo</code></a>`，点它是想跳转。
 *    所以命中前先 `closest('a')` 排除，CSS 里也把 `a > code` 的光标改回 pointer。
 *
 * 4. **事件委托挂在 `document` 上**，不在 DOMContentLoaded 时逐个 `<code>` 绑。
 *    VitePress 是 SPA，切路由会整片替换 DOM，委托不用跟着重绑，
 *    也免疫「内容异步渲染出来」的情况。
 *
 * 5. **两种反馈形态不一样。**
 *    行内 code 是 inline 元素，绝对定位的伪元素会跟着行内盒乱跑，
 *    所以提示气泡做成一个挂在 `body` 上的 `position: fixed` 单例，
 *    按被点元素的 `getBoundingClientRect()` 摆到它正上方（顶部放不下就翻到下面）。
 *    围栏代码块块级、有 `position: relative` 容器，直接用 `::after` 画在容器上更省事。
 */

const INLINE_MARK = 'vp-inline-code-copied'
const BLOCK_MARK = 'vp-code-block-copied'
const BLOCK_FAILED = 'vp-code-block-copy-failed'
const STYLE_ID = 'vp-code-click-copy-style'

/** 默认配置，可被 `codeClickCopy(options)` 覆盖 */
const DEFAULT_OPTIONS = {
	/** 行内 `` `code` `` 单击复制 */
	inlineCode: true,
	/** 围栏代码块（三个反引号）也单击复制。默认关：整块内容多，误触代价大 */
	codeBlock: false,
	/** 「已复制」提示停留时长（毫秒） */
	feedbackDuration: 900,
	/** 悬停光标；传 `'text'` 可还原成选字光标 */
	cursor: 'copy',
	/** 提示文案 */
	copiedText: '已复制',
	failedText: '复制失败',
}

/**
 * 组装样式。
 * 文案要参与 CSS 生成，用 JSON.stringify 包一层 ——
 * 它在 JS 里是安全的字符串字面量，在 CSS 里也正好是合法的带引号字符串。
 */
function buildStyle(options) {
	const danger = 'var(--vp-c-danger-1, #e0283c)'
	return `
/* ---------------- 行内 code ---------------- */
.vp-doc :not(pre) > code {
	cursor: ${options.cursor};
	transition:
		background-color 0.18s ease,
		color 0.18s ease,
		box-shadow 0.18s ease;
}

/* 悬停时描一圈品牌色，告诉用户「这个能点」 */
.vp-doc :not(pre) > code:hover {
	box-shadow: 0 0 0 1px var(--vp-c-brand-1);
}

/* 链接里的 code 是跳转用的，不参与复制，光标也要还原 */
.vp-doc a > code,
.vp-doc a > code:hover {
	cursor: pointer;
	box-shadow: none;
}

/* 复制成功的即时反馈：反色 */
.vp-doc :not(pre) > code.${INLINE_MARK} {
	background-color: var(--vp-c-brand-1);
	box-shadow: 0 0 0 1px var(--vp-c-brand-1);
	color: #fff;
}

/*
 * 跟随定位的提示气泡。只创建一个节点复用（见 ensureTip），
 * position: fixed + 内联 left/top，避免被父级 transform / overflow 裁掉。
 */
.vp-code-click-copy-tip {
	position: fixed;
	z-index: 100;
	box-sizing: border-box;
	padding: 3px 8px;
	border-radius: 4px;
	background-color: var(--vp-c-brand-1);
	color: #fff;
	font-size: 12px;
	font-weight: 500;
	line-height: 18px;
	white-space: nowrap;
	pointer-events: none;
	opacity: 0;
	transition: opacity 0.14s ease;
}

.vp-code-click-copy-tip.is-visible {
	opacity: 1;
}

.vp-code-click-copy-tip.is-failed {
	background-color: ${danger};
}

/* ---------------- 围栏代码块（可选） ---------------- */
.vp-doc div[class*='language-'] {
	cursor: ${options.cursor};
}

.vp-doc div[class*='language-'].${BLOCK_MARK} {
	box-shadow: inset 0 0 0 1px var(--vp-c-brand-1);
}

.vp-doc div[class*='language-'].${BLOCK_FAILED} {
	box-shadow: inset 0 0 0 1px ${danger};
}

.vp-doc div[class*='language-'].${BLOCK_MARK}::after,
.vp-doc div[class*='language-'].${BLOCK_FAILED}::after {
	position: absolute;
	top: 12px;
	right: 58px;
	z-index: 4;
	box-sizing: border-box;
	padding: 0 8px;
	height: 24px;
	border-radius: 4px;
	font-size: 12px;
	font-weight: 500;
	line-height: 24px;
	white-space: nowrap;
	color: #fff;
	pointer-events: none;
	animation: vp-code-click-copy-in 0.16s ease;
}

.vp-doc div[class*='language-'].${BLOCK_MARK}::after {
	content: ${JSON.stringify(options.copiedText)};
	background-color: var(--vp-c-brand-1);
}

.vp-doc div[class*='language-'].${BLOCK_FAILED}::after {
	content: ${JSON.stringify(options.failedText)};
	background-color: ${danger};
}

@keyframes vp-code-click-copy-in {
	from {
		opacity: 0;
		transform: translateY(-4px);
	}
	to {
		opacity: 1;
		transform: none;
	}
}

@media (prefers-reduced-motion: reduce) {
	.vp-code-click-copy-tip,
	.vp-doc div[class*='language-'].${BLOCK_MARK}::after,
	.vp-doc div[class*='language-'].${BLOCK_FAILED}::after {
		animation: none;
		transition: none;
	}
}
`
}

/**
 * 写剪贴板。
 * Clipboard API 只在 https / localhost 下可用（局域网 http 调试时会缺失），
 * 所以要留一条 execCommand 的退路。
 */
async function writeClipboard(text) {
	try {
		if (navigator.clipboard && window.isSecureContext) {
			await navigator.clipboard.writeText(text)
			return true
		}
	} catch {
		// 权限被拒绝、或页面失焦：不报错，直接走退路
	}

	const area = document.createElement('textarea')
	area.value = text
	area.setAttribute('readonly', '')
	// 不能用 display:none / visibility:hidden，那样选不中，execCommand 会失败
	area.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0;'
	document.body.appendChild(area)
	area.select()

	let ok = false
	try {
		ok = document.execCommand('copy')
	} catch {
		ok = false
	}
	area.remove()
	return ok
}

/** 用户当前是否有非空选区（拖选 / 双击选词之后都会成立） */
function hasSelection() {
	const selection = window.getSelection()
	return !!selection && !selection.isCollapsed && selection.toString().length > 0
}

/** 真正把插件挂到页面上，返回卸载函数 */
function mount(options) {
	const style = document.createElement('style')
	style.id = STYLE_ID
	style.textContent = buildStyle(options)
	if (!document.getElementById(STYLE_ID)) document.head.appendChild(style)

	/** 复用的提示气泡节点（懒创建） */
	let tipEl = null
	let tipTimer = 0

	const ensureTip = () => {
		if (tipEl && tipEl.isConnected) return tipEl
		tipEl = document.createElement('div')
		tipEl.className = 'vp-code-click-copy-tip'
		// 让读屏软件也能念出来
		tipEl.setAttribute('role', 'status')
		tipEl.setAttribute('aria-live', 'polite')
		document.body.appendChild(tipEl)
		return tipEl
	}

	const hideTip = () => {
		clearTimeout(tipTimer)
		if (tipEl) tipEl.classList.remove('is-visible')
	}

	/** 把气泡摆到锚点元素正上方；顶部空间不够就翻到下方 */
	const showTip = (anchor, ok) => {
		const el = ensureTip()
		const rect = anchor.getBoundingClientRect()
		const half = 40
		const centerX = Math.min(
			Math.max(rect.left + rect.width / 2, half),
			window.innerWidth - half
		)
		const above = rect.top > 44

		el.textContent = ok ? options.copiedText : options.failedText
		el.classList.toggle('is-failed', !ok)
		el.style.left = `${Math.round(centerX)}px`
		el.style.top = `${Math.round(above ? rect.top - 6 : rect.bottom + 6)}px`
		el.style.transform = above ? 'translate(-50%, -100%)' : 'translate(-50%, 0)'
		// 加 class 前先读一次样式，连点同一个元素时淡入才能重播
		void el.offsetWidth
		el.classList.add('is-visible')

		clearTimeout(tipTimer)
		tipTimer = window.setTimeout(() => el.classList.remove('is-visible'), options.feedbackDuration)
	}

	/** 行内 code：反色 + 跟手气泡 */
	let inlineTimer = 0
	let markedInline = null
	const markInline = (code, ok) => {
		if (markedInline && markedInline !== code) markedInline.classList.remove(INLINE_MARK)
		code.classList.remove(INLINE_MARK)
		void code.offsetWidth
		code.classList.add(INLINE_MARK)
		markedInline = code
		clearTimeout(inlineTimer)
		inlineTimer = window.setTimeout(() => {
			code.classList.remove(INLINE_MARK)
			if (markedInline === code) markedInline = null
		}, options.feedbackDuration)
		showTip(code, ok)
	}

	/** 围栏代码块：容器描边 + 容器右上角 ::after 气泡 */
	let markedBlock = null
	let blockTimer = 0
	const markBlock = (block, ok) => {
		if (markedBlock && markedBlock !== block) {
			markedBlock.classList.remove(BLOCK_MARK, BLOCK_FAILED)
		}
		block.classList.remove(BLOCK_MARK, BLOCK_FAILED)
		void block.offsetWidth
		block.classList.add(ok ? BLOCK_MARK : BLOCK_FAILED)

		markedBlock = block
		clearTimeout(blockTimer)
		blockTimer = window.setTimeout(() => {
			block.classList.remove(BLOCK_MARK, BLOCK_FAILED)
			if (markedBlock === block) markedBlock = null
		}, options.feedbackDuration)
	}

	const handleClick = async event => {
		// 只处理主键单击；`detail > 1` 说明是双击/三击（用户在选词），放过
		if (event.button !== 0 || event.detail > 1) return
		if (hasSelection()) return

		const node = event.target
		if (!(node instanceof Element)) return
		// 链接、按钮、输入框这些交互元素一律不碰
		if (node.closest('a, button, input, textarea, select, summary, [contenteditable="true"]')) return

		// ---- 行内 code ----
		if (options.inlineCode) {
			const code = node.closest('code')
			// `pre` 里的 code 属于围栏代码块，交给下面那段处理
			if (code && !code.closest('pre') && code.textContent) {
				markInline(code, await writeClipboard(code.textContent))
				return
			}
		}

		// ---- 围栏代码块 ----
		if (!options.codeBlock) return
		const block = node.closest('div[class*="language-"]')
		if (!block) return
		const code = block.querySelector('pre code')
		if (!code || !code.innerText) return
		markBlock(block, await writeClipboard(code.innerText))
	}

	document.addEventListener('click', handleClick)

	return () => {
		document.removeEventListener('click', handleClick)
		hideTip()
		clearTimeout(inlineTimer)
		clearTimeout(blockTimer)
		if (markedInline) markedInline.classList.remove(INLINE_MARK)
		markedInline = null
		if (markedBlock) markedBlock.classList.remove(BLOCK_MARK, BLOCK_FAILED)
		markedBlock = null
		if (tipEl && tipEl.isConnected) tipEl.remove()
		tipEl = null
		// 只删自己插的那份样式，避免连累后来重复注册的同名样式
		if (style.isConnected) style.remove()
	}
}

/**
 * 创建插件（Vue 插件形态，配 `app.use(codeClickCopy(options))`）。
 * 服务端渲染阶段会直接跳过 —— `enhanceApp` 在 SSR 里也会执行，
 * 不判断 `window` 会在构建时炸掉。
 */
export function codeClickCopy(userOptions = {}) {
	const options = { ...DEFAULT_OPTIONS, ...userOptions }
	let dispose = null

	return {
		name: 'code-click-copy',
		install() {
			if (typeof window === 'undefined' || typeof document === 'undefined') return
			if (dispose) return
			dispose = mount(options)
		},
		/** 手动卸载；正常用不到，VitePress 的 app 与页面同生共死 */
		uninstall() {
			dispose?.()
			dispose = null
		},
	}
}

export default codeClickCopy
