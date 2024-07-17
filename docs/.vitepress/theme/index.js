import DefaultTheme from 'vitepress/theme'
import './style/index.css'
import './style/home.scss'
import './style/nav.scss'
import Layout from './Layout.vue'
import mediumZoom from 'medium-zoom'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import { h } from 'vue'
import { useData } from 'vitepress'
import MNavLinks from './components/MNavLinks.vue'
import GoTop from './components/GoTop.vue'
import Home from './components/Home.vue'
import mouseClick from './utils/mouse-click-particles'
export default {
	extends: DefaultTheme,
	enhanceApp({ app }) {
		// 注册全局组件
		app.component('Layout', Layout)
		app.component('MNavLinks', MNavLinks)
		app.component('GoTop', GoTop)
		app.component('Home', Home)
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
		watch(
			() => route.path,
			() => nextTick(() => initZoom())
		)
	},
}
