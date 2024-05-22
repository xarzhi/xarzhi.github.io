# 控制 Controls

## 1.OrbitControls

详情：[OrbitControls – three.js docs (threejs.org)](https://threejs.org/docs/?q=cont#examples/zh/controls/OrbitControls)

### 1.1 作用

Orbitcontrols（**轨道控制器**）可以使得相机围绕目标进行轨道运动。

- 鼠标左键：操作物体旋转
- 鼠标右键：操作物体位移
- 鼠标中键：操作物体缩放

### 1.2 导入

```js
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
```

### 1.3 构造函数

```js
OrbitControls(camera, renderer.domElement);
```

- camera：相机对象
- renderer.domElement：渲染对象，canvas画布

### 1.3 使用

```js
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const camera = new THREE.PerspectiveCamera( 
    45,
    window.innerWidth / window.innerHeight,
    1, 
    10000 
);
camera.position.set( 0, 20, 100 );



const controls = new OrbitControls( camera, renderer.domElement );

// 若使用动画帧，按以下方式渲染
controls.update();
function animate() {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );

}

// 否则，需要监控控制器的change事件
controls.addEventListener("change", () => {
    controls.update();
    renderer.render(scene, camera);
});
```

