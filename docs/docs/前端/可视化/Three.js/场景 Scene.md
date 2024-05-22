# 场景Scene

场景能够让你在什么地方、摆放什么东西来交给three.js来渲染，这是你放置物体、灯光和摄像机的地方。

### 1.1 创建场景

```js
const scene = new THREE.Scene();
```

### 1.2 属性

#### 1.2.1 background

若不为空，在渲染场景的时候将设置背景，且背景总是首先被渲染的。 可以设置一个用于的“clear”的[Color](https://threejs.org/docs/index.html#api/zh/math/Color)（颜色）

```js
// 设置画布背景色
const scene = new THREE.Scene();
scene.background=new THREE.Color( 0xff0000 )
```

#### 1.2.2 fog

[Fog](https://threejs.org/docs/?q=sce#api/zh/scenes/Fog)可以给三维场景添加**雾化**效果，默认值为null。

```js
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xffffff,1,50)
```



#### 1.2.3 overrideMaterial

强制场景中的每个物体使用这里的材质来渲染。默认值为null。

```js
const scene = new THREE.Scene();
scene.overrideMaterial=new THREE.MeshLamberMaterial({color:0xff0000})
```



#### 1.2.4 children

返回场景中所有对象的列表

```js
console.log(scene.children)
```



### 1.3 方法

#### 1.3.1 add()

向场景中添加对象

```js
const planeGeometry = new THREE.PlaneGeometry(20, 30);
const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0x999999,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

scene.add(plane);
```



#### 1.3.2 remove()

从场景中移除一个对象

```js
scene.remove(plane);
```



#### 1.3.3 getObjectByName()

创建对象时可以复制一个唯一`name`属性，通过此方法，传入`name`可获取该对象

```js
const sphereGeometry = new THREE.SphereGeometry(1, 10, 10);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: false,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

sphere.name='sphere'
scene.add(sphere);

console.log(scene.getObjectByName('sphere'))
```















