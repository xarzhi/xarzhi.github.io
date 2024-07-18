import { join } from 'path'
import { readdirSync } from 'fs'

function isMarkdownFile(fileName) {
	return !!fileName.match(/.+\.md$/)
}
function getItems(url) {
	const path = join(__dirname, `../../${url}`)
	return readdirSync(path)
		.filter(item => isMarkdownFile(item))
		.map(fileName => {
			if (isMarkdownFile(fileName)) {
				const text = fileName.match(/^[0-9]{2}(-|.)+/) ? fileName.substring(3) : fileName
				const fileData = {
					text: text.replace('.md', ''),
					link: `${url}/${fileName}`,
				}
				return fileData
			}
		})
}
const sidebar = {
	'/docs/前端/前端三剑客/Html/': getItems('docs/前端/前端三剑客/Html'),
	'/docs/前端/前端三剑客/CSS': [
		{ text: 'CSS', items: getItems('/docs/前端/前端三剑客/CSS/CSS') },
		{ text: 'CSS3', items: getItems('/docs/前端/前端三剑客/CSS/CSS3') },
	],
	'/docs/前端/前端三剑客/javascript/': [
		{ text: 'js基础', items: getItems('/docs/前端/前端三剑客/javascript/js基础') },
		{ text: 'js高级', items: getItems('/docs/前端/前端三剑客/javascript/js高级') },
	],
	'/docs/前端/框架/Vue/': [
		{ text: 'Vue2', items: getItems('/docs/前端/框架/Vue/Vue2') },
		{ text: 'Vue3', items: getItems('/docs/前端/框架/Vue/Vue3') },
	],
	'/docs/前端/框架/React/': getItems('/docs/前端/框架/React'),
	'/docs/前端/可视化/Canvas/': getItems('/docs/前端/可视化/Canvas'),
	'/docs/前端/可视化/WebGL/': getItems('/docs/前端/可视化/WebGL'),
	'/docs/前端/可视化/Three.js/': getItems('/docs/前端/可视化/Three.js'),
	'/docs/后端/C++': [
		{ text: 'C++基础', items: getItems('/docs/后端/C++/C++基础') },
		{ text: '面向对象', items: getItems('/docs/后端/C++/面向对象') },
	],
	'/docs/前端/小程序/': getItems('/docs/前端/小程序'),
	'/docs/后端/Node.js/': getItems('/docs/后端/Node.js/'),
	'/docs/前端/一些问题/': getItems('/docs/前端/一些问题/'),
}

for (let key in sidebar) {
	if (Array.isArray(sidebar[key])) {
		sidebar[key] = sidebar[key].map(item => {
			return {
				...item,
				collapsed: false,
			}
		})
	}
}
export default sidebar
