<template>
  <div class="demo">
    <div class="btns">
      <el-button type="warning" @click="saveImage">保存图片</el-button>
      <el-button type="primary" @click="handleAddRandom">
        添加随机图形
      </el-button>
    </div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const canvasRef = ref(null);
const ctx = ref(null);

const drawWatermark = (ctx) => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      ctx.save();
      ctx.beginPath();
      ctx.font = "15px Arial";
      ctx.textAlign = "center";
      ctx.rotate((-30 * Math.PI) / 180);
      ctx.fillStyle = "gray";
      ctx.fillText("Fade Away", -100 + i * 100, 10 + j * 60);
      ctx.closePath();
      ctx.restore();
    }
  }
};

const drawRandomRect = (ctx) => {
  const canvas = canvasRef.value;
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  ctx.fillStyle = randomColor;
  ctx.fillRect(
    Math.random() * canvas.width,
    Math.random() * canvas.height,
    100,
    100
  );
};

const drawRandomCircle = (ctx) => {
  const canvas = canvasRef.value;

  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  ctx.beginPath();
  ctx.arc(
    Math.random() * canvas.width,
    Math.random() * canvas.height,
    50,
    0,
    2 * Math.PI
  );
  ctx.fillStyle = randomColor;
  ctx.fill();
  ctx.closePath();
};

const handleAddRandom = () => {
  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");
  const arr = [drawRandomRect, drawRandomCircle];
  const randomFunc = arr[Math.floor(Math.random() * arr.length)];
  randomFunc(ctx);
};

const saveImage = () => {
  const canvas = canvasRef.value;
  // const img = canvas.toDataURL("image/png", 1);
  // const a = document.createElement("a");
  // a.href = img;
  // a.download = "watermark.png";
  // a.click();
  canvas.toBlob(
    function (blob) {
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "watermark.png";
      a.click();
    },
    "image/png",
    1
  );
};

function createHDCanvas(canvas, w, h) {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = w * ratio; // 实际渲染像素
  canvas.height = h * ratio; // 实际渲染像素
  canvas.style.width = `${w}px`; // 控制显示大小
  canvas.style.height = `${h}px`; // 控制显示大小
  const ctx = canvas.getContext("2d");
  ctx.scale(ratio, ratio);
  // canvas 绘制
  return canvas;
}
onMounted(() => {
  const canvas = canvasRef.value;
  canvas.width = 500;
  canvas.height = 300;
  createHDCanvas(canvasRef.value, 500, 300);
  window.onresize = () => {
    createHDCanvas(canvasRef.value, 500, 300);
  };
  ctx.value = canvas.getContext("2d");

  drawWatermark(ctx.value);
});
</script>

<style lang="scss" scoped>
.demo {
  padding: 20px;
  width: 600px;
}
.btns {
  margin-bottom: 20px;
}
canvas {
  border: 1px solid #d1d0d0;
}
</style>
