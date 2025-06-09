<template>
  <div class="tab-pan">
    <template v-for="item in PanItems" :key="item.title">
      <el-tooltip effect="dark" placement="top">
        <template #content>
          <div style="max-width: 250px">{{ item.desc }}</div>
        </template>
        <div class="tab-pan-item" :desc="item.desc" @click="handleJump(item)">
          <div class="head">
            <Img :src="item.icon" :alt="item.title" />
            {{ item.title }}
          </div>
          <div class="content">
            {{ item.desc }}
          </div>
        </div>
      </el-tooltip>
    </template>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { withBase } from "vitepress";
import { slugify } from "@mdit-vue/shared";
const props = defineProps(["PanItems"]);

const handleJump = (item) => {
  open(item.link);
};
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
  
    .head {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

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
