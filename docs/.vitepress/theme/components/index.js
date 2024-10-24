import MNavLinks from './MNavLinks.vue'
import GoTop from './GoTop.vue'
import Home from './Home.vue'
import Modal from './TestComponents/Modal.vue'
import MyIframe from './MyIframe.vue'
import MyKeepAlive from './TestComponents/MyKeepAlive.vue'
import MyTransition from './TestComponents/MyTransition.vue'
function register(app) {
	app.component('Modal', Modal)
	app.component('MNavLinks', MNavLinks)
	app.component('GoTop', GoTop)
	app.component('Home', Home)
	app.component('MyIframe', MyIframe)
	app.component('MyKeepAlive', MyKeepAlive)
	app.component('MyTransition', MyTransition)
}
export { register }
