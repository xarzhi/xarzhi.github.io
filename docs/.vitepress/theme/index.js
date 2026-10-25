import DefaultTheme from 'vitepress/theme'
import './style/index.css'
import './style/home.scss'
import './style/nav.scss'
import './style/blur.css'
// import mouseClick from './utils/mouse-click-particles'
import mediumZoom from 'medium-zoom'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute, useData, useRouter } from 'vitepress'
import { h } from 'vue'
import { register } from './components/index'
import Layout from './Layout.vue'
// element-plus 改为按需自动引入（见 .vitepress/config.mjs 的 ElementPlusResolver）
// 仅保留暗色主题变量，组件样式由 unplugin-vue-components 按需注入
import 'element-plus/theme-chalk/dark/css-vars.css'
import useClickParticles from './hooks/useClickParticles.js'
import { codeClickCopy } from './plugins/code-click-copy'

export default {
	extends: DefaultTheme,
	enhanceApp({ app }) {
		// 注册全局组件
		register(app)
		app.component('Layout', Layout)
		// 单击行内代码即复制（围栏代码块保持原生行为，可用 { codeBlock: true } 一并开启）
		app.use(codeClickCopy())
	},
	Layout: () => {
		const props = {}
		const { frontmatter } = useData()
		/* 添加自定义 class */
		if (frontmatter.value?.layoutClass) {
			props.class = frontmatter.value.layoutClass
		}
		return h(Layout, props)
	},
	setup() {
		const route = useRoute()
		const router = useRouter()
		const clickParticles = useClickParticles()

		const initZoom = () => {
			mediumZoom('.main img,div:not(a) > img', {
				background: 'rgba(0, 0, 0, 0.6)',
			})
		}
		onMounted(() => {
			initZoom()
			clickParticles.createCanvas()
			if (window) window.$app = app
		})

		watch(
			() => route.path,
			() =>
				nextTick(() => {
					initZoom()
				})
		)
	},
}
