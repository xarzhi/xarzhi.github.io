# 几何体 Geometry

## 1.创建并添加几何体

```js
// 创建几何体对象
const sphereGeometry = new THREE.SphereGeometry(1, 10, 10)
// 创建几何体材质
const sphereMaterial = new THREE.MeshBasicMaterial({
	color: 0x00ff00,
	wireframe: false,
})
// 生成几何体
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
// 添加到场景中
scene.add(sphere)
```

## 2.几何体种类

### CircleGeometry

**圆形缓冲几何体**，它由围绕着一个中心点的三角分段的数量所构造，由给定的半径来延展。 同时它也可以用于创建规则多边形，其分段数量取决于该规则多边形的边数。

```js
const geometry = new THREE.CircleGeometry(
    radius : Float,
    segments : Integer,
    thetaStart : Float,
    thetaLength : Float
)
```

-   radius — 圆形的半径，默认值为 1
-   segments — 分段（三角面）的数量，最小值为 3，默认值为 32。
-   thetaStart — 第一个分段的起始角度，默认为 0。（three o'clock position）
-   thetaLength — 圆形扇区的中心角，通常被称为“θ”（西塔）。默认值是 2\*Pi，这使其成为一个完整的圆。

<MyIframe src="https://xarzhi.github.io/geometry/index.html#CircleGeometry"></MyIframe>

### ConeGeometry

一个用于生成**圆锥几何体**的类。

```js
const geometry = new THREE.ConeGeometry(
    radius : Float,
    height : Float,
    radialSegments : Integer,
    heightSegments : Integer,
    openEnded : Boolean,
    thetaStart : Float,
    thetaLength : Float
)
```

-   radius — 圆锥底部的半径，默认值为 1。
-   height — 圆锥的高度，默认值为 1。
-   radialSegments — 圆锥侧面周围的分段数，默认为 32。
-   heightSegments — 圆锥侧面沿着其高度的分段数，默认值为 1。
-   openEnded — 一个 Boolean 值，指明该圆锥的底面是开放的还是封顶的。默认值为 false，即其底面默认是封顶的。
-   thetaStart — 第一个分段的起始角度，默认为 0。（three o'clock position）
-   thetaLength — 圆锥底面圆扇区的中心角，通常被称为“θ”（西塔）。默认值是 2\*Pi，这使其成为一个完整的圆锥。

<MyIframe src="https://xarzhi.github.io/geometry/index.html#ConeGeometry"></MyIframe>

### CylinderGeometry

一个用于生成**圆柱几何体**的类。

```js
const geometry = new THREE.CylinderGeometry(
    radiusTop : Float,
    radiusBottom : Float,
    height : Float,
    radialSegments : Integer,
    heightSegments : Integer,
    openEnded : Boolean,
    thetaStart : Float,
    thetaLength : Float
)
```

-   radiusTop — 圆柱的顶部半径，默认值是 1。
-   radiusBottom — 圆柱的底部半径，默认值是 1。
-   height — 圆柱的高度，默认值是 1。
-   radialSegments — 圆柱侧面周围的分段数，默认为 32。
-   heightSegments — 圆柱侧面沿着其高度的分段数，默认值为 1。
-   openEnded — 一个 Boolean 值，指明该圆锥的底面是开放的还是封顶的。默认值为 false，即其底面默认是封顶的。
-   thetaStart — 第一个分段的起始角度，默认为 0。（three o'clock position）
-   thetaLength — 圆柱底面圆扇区的中心角，通常被称为“θ”（西塔）。默认值是 2\*Pi，这使其成为一个完整的圆柱。

<MyIframe src="https://xarzhi.github.io/geometry/index.html#CylinderGeometry"></MyIframe>

### DodecahedronGeometry

一个用于创建**十二面几何体**的类。

```js
const geometry = new THREE.DodecahedronGeometry(
    radius : Float,
    detail : Integer
)
```

-   radius — 十二面体的半径，默认值为 1。
-   detail — 默认值为 0。将这个值设为一个大于 0 的数将会为它增加一些顶点，使其不再是一个十二面体。

<MyIframe src="https://xarzhi.github.io/geometry/index.html#DodecahedronGeometry"></MyIframe>

### EdgesGeometry

**边缘几何体**（EdgesGeometry），这可以作为一个辅助对象来查看[geometry](https://threejs.org/docs/index.html#api/zh/core/BufferGeometry)的边缘。

```js
const geometry = new THREE.EdgesGeometry(
    geometry : BufferGeometry,
    thresholdAngle : Integer
)
```

-   geometry — 任何一个几何体对象。
-   thresholdAngle — 仅当相邻面的法线之间的角度（单位为角度）超过这个值时，才会渲染边缘。默认值为 1。

### ExtrudeGeometry

**挤压缓冲几何体**，从一个形状路径中，挤压出一个 BufferGeometry。

```js
const geometry = new THREE.ExtrudeGeometry(
    shapes : Array,
    options : Object
)
```

-   shapes — 形状或者一个包含形状的数组。

-   options — 一个包含有下列参数的对象：

    -   curveSegments — int，曲线上点的数量，默认值是 12。

    -   steps — int，用于沿着挤出样条的深度细分的点的数量，默认值为 1。

    -   depth — float，挤出的形状的深度，默认值为 1。

    -   bevelEnabled — bool，对挤出的形状应用是否斜角，默认值为 true。

    -   bevelThickness — float，设置原始形状上斜角的厚度。默认值为 0.2。

    -   bevelSize — float。斜角与原始形状轮廓之间的延伸距离，默认值为 bevelThickness-0.1。

    -   bevelOffset — float. Distance from the shape outline that the bevel starts. Default is 0.

    -   bevelSegments — int。斜角的分段层数，默认值为 3。

    -   extrudePath — THREE.Curve 对象。一条沿着被挤出形状的三维样条线。Bevels not supported for path extrusion.

    -   UVGenerator — Object。提供了 UV 生成器函数的对象。

该对象将一个二维形状挤出为一个三维几何体。

当使用这个几何体创建 Mesh 的时候，如果你希望分别对它的表面和它挤出的侧面使用单独的材质，你可以使用一个材质数组。 第一个材质将用于其表面；第二个材质则将用于其挤压出的侧面。

<MyIframe src="https://xarzhi.github.io/geometry/index.html#ExtrudeGeometry"></MyIframe>

### IcosahedronGeometry

一个用于生成**二十面体**的类。

```js
const geometry = new THREE.IcosahedronGeometry(
    radius : Float,
    detail : Integer
)
```

-   radius — 二十面体的半径，默认为 1。
-   detail — 默认值为 0。将这个值设为一个大于 0 的数将会为它增加一些顶点，使其不再是一个二十面体。当这个值大于 1 的时候，实际上它将变成一个球体。

<MyIframe src="https://xarzhi.github.io/geometry/index.html#IcosahedronGeometry"></MyIframe>

### LatheGeometry

**车削缓冲几何体**，创建具有轴对称性的网格，比如花瓶。车削绕着 Y 轴来进行旋转。

```js
const geometry = new THREE.LatheGeometry(
    points : Array,
    segments : Integer,
    phiStart : Float,
    phiLength : Float
)
```

-   points — 一个 Vector2 对象数组。每个点的 X 坐标必须大于 0。 Default is an array with (0,-0.5), (0.5,0) and (0,0.5) which creates a simple diamond shape.
-   segments — 要生成的车削几何体圆周分段的数量，默认值是 12。
-   phiStart — 以弧度表示的起始角度，默认值为 0。
-   phiLength — 车削部分的弧度（0-2PI）范围，2PI 将是一个完全闭合的、完整的车削几何体，小于 2PI 是部分的车削。默认值是 2PI。

<MyIframe src="https://xarzhi.github.io/geometry/index.html#LatheGeometry"></MyIframe>
