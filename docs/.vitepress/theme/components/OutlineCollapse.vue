<template>
  <!-- 纯副作用组件：不渲染任何可见内容，只负责折叠右侧大纲的二级项 -->
  <span class="vp-outline-collapse" hidden aria-hidden="true"></span>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue'
import { onContentUpdated } from 'vitepress'

/*
  右侧「当前页大纲」的二级项默认折叠。

  VitePress 的 VPDocAsideOutline 是本地导入的组件，没有对外暴露替换方式，
  全局注册同名组件也覆盖不了，所以这里只能等它把 DOM 渲染出来之后再动手：
  给「有子列表的 li」补一个箭头按钮，靠 CSS 控制展开/收起。

  DOM 结构（VitePress 1.6）：
    ul.VPDocOutlineItem.root
      li
        a.outline-link            ← 一级项，点击跳转
        ul.VPDocOutlineItem.nested ← 二级列表，默认 display: none
*/

// 标记已处理过的 li，避免重复插入按钮
const DONE = 'data-vp-collapse'
// 标记已经绑过点击纠正的链接
const PIN = 'data-vp-pin'

const decorate = () => {
  const root = document.querySelector('.VPDocAsideOutline .VPDocOutlineItem.root')
  if (!root) return

  for (const li of root.children) {
    const nested = li.querySelector(':scope > .VPDocOutlineItem.nested')
    if (!nested) continue

    li.classList.add('has-children')
    if (li.hasAttribute(DONE)) continue
    li.setAttribute(DONE, '')

    const toggle = document.createElement('button')
    toggle.type = 'button'
    toggle.className = 'vp-outline-toggle'
    toggle.setAttribute('aria-expanded', 'false')
    toggle.setAttribute('aria-label', '展开/收起子目录')
    toggle.addEventListener('click', (event) => {
      // 按钮是 li 的子元素，不拦的话冒泡到 li 里那个 <a> 会顺带跳转
      event.preventDefault()
      event.stopPropagation()
      const opened = li.classList.toggle('is-open')
      toggle.setAttribute('aria-expanded', String(opened))
    })
    // 必须插在 <a> 和子列表之间：li 是 flex-wrap 容器，顺序决定箭头排在标题右边、子列表另起一行
    li.insertBefore(toggle, nested)

    // 点一级标题本身就是「我要看这一组」，顺手展开，省一次点击
    li.querySelector(':scope > .outline-link')?.addEventListener('click', () => {
      li.classList.add('is-open')
      toggle.setAttribute('aria-expanded', 'true')
    })
  }

  bindPins()
}

// 折叠起来的二级项不在视口里，滚动时不会被判成 active；
// 但带 #前端-开发框架 这种锚点直接进来时，VitePress 会按 hash 点亮隐藏的那个，
// 这时把它的父级展开，免得用户看不见自己在哪。
const revealActive = () => {
  const root = document.querySelector('.VPDocAsideOutline .VPDocOutlineItem.root')
  const active = root?.querySelector('.outline-link.active')
  if (!active) return
  const parentLi = active.closest('li')?.parentElement?.closest('li')
  if (parentLi?.classList.contains('has-children') && !parentLi.classList.contains('is-open')) {
    parentLi.classList.add('is-open')
    parentLi.querySelector(':scope > .vp-outline-toggle')?.setAttribute('aria-expanded', 'true')
  }
  // 上面刚展开的组，在 VitePress 算滑块那一刻还是 display: none，
  // 它读到的 offsetTop 是 0（滑块会停在最上面）。展开后位置变了，这里补算一次。
  syncMarker(active)
}

// VitePress 用 activeLink.offsetTop + 39 定位滑块，依赖 offsetTop 的基准是 .content。
// 直接用几何位置算更稳，也不用管 offsetParent 链。
const syncMarker = (active) => {
  const content = document.querySelector('.VPDocAsideOutline .content')
  const marker = content?.querySelector('.outline-marker')
  if (!content || !marker) return
  const box = active.getBoundingClientRect()
  // 还藏着（display: none）就先别动，等真正展开再说
  if (!box.height) return
  const base = content.getBoundingClientRect()
  marker.style.top = `${Math.round(box.top - base.top + (box.height - marker.offsetHeight) / 2)}px`
  marker.style.opacity = '1'
}

const findLink = (id) => {
  const root = document.querySelector('.VPDocAsideOutline .VPDocOutlineItem.root')
  if (!root || !id) return null
  return (
    [...root.querySelectorAll('.outline-link')].find((a) => {
      try {
        return decodeURIComponent((a.getAttribute('href') || '').slice(1)) === id
      } catch {
        return false
      }
    }) || null
  )
}

let pinTimers = []
/*
  同一行里的多个标题（网址导航页一排 tab）垂直坐标完全一样，
  VitePress 判滚动高亮时用的是「最后一个 top 不大于滚动位置的也就是这一行最后一个」，
  于是点「UI组件库」它会把高亮落在这一排最后的「CDN」上。
  这个判定没法改，只能在点击之后把高亮纠正回真正被点的那一项。
*/
const pinTo = (link) => {
  pinTimers.forEach(clearTimeout)
  const apply = () => {
    const root = document.querySelector('.VPDocAsideOutline .VPDocOutlineItem.root')
    if (!root || !link.isConnected) return
    for (const a of root.querySelectorAll('.outline-link.active')) {
      if (a !== link) a.classList.remove('active')
    }
    link.classList.add('active')
    syncMarker(link)
  }
  // VitePress 的滚动高亮节流 100ms、滚动停止后还会再算一次，所以落在它后面纠正
  pinTimers = [setTimeout(apply, 160), setTimeout(apply, 400)]
}

const bindPins = () => {
  const root = document.querySelector('.VPDocAsideOutline .VPDocOutlineItem.root')
  if (!root) return
  for (const a of root.querySelectorAll('.outline-link')) {
    if (a.hasAttribute(PIN)) continue
    a.setAttribute(PIN, '')
    a.addEventListener('click', () => pinTo(a))
  }
}

// 带 #音乐-音乐论坛 这种锚点进来 / 浏览器前进后退，也把高亮对到锚点指向的那一项
const onHashChange = () => {
  const raw = window.location.hash.slice(1)
  if (!raw) return
  let id = raw
  try {
    id = decodeURIComponent(raw)
  } catch {}
  const link = findLink(id)
  if (link) pinTo(link)
}

let observer = null
let observedRoot = null
const observe = () => {
  const root = document.querySelector('.VPDocAsideOutline .VPDocOutlineItem.root')
  if (!root || root === observedRoot) return
  // 路由切换会换掉整棵 outline，得重新挂到新节点上，否则观察的还是已移除的旧 DOM
  observer?.disconnect()
  // 只盯 class，不盯 childList：按钮是我们自己插进去的，再监听节点变化会自激
  observer = new MutationObserver(revealActive)
  observer.observe(root, { attributes: true, attributeFilter: ['class'], subtree: true })
  observedRoot = root
}

let timer = 0
const run = async () => {
  // aside 的 headers 是在它自己的 onContentUpdated 里赋值的，Vue 更新 DOM 是异步的，
  // 所以等一个 tick 再改；再用 rAF 兜一次，防止字体/布局后渲染晚一拍
  await nextTick()
  decorate()
  observe()
  requestAnimationFrame(() => {
    decorate()
    observe()
  })
  // 路由切换时同样的 URL 会先清空再渲染，补一个延迟兜底
  clearTimeout(timer)
  timer = setTimeout(() => {
    decorate()
    revealActive()
  }, 120)
}

onMounted(() => {
  run()
  window.addEventListener('hashchange', onHashChange)
})
onUnmounted(() => {
  window.removeEventListener('hashchange', onHashChange)
  observer?.disconnect()
  observer = null
  observedRoot = null
  pinTimers.forEach(clearTimeout)
  clearTimeout(timer)
})
onContentUpdated(run)
</script>
