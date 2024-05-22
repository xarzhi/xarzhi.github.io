import { defineConfig } from 'vitepress'
import navbar from './config/navbar'
import sidebar from './config/sidebar'
export default defineConfig({
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
	],
	title: 'Fade away',
	description: '花有重开日，人无在少年',
	themeConfig: {
		nav: navbar,
		sidebar: sidebar,
		outline: {
			level: [2, 3, 4], // 显示2-4级标题
			// level: 'deep', // 显示2-6级标题
			label: '当前页大纲', // 文字显示
		},
		logo: '/logo.png',
		// 本地搜索
		search: {
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
			text: 'Updated at',
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
		markdown: {
			image: {
				// 开启图片懒加载
				lazyLoading: true,
			},
		},
		socialLinks: [{ icon: 'github', link: 'https://github.com/xarzhi/xarzhi.github.io' }],
		footer: {
			message: 'MIT Licensed',
			copyright: 'Copyright © 2024-present xarzhi',
		}
	},
})
