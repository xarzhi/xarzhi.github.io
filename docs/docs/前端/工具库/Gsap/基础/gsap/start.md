# GSAP对象

## GSAP对象

`gsap` 对象是访问 GSAP 大部分功能的主要入口。**它只是一个通用对象，具有各种方法和属性，用于创建和控制补间动画（Tweens）和时间轴（Timelines）**，这两个是理解 GSAP 的两个最重要的概念。



### 什么是补间动画（Tween）

补间动画是执行所有动画工作的组件 - 可以将其视为 **高性能属性设置器**。你提供目标（你想要动画化的对象）、持续时间以及你想要动画的任何属性，然后当补间动画的播放头移动到新位置时，它会计算出该点的属性值，并相应地应用它们。

#### 创建补间动画的常用方法：

- [gsap.to()](/docs/前端/工具库/Gsap/基础/gsap/methods/23.to())
- [gsap.from()](/docs/前端/工具库/Gsap/基础/gsap/methods/07.from())
- [gsap.fromTo()](/docs/前端/工具库/Gsap/基础/gsap/methods/06.fromTo())

对于简单的动画（没有复杂的序列），以上方法就足够了！例如：

```javascript
//在 1 秒的时间内旋转并移动具有 "box" 类的元素（"x" 是 translateX() 变换的简写）。
gsap.to('.box', { rotation: 27, x: 100, duration: 1 })
```

<MyIframe height="383" style="width: 100%;" scrolling="no" title="GSAP Basic Tween" src="https://codepen.io/2235762265/embed/PwqYNPN?default-tab=js%2Cresult&theme-id=41164" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true" >
</MyIframe>

你可以使用 `delay` 特殊属性进行基本的序列化，但时间轴使得序列化和复杂的编排变得更加容易。

### 什么是时间轴（Timeline）

时间轴是 **补间动画的容器**。它是终极的序列化工具，允许你随时定位动画，然后使用诸如 [pause()](/docs/前端/工具库/Gsap/基础/Tween/methods/10.pause())、[play()](/docs/前端/工具库/Gsap/基础/Tween/methods/12.play())、[progress()](/docs/前端/工具库/Gsap/基础/Tween/methods/13.progress())、[reverse()](/docs/前端/工具库/Gsap/基础/Tween/methods/18.reverse())、[timeScale()](/docs/前端/工具库/Gsap/基础/Tween/methods/25.timeScale()) 等方法轻松控制整个序列。

创建任意数量的时间轴。你甚至可以 **嵌套它们**，这对于模块化你的动画代码非常出色！每个动画（补间动画和时间轴）都被放置在父时间轴上（默认是 globalTimeline）。移动时间轴的播放头会级联到其子元素，以便播放头保持对齐。时间轴完全是关于组合事物和协调时间/播放头 - 它实际上从不直接在目标上设置属性（补间动画处理这个）。

```
                        PLAYHEAD
|--------------timeline-----|-----------|
|--tween1--|                |
           |-----tween2-----|-----------|

```

#### 创建时间轴的方法：

- gsap.timeline()

GSAP 的 API 允许你即时控制几乎所有事物，例如播放头位置、任何子元素的开始时间，甚至播放/暂停/反转时间轴或更改 timeScale 本身。

## 在时间轴中对事物进行序列化

首先，创建一个时间轴：

```javascript
var tl = gsap.timeline()
```

然后使用便利方法之一 - to()、from() 或 fromTo() 添加补间动画：

```javascript
tl.to('.box', { duration: 2, x: 100, opacity: 0.5 })
```

你可以这样做多少次都行。注意我们在时间轴实例（这种情况下是变量 `tl`）上调用 `.to()`，而不是 `gsap` 对象。这会创建一个补间动画并立即将其放入特定的时间轴中。另一方面，`gsap.to()` 创建一个独立的补间动画。默认情况下，动画将一个接一个地进行序列化。你甚至可以使用方法链来简化你的代码，如下所示：

```javascript
//一个接一个地序列化
tl.to('.box1', { duration: 2, x: 100 }) //注意这里没有分号！
  .to('.box2', { duration: 1, y: 200 })
  .to('.box3', { duration: 3, rotation: 360 })
```

**注意：** 整个 GSAP 平台都是面向对象的，你可以使用 gsap.to() 创建单独的补间动画实例，然后使用 timeline.add() 添加每一个，但直接在时间轴实例上调用 .to()、.from() 或 .fromTo() 来做同样的事情会更简单，步骤更少。

## 使用位置参数控制放置

使用可选的位置参数来精确定义你希望将动画放置在时间轴上的哪个位置。一个数字表示绝对时间（秒为单位），或者带有 `"+="` 或 `"-="` 前缀的字符串表示相对于时间轴末尾的偏移量。例如，`"+=2"` 将在末尾之后 2 秒开始，创建一个 2 秒的间隔。`"-=2"` 将创建一个 2 秒的重叠。

```javascript
//从时间轴开始的确切时间 1.5 秒处开始：
tl.to(...), 1.5
  .to(...), "-=0.75" //与末尾重叠 0.75 秒
  .to(...), "+=1" //之前增加 1 秒间隔

```

## 标签

使用标签标记时间轴上的特定位置，以便你可以在播放期间放置动画或导航到那里。

```javascript
//在确切的 3 秒处添加标签
tl.addLabel("step2", 3)
  .to(..., "step2") //在 step2 标签处开始
  .to(..., "step2+=0.75") //在 step2 标签后 0.75 秒

//然后稍后，我们可以 seek() 到那个位置：
tl.seek("step2");

```

## 控制补间动画和时间轴

补间动画和时间轴都扩展自一个暴露了大量有用方法和属性的动画类。以下是最常用的一些：

- pause()
- play()
- progress()
- restart()
- resume()
- reverse()
- seek()
- time()
- duration()
- timeScale()
- kill()

你可以使用变量引用补间动画或时间轴实例，然后随时控制它：

```javascript
//只有在你稍后想要控制它时才需要创建变量...
var tween = gsap.to(...);
var tl = gsap.timeline(); //"tl" 是时间轴的简称
tl.to(...).to(...); //添加动画。

//现在我们可以控制它们...
tween.pause();
tween.timeScale(2); //速度加倍
tl.seek(3); //跳到 3 秒处
tl.progress(0.5); //播放到一半
...
```
