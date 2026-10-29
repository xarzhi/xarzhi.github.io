<template>
	<section class="projects">
		<div class="head">
			<h2 class="title">我的软件</h2>
			<p class="sub">以下是我写过的一些桌面应用与小工具，点击卡片即可前往源码仓库或文档站。</p>
		</div>

		<div class="grid">
			<div v-for="p in projects" :key="p.name" class="card">
				<div class="row">
					<span class="logo">
						<img :src="p.logo" alt="" />
					</span>
					<a class="name" :href="p.link" target="_blank" rel="noopener noreferrer">{{ p.name }}</a>
					<span class="arrow">↗</span>
				</div>

				<p class="app_desc">{{ p.desc }}</p>
				<div class="pics">
					<Carousel :images="p.pics" :alt="p.name" />
				</div>

				<div class="foot">
					<span v-for="t in p.tags" :key="t" class="tag">{{ t }}</span>
					<span class="go">{{ p.action }}</span>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import Carousel from './Carousel.vue'

const projects = [
	{
		name: 'Meow Player',
		desc: '使用 Rust + GPUI 开发的本地音乐播放器，界面流畅、启动轻快，专注纯粹的本地听歌体验。',
		tags: ['Rust', 'GPUI', '音乐播放器'],
		link: 'https://xarzhi.github.io/meow-player-docs/',
		logo: 'https://gitee.com/xarzhi/picture/raw/master/img/image-20261022122603595.png',
		pics: [
			'https://gitee.com/xarzhi/picture/raw/master/img/PixPin_2026-10-22_12-21-58.png',
			'https://gitee.com/xarzhi/picture/raw/master/img/PixPin_2026-10-22_12-21-44.png',
			'https://gitee.com/xarzhi/picture/raw/master/img/PixPin_2026-10-22_12-21-32.png',
		],
		action: '查看文档',
	},
	{
		name: 'Meow Desk',
		desc: '基于C++和Core-ui的一款windows桌面图标管理工具，后续会添加各种小组件',
		tags: ['C++', '图标管理', '收纳'],
		link: 'https://github.com/xarzhi/iNotes',
		action: '查看源码',
		logo: 'https://gitee.com/xarzhi/picture/raw/master/img/iClick-gpui.png',
		pics: [
			'https://gitee.com/xarzhi/picture/raw/master/img/PixPin_2026-10-22_12-43-16.png',
			'https://gitee.com/xarzhi/picture/raw/master/img/image-20261025141742909.png',
			'https://gitee.com/xarzhi/picture/raw/master/img/image-20261029203343201.png',
		],
	},
	{
		name: 'iClick',
		desc: '用 GPUI 写的键鼠连点器，支持模糊点击、操作间隔与循环间隔、随机延迟等。',
		tags: ['Rust', 'GPUI', '效率工具'],
		link: 'https://github.com/xarzhi/iClick-gpui',
		action: '查看源码',
		logo: 'https://gitee.com/xarzhi/picture/raw/master/img/iClick-gpui.png',
		pics: ['https://gitee.com/xarzhi/picture/raw/master/img/PixPin_2026-10-22_12-20-43.png'],
	},
	{
		name: 'xToolkit',
		desc: '一站式工具箱，集合图片 / 视频 / 音频 / 开发 / 设计工具：格式转换、智能抠图、压缩、GIF、Base64、图标提取、Markdown ↔ HTML、GLTF 预览、白板等。',
		tags: ['Tauri 2', 'Vue 3', 'ant-design-vue', 'three.js'],
		link: 'https://github.com/xarzhi/xtoolkit',
		logo: 'https://gitee.com/xarzhi/picture/raw/master/img/xtools.png',
		action: '查看源码',
		pics: ['https://gitee.com/xarzhi/picture/raw/master/img/PixPin_2026-10-22_12-20-54.png'],
	},
	{
		name: 'Show Your Key',
		desc: '一个键位显示工具，把当前按下的按键实时显示在屏幕上，录屏或演示操作时很直观。',
		tags: ['Rust', '桌面工具'],
		link: 'https://github.com/xarzhi/show-your-key',
		logo: 'https://gitee.com/xarzhi/picture/raw/master/img/logo - 副本.png',
		action: '查看源码',
		pics: [
			'https://gitee.com/xarzhi/picture/raw/master/img/PixPin_2026-10-22_12-38-26.png',
			'https://gitee.com/xarzhi/picture/raw/master/img/PixPin_2026-10-22_12-38-41.png',
			'https://gitee.com/xarzhi/picture/raw/master/img/PixPin_2026-10-22_12-38-49.png',
			'https://gitee.com/xarzhi/picture/raw/master/img/PixPin_2026-10-22_12-39-26.png',
		],
	},
	{
		name: 'xLighter',
		desc: 'Windows 屏幕亮度调节助手：亮度滑块 + 标准 / 防蓝光 / 护眼 / 游戏四种模式，托盘常驻、开机自启、单实例。',
		tags: ['C++17', 'Core UI', 'Fluent 2', 'Windows'],
		logo: 'https://gitee.com/xarzhi/picture/raw/master/img/xLighter.png',
		link: 'https://github.com/xarzhi/xlighter',
		action: '查看源码',
		pics: ['https://gitee.com/xarzhi/picture/raw/master/img/PixPin_2026-10-22_12-23-25.png'],
	},
	{
		name: 'iNote',
		desc: '基于 Tauri 开发的便签桌面端程序，支持窗口置顶，随手记事很方便。',
		tags: ['Tauri', '便签', '桌面应用'],
		link: 'https://github.com/xarzhi/iNotes',
		logo: 'https://gitee.com/xarzhi/picture/raw/master/img/inotes.png',
		action: '查看源码',
		pics: [
			'https://gitee.com/xarzhi/picture/raw/master/img/PixPin_2026-10-22_12-23-17.png',
			'https://gitee.com/xarzhi/picture/raw/master/img/PixPin_2026-10-22_12-22-34.png',
		],
	},

	// {
	// 	name: 'xHot',
	// 	desc: '精简、快速的 Windows 截图工具：截图 / 标注 / 长截图 / 钉图 / OCR 取字，F1 一键触发。',
	// 	tags: ['Rust', 'GPUI', '截图工具', 'Windows'],
	// 	color: '#22d3ee',
	// 	link: 'https://github.com/xarzhi/xhot',
	// 	action: '查看源码',
	// 	pics: [
	// 		'https://gitee.com/xarzhi/picture/raw/master/img/PixPin_2026-10-22_12-21-58.png',
	// 		'https://gitee.com/xarzhi/picture/raw/master/img/PixPin_2026-10-22_12-21-44.png',
	// 		'https://gitee.com/xarzhi/picture/raw/master/img/PixPin_2026-10-22_12-21-32.png',
	// 	],
	// },
]
</script>

<style lang="scss" scoped>
.projects {
	width: 100%;
	max-width: 1440px;
	margin: 0 auto;
	padding: 40px 24px 80px;
	box-sizing: border-box;

	.head {
		text-align: center;
		margin-bottom: 36px;

		.title {
			margin: 0 0 12px;
			font-size: 32px;
			font-weight: 700;
			line-height: 40px;
			color: var(--vp-c-text-1);
		}

		.sub {
			margin: 0;
			font-size: 15px;
			line-height: 24px;
			color: var(--vp-c-text-2);
		}
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
	}

	.card {
		display: flex;
		flex-direction: column;
		padding: 20px;
		border: 1px solid var(--vp-c-divider);
		border-radius: 12px;
		background: var(--vp-c-bg-soft);
		text-decoration: none;
		transition:
			border-color 0.25s,
			transform 0.25s,
			box-shadow 0.25s,
			background-color 0.25s;

		&:hover {
			border-color: var(--vp-c-brand-1);
			transform: translateY(-4px);
			box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
		}

		.row {
			display: flex;
			align-items: center;
			gap: 10px;

			.logo {
				width: 40px;
				height: 40px;
				border-radius: 4px;
				border-radius: 50%;
				flex: none;
			}

			.name {
				font-size: 17px;
				font-weight: 600;
				color: var(--vp-c-text-1);
				flex: 1;
			}

			.arrow {
				color: var(--vp-c-text-3);
				font-size: 15px;
				transition:
					color 0.25s,
					transform 0.25s;
			}
		}

		&:hover .arrow {
			color: var(--vp-c-brand-1);
			transform: translate(2px, -2px);
		}

		.app_desc {
			margin: 12px 0 16px;
			font-size: 14px;
			line-height: 22px;
			color: var(--vp-c-text-2);
			height: 50px;
		}
		.pics {
			height: 180px;
			margin-bottom: 10px;
			overflow: hidden;
			border-radius: 8px;
		}

		.foot {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			gap: 6px;

			.tag {
				font-size: 12px;
				line-height: 20px;
				padding: 0 8px;
				border-radius: 6px;
				color: var(--vp-c-text-2);
				background: var(--vp-c-default-soft);
			}

			.go {
				margin-left: auto;
				font-size: 13px;
				font-weight: 500;
				color: var(--vp-c-brand-1);
			}
		}
	}

	.more {
		margin-top: 28px;
		text-align: center;

		a {
			font-size: 14px;
			font-weight: 500;
			color: var(--vp-c-brand-1);
			text-decoration: none;

			&:hover {
				text-decoration: underline;
			}
		}
	}
}
</style>
