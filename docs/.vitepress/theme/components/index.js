import MNavLinks from './MNavLinks.vue'
import GoTop from './GoTop.vue'
import Home from './Home.vue'
import Modal from './TestComponents/Modal.vue'
import MyIframe from './MyIframe.vue'
import MyKeepAlive from './TestComponents/MyKeepAlive.vue'
import MyTransition from './TestComponents/MyTransition.vue'
import CanvasCompositeOperation from './TestComponents/CanvasCompositeOperation.vue'
import CanvasDrawImage from "./TestComponents/CanvasDrawImage.vue";
import Throttledebounce from "./TestComponents/Throttledebounce.vue";
import CanvasTransform from "./TestComponents/CanvasTransform.vue";
import CanvasPointIn from "./TestComponents/CanvasPointIn.vue";
import CanvasWatermark from "./TestComponents/CanvasWatermark.vue";
import GsapPlugins from "./GsapPlugins.vue";
import Img from "./Img.vue";
function register(app) {
	app.component('Modal', Modal)
	app.component('MNavLinks', MNavLinks)
	app.component('GoTop', GoTop)
	app.component('Home', Home)
	app.component('MyIframe', MyIframe)
	app.component('MyKeepAlive', MyKeepAlive)
	app.component('MyTransition', MyTransition)
	app.component('CanvasCompositeOperation', CanvasCompositeOperation)
	app.component("CanvasDrawImage", CanvasDrawImage);
	app.component("Throttledebounce", Throttledebounce);
	app.component("CanvasTransform", CanvasTransform);
	app.component("CanvasPointIn", CanvasPointIn);
	app.component("CanvasWatermark", CanvasWatermark);
	app.component("Img", Img);
	app.component("GsapPlugins", GsapPlugins);
}
export { register }
