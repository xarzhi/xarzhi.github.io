<template>
  <span>
    <h2 v-if="title" :id="formatTitle" tabindex="-1">
      {{ title }}
      <a class="header-anchor" :href="`#${formatTitle}`" aria-hidden="true"></a>
    </h2>
    <div class="tab">
      <template v-if="items[0].items">
        <div class="tab-head">
          <div class="tab-head-box" ref="tabHeadBox">
            <div
              v-for="(item, index) in items"
              :key="item.title"
              @click="handleClick(item, index, $event)"
              :class="{
                'tab-head-item': true,
                active: activeIndex === index,
              }"
            >
              {{ item.title }}
            </div>
            <div class="slider" ref="slider"></div>
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
import { computed, ref, nextTick, onMounted } from "vue";
import { slugify } from "@mdit-vue/shared";
import { useRoute, useData } from "vitepress";
import Pan from "./Pan.vue";
const props = defineProps(["title", "items", "noIcon"]);
const route = useRoute();
const formatTitle = computed(() => {
  return slugify(props.title);
});

const PanItems = ref([]);
const activeIndex = ref(0);
const slider = ref(null);
const tabHeadBox = ref(null);
if (props.items[0].items) {
  PanItems.value = props.items[0].items;
} else {
  PanItems.value = props.items;
}

const data = useData();

onMounted(() => {
  const items = tabHeadBox.value?.querySelectorAll(".tab-head-item");
  // console.log(items.length)
  if (items) {
    const [item] = items;
    slider.value.style.left = item.offsetLeft + "px";
    slider.value.style.width = item.offsetWidth + "px";
  }
});
const handleClick = (item, index, e) => {
  PanItems.value = item.items;
  activeIndex.value = index;
  location.hash = props.title + "/" + item.title;
  slider.value.style.left = e.target.offsetLeft + "px";
  slider.value.style.width = e.target.offsetWidth + "px";
};
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
      justify-content: center;
      padding: 3px;
      box-sizing: border-box;
      border-radius: 3px;
      background-color: #e0e0e0;
      position: relative;
      z-index: 1;
      .tab-head-item {
        min-width: 80px;
        padding: 0 10px;
        height: 25px;
        line-height: 25px;
        margin-right: 10px;
        text-align: center;
        cursor: pointer;
        border-radius: 3px;
        color: #777;
        position: relative;
        z-index: 1;
        transition: all 0.3s;
        .title {
          font-weight: normal;
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
