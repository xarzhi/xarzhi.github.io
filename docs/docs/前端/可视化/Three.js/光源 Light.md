# 光源 Light

## 1.光源基类 Light

光源的基类 - 所有其他的光类型都继承了该类描述的属性和方法。

### 1.1 构造函数

```js
Light( color : Color, intensity : Float )
```

- [color](https://threejs.org/docs/index.html#api/zh/math/Color) -（可选）一个表示颜色的 Color 的实例、字符串或数字，默认为一个白色（0xffffff）的 [Color](https://threejs.org/docs/index.html#api/zh/math/Color) 对象。
- intensity -（可选）光照强度。默认值为 1。

### 1.2 属性

公共属性请查看基类 [Object3D](https://threejs.org/docs/index.html#api/zh/core/Object3D)。

#### color

`THREE.Color`，光源的颜色。如果构造的时候没有传递，默认会创建一个新的 [Color](https://threejs.org/docs/index.html#api/zh/math/Color) 对象并设置为白色。

#### intensity

`Float`，光照的强度，或者说能量。
强度的单位取决于光的类型。
默认值为 `1.0`。

#### isLight

只读，用于检查对象的类型是否为 Light。

### 1.3 方法

公共方法请查看基类 [Object3D](https://threejs.org/docs/index.html#api/zh/core/Object3D)。

#### dispose()

**作用**：释放由该实例分配的 GPU 相关资源。 当这个实例不再在你的应用中使用时，调用这个方法。

**语法**：

```js
light.dispose():undefined
```



#### copy()

**作用**：从 [source](https://threejs.org/docs/index.html#api/zh/lights/Light) 复制 [color](https://threejs.org/docs/index.html#api/zh/lights/Light.color)、[intensity](https://threejs.org/docs/index.html#api/zh/lights/Light.intensity) 的值到当前光源对象中。

**语法**：

```js
light.copy( source : Light ):this
```

- source：被复制的点光源对象



#### toJSON()

**作用**：以JSON格式返回光数据。

**语法**：

```js
light.toJSON(meta : Object):Object
```

meta -- 包含有元数据的对象，例如该对象的材质、纹理或图片。 将该light对象转换为 three.js [JSON Object/Scene format](https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4)（three.js JSON 物体/场景格式）。





## 2.点光源 PointLight

从一个点向各个方向发射的光源。如一个灯泡发出的光。

该光源可以投射阴影 - 跳转至 [PointLightShadow](https://threejs.org/docs/index.html#api/zh/lights/shadows/PointLightShadow) 查看更多细节。

### 2.1 构造函数

```js
PointLight( 
    color : THREE.Color, 
    intensity : Float,
    distance : Number,
    decay : Float
)
```

- color-（可选）一个表示颜色的 Color 的实例、字符串或数字，默认为一个白色（0xffffff）的 [Color](https://threejs.org/docs/index.html#api/zh/math/Color) 对象。
- distance - 光源照射的最大距离。默认值为 0（无限远）。
- intensity -（可选）光照强度。默认值为 1。
- decay - 沿着光照距离的衰退量。默认值为 2。

### 2.2 代码示例

```js
const light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 50, 50, 50 );
scene.add( light );
```



### 2.2 属性

#### castShadow

此属性设置为 `true` 灯光将投射阴影。

**注意**：这样做的代价比较高，需要通过调整让阴影看起来正确。 查看 [PointLightShadow](https://threejs.org/docs/index.html#api/zh/lights/shadows/PointLightShadow) 了解详细信息。 默认值为 `false`。



#### decay

光线随着距离增加变暗的衰减量。默认值为 `2`。
在物理正确渲染的上下文中，不应更改默认值。



#### distance

当值为零时，光线将根据平方反比定律衰减到无限远。 当值不为零时，光线会先按照平方反比定律衰减，直到距离截止点附近，然后线性衰减到 0。

默认值为 `0.0`。



#### intensity

光源的强度。默认值为 `1`。
单位是坎德拉（cd）。

改变该值会影响到 `power` 的值。



#### power

光源的功率。
单位为流明（lm）。

改变该值会影响到 `intensity` 的值。



#### shadow

[PointLightShadow](https://threejs.org/docs/index.html#api/zh/lights/shadows/PointLightShadow) 对象，用与计算此光照的阴影。

此对象的摄像机为：一个 [fov](https://threejs.org/docs/index.html#api/zh/cameras/PerspectiveCamera.fov) 值为90度、[aspect](https://threejs.org/docs/index.html#api/zh/cameras/PerspectiveCamera.aspect) 值为 1、 [near](https://threejs.org/docs/index.html#api/zh/cameras/PerspectiveCamera.near) 值为 0、[far](https://threejs.org/docs/index.html#api/zh/cameras/PerspectiveCamera.far) 值为 500 的透视摄像机（[PerspectiveCamera](https://threejs.org/docs/index.html#api/zh/cameras/PerspectiveCamera)）。







### 2.3 方法

#### dispose()

**作用**：释放由该实例分配的 GPU 相关资源。 当这个实例不再在你的应用中使用时，调用这个方法。

**语法**：

```js
pointLight.dispose() : undefined
```



#### copy()

将所有属性的值从源 [source](https://threejs.org/docs/index.html#api/zh/lights/PointLight) 复制到此点光源对象。

**语法**：

```js
pointLight.copy() : undefined
```





## 3.环境光 AmbientLight

环境光会均匀的照亮场景中的所有物体。

环境光不能用来投射阴影，因为它没有方向。

### 3.1 构造函数

```js
AmbientLight( color : Color, intensity : Float )
```

- color -（可选）一个表示颜色的 Color 的实例、字符串或数字，默认为一个白色（0xffffff）的 [Color](https://threejs.org/docs/index.html#api/zh/math/Color) 对象。
- intensity -（可选）光照的强度。默认值为 1。

### 3.2 代码示例

```js
const light = new THREE.AmbientLight( 0x404040 ); // 柔和的白光
scene.add( light );
```



### 3.3 属性

公共属性请查看基类 [Light](https://threejs.org/docs/index.html#api/zh/lights/Light)。

#### isAmbientLight

 `Boolean`，只读，用于检查对象的类型是否为 AmbientLight。



### 3.4 方法

公共方法请查看基类[Light](https://threejs.org/docs/index.html#api/zh/lights/Light)。





## 4.平行光 DirectionalLight

### 4.1 构造函数

### 4.2 代码示例

### 4.3 属性

### 4.4 方法



## 5.聚光灯 SpotLight

### 5.1 构造函数

### 5.2 代码示例

### 5.3 属性

### 5.4 方法





## 6.平面光 RectAreaLight

### 6.1 构造函数

### 6.2 代码示例

### 6.3 属性

### 6.4 方法





## 7.半球光 HemisphereLight

### 7.1 构造函数

### 7.2 代码示例

### 7.3 属性

### 7.4 方法







