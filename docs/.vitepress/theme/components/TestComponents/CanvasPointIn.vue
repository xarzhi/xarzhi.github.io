<template>
  <div class="demo">
    <div class="desc">
      <div class="point">
        <span>x：{{ Points.x }}</span>
        <span>y：{{ Points.y }}</span>
      </div>
      <div class="isIN" v-if="type === 'path'">
        是否在图形内：{{ isPointInPath ? "是" : "否" }}
      </div>
      <div class="isIN" v-else>
        是否在图形内：{{ isPointInStroke ? "是" : "否" }}
      </div>
    </div>
    <canvas ref="canvasRef" @mousemove="handleMouseMove"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});

const canvasRef = ref(null);
const ctx = ref(null);
const Points = reactive({
  x: 0,
  y: 0,
});
const isPointInPath = ref(false);
const isPointInStroke = ref(false);

onMounted(() => {
  const canvas = canvasRef.value;
  ctx.value = canvas.getContext("2d");
  canvas.width = 300;
  canvas.height = 300;
  ctx.value.beginPath();
  ctx.value.lineWidth = 10;
  ctx.value.arc(150, 150, 100, 0, 2 * Math.PI);
  ctx.value.stroke();
});

const handleMouseMove = (event) => {
  const x = event.offsetX;
  const y = event.offsetY;
  Points.x = x;
  Points.y = y;
  ctx.value.arc(150, 150, 100, 0, 2 * Math.PI);
  if (props.type === "path") {
    isPointInPath.value = ctx.value.isPointInPath(x, y);
  } else {
    isPointInStroke.value = ctx.value.isPointInStroke(x, y);
  }
  if (isPointInPath.value || isPointInStroke.value) {
    document.body.style.cursor = "pointer";
  } else {
    document.body.style.cursor = "default";
  }
};
</script>

<style lang="scss" scoped>
.demo {
  display: flex;
  padding: 20px;
}
canvas {
  border: 1px solid #d1d0d0;
  margin: 20px auto;
}
</style>
