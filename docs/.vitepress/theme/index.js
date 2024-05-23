import DefaultTheme from 'vitepress/theme'
import './style/index.css'
import Layout from './Layout.vue'
import mediumZoom from 'medium-zoom'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import { h } from 'vue'
import { useData } from 'vitepress'
import MNavLinks from './components/MNavLinks.vue'
import GoTop from './components/GoTop.vue'
import './utils/mouse-click-particles'
export default {
	extends: DefaultTheme,
	enhanceApp({ app }) {
		// 注册全局组件
		app.component('Layout', Layout)
		app.component('MNavLinks', MNavLinks)
		app.component('GoTop', GoTop)
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
		const initZoom = () => {
			// mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
			mediumZoom('.main img', { background: 'var(--vp-c-bg)' }) // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
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
