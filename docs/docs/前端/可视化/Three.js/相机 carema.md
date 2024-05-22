# 投影相机 Camera

### 5.1 正交投影相机

```js
const camera = new THREE.OrthographicCamera( 
    left : Number, 
    right : Number,
    top : Number,
    bottom : Number,
    near : Number,
    far : Number 
)
```

- left — 摄像机视锥体左侧面。
- right — 摄像机视锥体右侧面。
- top — 摄像机视锥体上侧面。
- bottom — 摄像机视锥体下侧面。
- near — 摄像机视锥体近端面。
- far — 摄像机视锥体远端面。

### 5.2 透视投影相机

这一投影模式被用来模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式。

```js
const camera = new THREE.PerspectiveCamera( 
    fov : Number, 
    aspect : Number, 
    near : Number, 
    far : Number
)
```

- fov — 摄像机视锥体垂直视野角度
- aspect — 摄像机视锥体长宽比
- near — 摄像机视锥体近端面
- far — 摄像机视锥体远端面

**示例**

```js
const camera = new THREE.PerspectiveCamera( 45, innerWidth / innerHeight, 1, 1000 );

scene.add( camera );
```



