import { defineConfig } from 'vite'
import navbar from './config/navbar'
import sidebar from './config/sidebar'
import timeline from 'vitepress-markdown-timeline'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 仅在 dev 下关闭本地搜索（见下方 search 配置说明）；build / preview 等保持搜索功能
const isDev = process.argv.includes('dev')
const config = defineConfig({
	base: '/',
	head: [
		[
			'meta',
			{
				name: 'referrer',
				content: 'no-referrer',
			},
		],
		['link', { rel: 'icon', href: '/logo.png' }],
		['meta', { name: 'algolia-site-verification', content: '2468E82FC5CF0E3F' }],
	],
	title: 'Fade away',
	description: '花有重开日，人无在少年',
	lastUpdated: false, // 关闭按页 spawn git 计算更新时间：956 页会执行上千次 git log（实测约 5 分钟），是启动/热更新慢的主因
	markdown: {
		math: true,
		lineNumbers: true, // 显示行号
		image: {
			// lazyLoading: true,  // 图片懒加载
		},

		//时间线
		config: md => {
			md.use(timeline)
		},
	},

	themeConfig: {
		nav: navbar,
		sidebar: sidebar,
		outline: {
			//level: [2, 3, 4, 5], // 显示2-4级标题
			level: 'deep', // 显示2-4级标题
			label: '当前页大纲', // 文字显示
		},
		logo: '/logo.png',
		// 本地搜索索引：本地 provider 会在“启动时”把全部页面渲染一遍来建索引。
		// 本站在 956 个页面、含大量代码块（Shiki 高亮占启动耗时 ~55%），实测使 dev 启动 ~45s。
		// 因此仅在构建产物里启用搜索，开发时关闭，dev 启动可降到数秒。
		// 若希望 dev 也有搜索，可改用 pagefind / Algolia（见 README 说明）。
		search: isDev
			? false
			: {
					provider: 'local',
					options: {
						translations: {
							button: {
								buttonText: '搜索文档',
								buttonAriaLabel: '搜索文档',
							},
							modal: {
								noResultsText: '无法找到相关结果',
								resetButtonTitle: '清除查询条件',
								footer: {
									selectText: '选择',
									navigateText: '切换',
								},
							},
						},
					},
			  },
		//上次更新时间
		lastUpdated: {
			text: '上次更新时间',
			formatOptions: {
				dateStyle: 'full',
				timeStyle: 'medium',
			},
		},
		//自定义上下页名
		docFooter: {
			prev: '上一页',
			next: '下一页',
		},
		//markdown配置

		socialLinks: [{ icon: 'github', link: 'https://github.com/xarzhi/xarzhi.github.io' }],
		footer: {
			message: 'MIT Licensed',
			copyright: 'Copyright © 2024-present xarzhi',
		},
		lightModeSwitchTitle: '切换至深色模式',
		darkModeSwitchTitle: '切换至浅色模式',
	},
	vite: {
		plugins: [
			// element-plus 按需自动引入，替代原来的整库全量引入
			AutoImport({ resolvers: [ElementPlusResolver()], dts: false }),
			Components({ resolvers: [ElementPlusResolver()], dts: false }),
		],
		// 按需引入的组件样式由 element-plus 包内部的 `.../components/*/style/css` 模块注入，
		// 里面是 `import 'element-plus/theme-chalk/base.css'` 这类裸 CSS 导入。
		// SSR 构建默认把 element-plus 当外部依赖（不打包），Node 直接去 import 这个 .css
		// 就会抛 `Unknown file extension ".css"`（GitHub Actions/Ubuntu 上必现）。
		// 让 Vite 把 element-plus 一起打包进 SSR bundle 即可——SSR 下 CSS 导入会被置空。
		ssr: {
			noExternal: ['element-plus'],
		},
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler',
					silenceDeprecations: ['legacy-js-api'],
					logger: { warn: (msg, opts) => console.warn(msg, opts?.span) },
				},
				sass: {
					api: 'modern-compiler',
					silenceDeprecations: ['legacy-js-api'],
				},
			},
		},
	},
})

export default config
