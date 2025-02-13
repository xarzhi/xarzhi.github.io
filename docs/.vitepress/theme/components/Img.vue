<template>
  <div class="icon" v-if="realsrc">
    <img :src="realsrc" alt="" />
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";
const props = defineProps(["src"]);
const realsrc = ref();
onMounted(() => {
  const img = new Image();
  img.src = props.src;
  img.onload = (e) => {
    realsrc.value = props.src ?? "";
  };
  img.onerror = () => {
    realsrc.value = "";
  };
});
</script>

<style lang="scss" scoped>
.icon {
//   background-color: #e7e8ec;
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
    width: 100%;
    height: 100%;
  }
}
</style>
