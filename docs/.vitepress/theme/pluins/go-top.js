// module.exports = (options, app) => ({
// 	name: 'back-to-top-plugin',
// 	async enhanceApp({ app }) {
// 		// 将组件导入到当前作用域
// 		const BackToTop = (await import('../components/')).default
// 		// 注册组件到全局
// 		app.component('BackToTop', BackToTop)
// 	},
// 	markdown: {
// 		setup(marked) {
// 			marked.use({
// 				plugin: marked => {
// 					marked.renderer.rules.text = (tokens, idx) => {
// 						const token = tokens[idx]
// 						if (token.content === '[^go-top]') {
// 							return `<GoTop v-if="showGoTop" @click="showGoTop = false" />`
// 						}
// 						return token.content
// 					}
// 				},
// 			})
// 		},
// 	},
// })
