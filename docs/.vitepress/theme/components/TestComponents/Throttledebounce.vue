<template>
  <div class="demo">
    <el-button v-if="type === 'debounce'" type="primary" @click="handleClick"
      >开始</el-button
    >
    <div v-if="type === 'debounce'" class="canvas_box">
      <canvas ref="canvas"></canvas>
    </div>
    <div v-if="type === 'throttle'" class="throttle_box">
      <h2>节流示例</h2>
      <el-button @click="handleClick1" type="primary">点击我</el-button>
      <p>{{ time }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const { type } = defineProps({
  type: {
    type: String,
    required: true,
  },
});
const canvas = ref(null);
const ctx = ref(null);
const radian = ref(0);
const animationId = ref(null);
const time = ref(0);

const debounce = (cb, timeout) => {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      cb.apply(this, args);
    }, timeout);
  };
};

const throttle = (fn, delay) => {
  let lastTime = 0;
  let timer = null;

  return function (...args) {
    const now = Date.now();

    if (now - lastTime < delay) {
      // 如果还在节流时间内，设置一个定时器
      if (timer) return; // 避免重复设置定时器
      timer = setTimeout(() => {
        lastTime = Date.now();
        fn.apply(this, args);
        timer = null; // 重置定时器
      }, delay - (now - lastTime));
    } else {
      // 当时间超过了节流间隔，立即执行
      lastTime = now;
      fn.apply(this, args);
    }
  };
};
class Circle {
  constructor(x, y, radian) {
    this.x = x;
    this.y = y;
    this.color = "#409EFF";
    this.radian = radian;
  }
  draw(ctx) {
    ctx.clearRect(0, 0, 300, 300);
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, 50, 0, (Math.PI / 180) * this.radian, false);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.restore();
    this.drawProgress(ctx);
  }
  drawProgress(ctx) {
    const progress = ((radian.value / 360) * 100).toFixed();
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.textAlign = "center";
    ctx.fillText(`${progress}%`, 150, 155);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}

const animate = () => {
  animationId.value = requestAnimationFrame(animate);
  const circle = new Circle(150, 150, radian.value);
  if (360 - radian.value < 3) {
    radian.value += 1;
  } else {
    radian.value += 3;
  }
  circle.draw(ctx.value);
  if (radian.value >= 361) {
    radian.value = 360;
  }
};

onMounted(() => {
  if (canvas.value) {
    ctx.value = canvas.value.getContext("2d");
    canvas.value.width = 300;
    canvas.value.height = 300;
  }
});

const debouncedAnimate = debounce(animate, 200);

const handleClick = () => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value);
    animationId.value = null;
  }
  radian.value = 0;
  ctx.value.clearRect(0, 0, 300, 300);
  debouncedAnimate();
};

const throttledHandleClick1 = throttle(() => {
  time.value = new Date().toLocaleTimeString();
}, 1000);
const handleClick1 = () => {
  throttledHandleClick1();
};
</script>

<style lang="scss" scoped>
.demo {
  height: 300px;
  display: flex;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  width: 500px;
  justify-content: center;
  .throttle_box {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
