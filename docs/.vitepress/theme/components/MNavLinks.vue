<template>
  <span>
    <h2 v-if="title" :id="sectionIdOf" tabindex="-1">
      {{ title }}
      <a class="header-anchor" :href="`#${sectionIdOf}`" aria-hidden="true"></a>
    </h2>
    <div class="tab">
      <template v-if="withTabs">
        <div class="tab-head">
          <div class="tab-head-box" ref="tabHeadBox">
            <div class="slider" ref="slider"></div>
            <!--
              这里必须用 h3，不能用 div。

              VitePress 右侧「当前页大纲」是运行时扫 DOM 生成的：
              theme-default/composables/outline.js 的 getHeaders() 用
              document.querySelectorAll('.VPDoc :where(h1,h2,h3,h4,h5,h6)') 取标题。
              也就是说只有真正的 heading 元素才会被收进菜单，给 div 设 id 是没用的。
              换成 h3 之后，这些 tab 就自动变成「实用工具」等 h2 下的二级菜单项。
            -->
            <h3
              v-for="(item, index) in items"
              :key="item.title"
              :id="tabIdOf(item)"
              tabindex="-1"
              :class="{ 'tab-head-item': true, active: activeIndex === index }"
              @click="selectTab(index)"
            >
              {{ item.title }}
            </h3>
          </div>
        </div>
        <Pan :PanItems="PanItems"></Pan>
      </template>
      <Pan v-else :PanItems="PanItems"></Pan>
    </div>

    <hr />
  </span>
</template>
<script setup>
import { computed, ref, nextTick, onMounted, onUnmounted } from "vue";
import Pan from "./Pan.vue";
import { sectionId, tabId, hasTabs } from "../utils/nav-headings";
const props = defineProps(["title", "items", "noIcon"]);

const sectionIdOf = computed(() => sectionId(props.title));
// 只有 items 里带着子 items 才渲染 tab 栏，也才需要把它们挂进大纲
const withTabs = computed(() => hasTabs(props.items));

// tab 的锚点 id 带上分组前缀，不同分组下的同名 tab 才不会冲突
const tabIdOf = (item) => tabId(props.title, item?.title);

const PanItems = ref(withTabs.value ? props.items[0].items : props.items);
const activeIndex = ref(0);
const slider = ref(null);
const tabHeadBox = ref(null);

const moveSlider = (index) => {
  const el = tabHeadBox.value?.querySelectorAll(".tab-head-item")[index];
  if (!el || !slider.value) return;
  slider.value.style.left = el.offsetLeft + "px";
  slider.value.style.width = el.offsetWidth + "px";
};

const selectTab = (index, { updateHash = true } = {}) => {
  const item = props.items[index];
  if (!item?.items) return;
  activeIndex.value = index;
  PanItems.value = item.items;
  // 文字换成另一个 tab 后宽度会变，等 DOM 更新完再量
  nextTick(() => moveSlider(index));
  if (updateHash) replaceHash(tabIdOf(item));
};

// 点 tab 只改地址栏、不滚动：用户此刻就停在这组 tab 旁边，页面跳一下反而突兀。
// 反方向（点大纲里的二级项）走浏览器原生锚点导航，会触发 hashchange，由 syncFromHash 接住。
const replaceHash = (id) => {
  if (!id) return;
  history.replaceState(history.state, "", `#${id}`);
};

const currentHashId = () => {
  const raw = window.location.hash.slice(1);
  if (!raw) return "";
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
};

// 当前 hash 指向本组的第几个 tab，没有则 -1
const indexFromHash = () => {
  if (!withTabs.value) return -1;
  const id = currentHashId();
  if (!id) return -1;
  return props.items.findIndex((item) => tabIdOf(item) === id);
};

const syncFromHash = () => {
  const index = indexFromHash();
  if (index >= 0 && index !== activeIndex.value) selectTab(index, { updateHash: false });
};

onMounted(() => {
  // 带 #前端-开发框架 这种链接进来时，直接展开对应的 tab
  const index = indexFromHash();
  if (index > 0) selectTab(index, { updateHash: false });
  nextTick(() => moveSlider(activeIndex.value));
  window.addEventListener("hashchange", syncFromHash);
});

onUnmounted(() => {
  window.removeEventListener("hashchange", syncFromHash);
});
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
html[class="dark"] {
  .tab-head {
    .tab-head-box {
      background-color: #333;
      .tab-head-item {
        color: #777;
      }
      .active {
        color: #ddd;
      }
      .slider {
        background-color: #5f5f5f;
      }
    }
  }
}

.tab {
  display: flex;
  flex-flow: column;
  .tab-head {
    display: flex;
    margin-bottom: 10px;
    .tab-head-box {
      width: auto;
      display: flex;
      justify-content: space-between;
      padding: 3px;
      box-sizing: border-box;
      border-radius: 3px;
      background-color: #e0e0e0;
      position: relative;
      z-index: 1;
      .tab-head-item {
        /*
          tab 用 <h3> 是为了被右侧大纲收录（见模板里的注释）。
          代价是要把 .vp-doc h3 的全局样式全部抹掉，否则字会变成 20px/粗体/带 32px 上外边距，
          tab 条会被撑得完全变形。
        */
        margin: 0;
        font-size: inherit;
        font-weight: 400;
        letter-spacing: normal;
        min-width: 80px;
        padding: 0 10px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        cursor: pointer;
        border-radius: 3px;
        margin-right: 10px;
        color: #777;
        position: relative;
        z-index: 1;
        transition: all 0.3s;
        white-space: nowrap;
        .title {
          font-weight: normal;
        }
        &:last-of-type {
          margin-right: 0;
        }
      }

      .active {
        color: #fff;
      }
      .slider {
        position: absolute;
        width: 100px;
        height: 25px;
        background-color: #4bc2c5;
        z-index: -1;
        border-radius: 4px;
        transition: all 0.3s;
      }
      .tab-head-item:last-child {
        margin-right: 0;
      }
    }
  }
}
.m-nav-links {
  --m-nav-gap: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  grid-row-gap: var(--m-nav-gap);
  grid-column-gap: var(--m-nav-gap);
  grid-auto-flow: row dense;
  justify-content: center;
  margin-top: var(--m-nav-gap);
}

@each $media,
  $size
    in (500px: 140px, 640px: 155px, 768px: 175px, 960px: 200px, 1440px: 240px)
{
  @media (min-width: $media) {
    .m-nav-links {
      grid-template-columns: repeat(auto-fill, minmax($size, 1fr));
    }
  }
}

@media (min-width: 960px) {
  .m-nav-links {
    --m-nav-gap: 20px;
  }
}
</style>
