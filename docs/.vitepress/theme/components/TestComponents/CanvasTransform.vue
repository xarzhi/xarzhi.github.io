<template>
  <div class="demo">
    <div class="options">
      <div class="text">
        <div class="language-js p-adaptive-them">
          <code style="padding: 10px; overflow: hidden">
            <span class="line">
              <span>ctx.</span>
              <span style="color: #6f42c1">beginPath</span>
              <span style="--shiki-light: #6f42c1; --shiki-dark: #b392f0"
                >()</span
              >
            </span>
            <span class="line highlighted" v-if="type === 'translate'">
              <span style="--shiki-light: #24292e; --shiki-dark: #e1e4e8"
                >ctx.</span
              >
              <span style="color: #6f42c1">translate</span>
              <span style="color: #6f42c1">(</span>
              <span style="color: #6f42c1">{{ args.x }}, </span>
              <span style="color: #6f42c1">{{ args.y }}</span>
              <span style="color: #6f42c1">)</span>
            </span>
            <span class="line highlighted" v-if="type === 'rotate'">
              <span style="--shiki-light: #24292e; --shiki-dark: #e1e4e8"
                >ctx.</span
              >
              <span style="color: #6f42c1">rotate</span>
              <span style="color: #6f42c1">(</span>
              <span style="color: #6f42c1"
                >(Math.PI / 180) *
                <span style="color: #24292e"> {{ args.deg }}</span>
              </span>
              <span style="color: #6f42c1">)</span>
            </span>
            <span class="line highlighted" v-if="type === 'scale'">
              <span style="--shiki-light: #24292e; --shiki-dark: #e1e4e8"
                >ctx.</span
              >
              <span style="color: #6f42c1">scale</span>
              <span style="color: #6f42c1">(</span>
              <span style="color: #6f42c1">
                <span style="color: #24292e"> {{ args.scaleX }}, </span>
                <span style="color: #24292e"> {{ args.scaleY }}</span>
              </span>
              <span style="color: #6f42c1">)</span>
            </span>
            <span class="line">
              <span style="--shiki-light: #24292e; --shiki-dark: #e1e4e8"
                >ctx.</span
              >
              <span style="color: #6f42c1">fillStyle</span>
              <span style="--shiki-light: #6f42c1; --shiki-dark: #b392f0">
                =
              </span>
              <span style="color: #24292e">"aqua"</span>
            </span>
            <span class="line">
              <span style="--shiki-light: #24292e; --shiki-dark: #e1e4e8"
                >ctx.</span
              >
              <span style="color: #6f42c1">rect</span>
              <span style="color: #6f42c1">(0, 0, 100, 100)</span>
            </span>
            <span class="line">
              <span style="--shiki-light: #24292e; --shiki-dark: #e1e4e8"
                >ctx.</span
              >
              <span style="color: #6f42c1">fill</span>
              <span style="--shiki-light: #6f42c1; --shiki-dark: #b392f0"
                >()</span
              >
            </span>
            <span class="line">
              <span>ctx.</span>
              <span style="color: #6f42c1">closePath</span>
              <span style="--shiki-light: #6f42c1; --shiki-dark: #b392f0"
                >()</span
              >
            </span>
          </code>
        </div>
      </div>
      <div class="option">
        <div class="slider-demo-block" v-for="item in slides" :key="item.label">
          <template v-if="item.case.includes(type)">
            <span class="demonstration">{{ item.label }}</span>
            <el-slider
              v-model="args[item.model]"
              :max="item.max"
              :min="item.min"
              @input="handleArgsChange($event, item.model)"
              :size="item.size"
              :input-size="item.size"
              :step="item.step || 1"
            />
          </template>
        </div>
      </div>
    </div>
    <div class="canvas_box">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
const canvasRef = ref(null);
const ctx = ref(null);
const rect = ref(null);
const slides = reactive([
  {
    label: "水平位移",
    model: "x",
    min: 0,
    max: 200,
    size: "small",
    case: "translate,transform",
  },
  {
    label: "垂直位移",
    model: "y",
    min: 0,
    max: 200,
    size: "small",
    case: "translate,transform",
  },
  {
    label: "旋转角度",
    model: "deg",
    min: 0,
    max: 45,
    size: "small",
    case: "rotate",
  },
  {
    label: "水平缩放",
    model: "scaleX",
    min: -2,
    max: 2,
    size: "small",
    case: "scale,transform",
    step: 0.01,
  },
  {
    label: "垂直缩放",
    model: "scaleY",
    min: -2,
    max: 2,
    size: "small",
    case: "scale,transform",
    step: 0.01,
  },
  {
    label: "水平倾斜",
    model: "skewX",
    min: 0,
    max: 2,
    size: "small",
    case: "transform",
    step: 0.01,
  },
  {
    label: "垂直倾斜",
    model: "skewY",
    min: 0,
    max: 2,
    size: "small",
    case: "transform",
    step: 0.01,
  },
]);

const args = reactive({
  x: 0,
  y: 0,
  deg: 0,
  scaleX: 1,
  scaleY: 1,
  skewX: 0,
  skewY: 0,
});

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});

class Rect {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(args.x, args.y);
    ctx.rotate((Math.PI / 180) * args.deg);
    if (props.type === "scale") {
      ctx.translate(100, 100);
    }
    ctx.scale(args.scaleX, args.scaleY);
    if (props.type === "transform") {
      ctx.transform(
        args.scaleX,
        args.skewX,
        args.skewY,
        args.scaleY,
        args.x,
        args.y
      );
    }
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "aqua";
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}

rect.value = new Rect(0, 0, 100, 100);

const handleArgsChange = (val, key) => {
  ctx.value.clearRect(0, 0, 300, 300);
  args[key] = val;
  rect.value.draw(ctx.value);
};

onMounted(() => {
  const canvas = canvasRef.value;
  canvas.width = 300;
  canvas.height = 300;
  ctx.value = canvas.getContext("2d");
  if (props.type === "rotate") {
    rect.value.x = 200;
  }
  console.log(ctx.value);
  rect.value.draw(ctx.value);
});
</script>

<style lang="scss" scoped>
.demo {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
}
canvas {
  border: 1px solid #d1d0d0;
  margin-left: 20px;
}
.slider-demo-block {
  display: flex;
  align-items: center;
  width: 300px;
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
  width: 180px;
}
.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  line-height: 44px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
  margin-right: 10px;
  width: 80px;
  &::after {
    content: "：";
  }
}
.line {
  display: flex;
}
.highlighted {
  display: flex;
}
</style>
