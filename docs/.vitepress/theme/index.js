import DefaultTheme from 'vitepress/theme'
import './style/index.css'
import './style/home.scss'
import './style/nav.scss'
import './style/blur.css'
import mouseClick from './utils/mouse-click-particles'
import mediumZoom from 'medium-zoom'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import { h } from 'vue'
import { useData } from 'vitepress'
import { register } from './components/index'
import Layout from './Layout.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
export default {
	extends: DefaultTheme,
	enhanceApp({ app }) {
		// 注册全局组件
		register(app)
		app.component( 'Layout', Layout )
		app.use(ElementPlus)
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
		mouseClick(document)
		const route = useRoute()
		const initZoom = () => {
			mediumZoom('.main img,div:not(a) > img', { background: 'rgba(0, 0, 0, 0.6)' })
		}
		onMounted(() => {
			initZoom()
		})
		window.$app = app
		watch(
			() => route.path,
			() => nextTick(() => initZoom())
		)
	},
}
