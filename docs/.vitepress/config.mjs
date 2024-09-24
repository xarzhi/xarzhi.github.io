import { defineConfig } from 'vite'
import navbar from './config/navbar'
import sidebar from './config/sidebar'
import timeline from 'vitepress-markdown-timeline'
import { withPwa } from '@vite-pwa/vitepress'
export default withPwa(
	defineConfig({
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
		lastUpdated: true,
		themeConfig: {
			nav: navbar,
			sidebar: sidebar,
			outline: {
				//level: [2, 3, 4, 5], // 显示2-4级标题
				level: 'deep', // 显示2-4级标题
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
			markdown: {
				lineNumbers: true,
				image: {
					// 开启图片懒加载
					lazyLoading: true,
				},
				container: {
					tipLabel: '提示',
					warningLabel: '警告',
					dangerLabel: '危险',
					infoLabel: '信息',
					detailsLabel: '详细信息',
				},
				//时间线
				config: md => {
					md.use(timeline)
				},
			},
			socialLinks: [{ icon: 'github', link: 'https://github.com/xarzhi/xarzhi.github.io' }],
			footer: {
				message: 'MIT Licensed',
				copyright: 'Copyright © 2024-present xarzhi',
			},
			lightModeSwitchTitle: '切换至深色模式',
			darkModeSwitchTitle: '切换至浅色模式',
		},
		pwa: {
			outDir: '.vitepress/dist', // 输出目录
			registerType: 'autoUpdate', // 注册类型为自动更新
			includeManifestIcons: false, // 不包含清单图标
			manifest: {
				id: '/', // 清单 ID
				name: "xarzhi's blog", // 应用名称", // 应用名称
				short_name: 'xarzhi', // 应用的短名称
				description: '个人笔记', // 应用的描述
				theme_color: '#ffffff', // 主题颜色
				icons: [
					{
						src: '/images/pwa-120x120.png', // 图标路径
						sizes: '120x120', // 图标尺寸
						type: 'image/png', // 图标类型
					},
					{
						src: '/images/pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: '/images/pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any',
					},
				],
			},
			workbox: {
				globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}'], // 匹配需要缓存的文件类型
				maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 设置最大缓存文件大小为5 MiB
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i, // 匹配需要缓存的 Google 字体
						handler: 'CacheFirst', // 缓存优先策略
						options: {
							cacheName: 'google-fonts-cache', // 缓存名称
							expiration: {
								maxEntries: 10, // 最大缓存条目数
								maxAgeSeconds: 60 * 60 * 24 * 365, // 缓存有效期，365天
							},
							cacheableResponse: {
								statuses: [0, 200], // 缓存的响应状态码
							},
						},
					},
					{
						urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i, // 匹配需要缓存的 Google 字体
						handler: 'CacheFirst', // 缓存优先策略
						options: {
							cacheName: 'gstatic-fonts-cache', // 缓存名称
							expiration: {
								maxEntries: 10, // 最大缓存条目数
								maxAgeSeconds: 60 * 60 * 24 * 365, // 缓存有效期，365天
							},
							cacheableResponse: {
								statuses: [0, 200], // 缓存的响应状态码
							},
						},
					},
					{
						urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i, // 匹配需要缓存的 jsdelivr 图片
						handler: 'NetworkFirst', // 网络优先策略
						options: {
							cacheName: 'jsdelivr-images-cache', // 缓存名称
							expiration: {
								maxEntries: 10, // 最大缓存条目数
								maxAgeSeconds: 60 * 60 * 24 * 7, // 缓存有效期，7天
							},
							cacheableResponse: {
								statuses: [0, 200], // 缓存的响应状态码
							},
						},
					},
				],
			},
		},
	})
)
