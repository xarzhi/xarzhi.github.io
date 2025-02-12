<template>
  <div class="tab-pan">
    <a
      class="tab-pan-item"
      v-for="item in PanItems"
      :key="item.title"
      :desc="item.desc"
      :href="item.link"
      target="_blank"
      rel="noreferrer"
    >
      <div class="head">
        <div class="icon" v-if="item.icon && typeof item.icon === 'string'">
          <img :src="withBase(item.icon)" :alt="item.title" />
        </div>
        <div v-else></div>
        <h6 class="title">{{ item.title }}</h6>
      </div>
      <div class="content">
        {{ item.desc }}
      </div>
    </a>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { withBase } from "vitepress";
import { slugify } from "@mdit-vue/shared";
const props = defineProps(["PanItems"]);

// const formatTitle = computed(() => {
//   if (!props.title) {
//     return "";
//   }
//   return slugify(props.title);
// });

// const svg = computed(() => {
//   if (typeof props.icon === "object") return props.icon.svg;
//   return "";
// });

// const formatBadge = computed(() => {
//   if (typeof props.badge === "string") {
//     return { text: props.badge, type: "info" };
//   }
//   return props.badge;
// });
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.tab-pan {
  font-family: var(--vp-font-family-base);
  display: flex;
  flex-wrap: wrap;

  .tab-pan-item {
    cursor: pointer;
    // width: 280px;
    width: 23%;
    height: 120px;
    margin-right: 20px;
    border-radius: 8px;
    display: flex;
    flex-flow: column;
    padding: 10px 15px;
    margin-bottom: 20px;
    background-color: var(--vp-c-bg-soft);
    transition: all 0.25s;
    position: relative;
    border: 1px solid var(--vp-c-bg-soft);
    &::before {
      content: attr(desc);
      position: absolute;
      width: 260px;
      height: auto;
      background: var(--tip-bg);
      color: var(--tip-text);
      display: none;
      padding: 5px;
      box-sizing: border-box;
      border-radius: 8px;
      font-size: 14px;
      top: 0;
      left: 50%;
      transform: translate(-50%, calc(-100% - 20px));
    }
    &::after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      top: -3px;
      border: 10px solid var(--tip-bg);
      color: var(--tip-text);
      border-right: 10px solid transparent;
      border-left: 10px solid transparent;
      border-bottom: 10px solid transparent;
      left: 50%;
      transform: translate(-50%, calc(-100% + 3px));
      display: none;
    }
    &:hover {
      &::before {
        display: block;
      }
      &::after {
        display: block;
      }
    }
    .head {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .icon {
        background-color: #e7e8ec;
        width: 40px;
        height: 40px;
        margin-right: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 6px;
        overflow: hidden;
        :deep(img) {
          border-radius: 4px;
          pointer-events: none;
        }
      }
      .title {
        color: var(--vp-c-text-1);
        font-size: 16px;
        overflow: hidden;
        flex: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 16px;
        font-weight: 600;
      }
    }
    .content {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-grow: 1;
      margin: calc(var(--m-nav-box-gap) - 2px) 0 0;
      line-height: 1.5;
      font-size: 12px;
      color: var(--vp-c-text-2);
    }
    &:hover {
      box-shadow: var(--vp-shadow-2);
      border-color: var(--vp-c-brand);
      text-decoration: initial;
      background-color: var(--vp-c-bg-soft-up);
      transform: translateY(-5px);
    }
  }
}
</style>
