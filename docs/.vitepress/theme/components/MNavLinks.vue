<template>
  <span>
    <h2 v-if="title" :id="formatTitle" tabindex="-1">
      {{ title }}
      <a class="header-anchor" :href="`#${formatTitle}`" aria-hidden="true"></a>
    </h2>
    <div class="tab">
      <template v-if="items[0].items">
        <div class="tab-head">
          <div class="tab-head-box">
            <div
              class="tab-head-item"
              v-for="(item, index) in items"
              :key="item.title"
              @click="handleClick(item, index)"
              :style="{
                color: activeIndex == index ? '#fff' : '#888',
                backgroundColor: activeIndex == index ? '#4BC2C5' : '#e0e0e0',
              }"
            >
              {{ item.title }}
            </div>
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
import { computed, ref } from "vue";
import { slugify } from "@mdit-vue/shared";

import MNavLink from "./MNavLink.vue";
import Pan from "./Pan.vue";
const props = defineProps(["title", "items", "noIcon"]);
const formatTitle = computed(() => {
  console.log(props.title);
  return slugify(props.title);
});

const PanItems = ref([]);
const activeIndex = ref(0);
if (props.items[0].items) {
  PanItems.value = props.items[0].items;
} else {
  PanItems.value = props.items;
}

const handleClick = (item, index) => {
  PanItems.value = item.items;
  activeIndex.value = index;
  console.log(index);
};
</script>

<style lang="scss" scoped>
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
      .tab-head-item {
        min-width: 80px;
		padding: 0 10px;
        height: 25px;
        line-height: 25px;
        margin-right: 10px;
        text-align: center;
        cursor: pointer;
		border-radius: 3px;
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
