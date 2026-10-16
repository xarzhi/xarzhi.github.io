<template>
	<section class="projects">
		<div class="head">
			<h2 class="title">我的软件</h2>
			<p class="sub">以下是我写过的一些桌面应用与小工具，点击卡片即可前往源码仓库或文档站。</p>
		</div>

		<div class="grid">
			<a
				v-for="p in projects"
				:key="p.name"
				class="card"
				:href="p.link"
				target="_blank"
				rel="noopener noreferrer"
			>
				<div class="row">
					<span class="dot" :style="{ background: p.color }"></span>
					<span class="name">{{ p.name }}</span>
					<span class="arrow">↗</span>
				</div>

				<p class="desc">{{ p.desc }}</p>

				<div class="foot">
					<span v-for="t in p.tags" :key="t" class="tag">{{ t }}</span>
					<span class="go">{{ p.action }}</span>
				</div>
			</a>
		</div>

		<div class="more">
			<a href="https://github.com/xarzhi?tab=repositories" target="_blank" rel="noopener noreferrer">
				查看全部仓库 →
			</a>
		</div>
	</section>
</template>

<script setup>
const projects = [
	{
		name: 'Meow Player',
		desc: '使用 Rust + GPUI 开发的本地音乐播放器，界面流畅、启动轻快，专注纯粹的本地听歌体验。',
		tags: ['Rust', 'GPUI', '音乐播放器'],
		color: '#a78bfa',
		link: 'https://xarzhi.github.io/meow-player-docs/',
		action: '查看文档',
	},
	{
		name: 'iClick',
		desc: '用 GPUI 写的键鼠连点器，支持模糊点击、操作间隔与循环间隔、随机延迟等。',
		tags: ['Rust', 'GPUI', '效率工具'],
		color: '#fb923c',
		link: 'https://github.com/xarzhi/iClick-gpui',
		action: '查看源码',
	},
	{
		name: 'xToolkit',
		desc: '一站式工具箱，集合图片 / 视频 / 音频 / 开发 / 设计工具：格式转换、智能抠图、压缩、GIF、Base64、图标提取、Markdown ↔ HTML、GLTF 预览、白板等。',
		tags: ['Tauri 2', 'Vue 3', 'ant-design-vue', 'three.js'],
		color: '#34d399',
		link: 'https://github.com/xarzhi/xtoolkit',
		action: '查看源码',
	},
	{
		name: 'Show Your Key',
		desc: '一个键位显示工具，把当前按下的按键实时显示在屏幕上，录屏或演示操作时很直观。',
		tags: ['Rust', '桌面工具'],
		color: '#60a5fa',
		link: 'https://github.com/xarzhi/show-your-key',
		action: '查看源码',
	},
	{
		name: 'xLighter',
		desc: 'Windows 屏幕亮度调节助手：亮度滑块 + 标准 / 防蓝光 / 护眼 / 游戏四种模式，托盘常驻、开机自启、单实例。',
		tags: ['C++17', 'Core UI', 'Fluent 2', 'Windows'],
		color: '#fbbf24',
		link: 'https://github.com/xarzhi/xlighter',
		action: '查看源码',
	},
	{
		name: 'iNote',
		desc: '基于 Tauri 开发的便签桌面端程序，支持窗口置顶，随手记事很方便。',
		tags: ['Tauri', '便签', '桌面应用'],
		color: '#f472b6',
		link: 'https://github.com/xarzhi/iNotes',
		action: '查看源码',
	},
	{
		name: 'xHot',
		desc: '精简、快速的 Windows 截图工具：截图 / 标注 / 长截图 / 钉图 / OCR 取字，F1 一键触发。',
		tags: ['Rust', 'GPUI', '截图工具', 'Windows'],
		color: '#22d3ee',
		link: 'https://github.com/xarzhi/xhot',
		action: '查看源码',
	},
]
</script>

<style lang="scss" scoped>
.projects {
	width: 100%;
	max-width: 1152px;
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
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
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
		transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s, background-color 0.25s;

		&:hover {
			border-color: var(--vp-c-brand-1);
			transform: translateY(-4px);
			box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
		}

		.row {
			display: flex;
			align-items: center;
			gap: 10px;

			.dot {
				width: 10px;
				height: 10px;
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
				transition: color 0.25s, transform 0.25s;
			}
		}

		&:hover .arrow {
			color: var(--vp-c-brand-1);
			transform: translate(2px, -2px);
		}

		.desc {
			margin: 12px 0 16px;
			font-size: 14px;
			line-height: 22px;
			color: var(--vp-c-text-2);
			flex: 1;
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
