<template>
  <div class="demo">
    <div class="head">
      <el-select
        @change="handleCompositeOperationChange"
        v-model="compositeOperation"
      >
        <el-option
          v-for="item in compositeOperationAndDescription"
          :key="item.value"
          :label="item.value"
          :value="item.value"
        />
      </el-select>

      <div class="cate">
        <div class="target_body">
          <div class="box"></div>
          <div class="desc">目标图像</div>
        </div>
        <div class="source_body">
          <div class="box"></div>
          <div class="desc">源图像</div>
        </div>
      </div>
    </div>
    <canvas ref="canvasRef"></canvas>
    <div class="description">{{ compositeOperation }}：{{ description }}</div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
const compositeOperation = ref("source-over");
const canvasRef = ref(null);
const ctx = ref(null);
const description = ref("新的图像将覆盖在旧图像上。");

const compositeOperationAndDescription = reactive([
  { value: "source-over", description: "新的图像将覆盖在旧图像上。" },
  {
    value: "source-in",
    description:
      "源图像仅在目标图像的交集部分绘制。如果源图像与目标图像没有重叠，则不会绘制",
  },
  {
    value: "source-out",
    description:
      "源图像在目标图像之外的部分绘制。也就是说，只有在目标图像中没有的区域才会显示源图像",
  },
  {
    value: "source-atop",
    description:
      "源图像绘制在目标图像上，但只有在目标图像的覆盖区域内进行绘制。目标图像的部分会显示在源图像的下方，其他部分则只显示源图像。",
  },
  {
    value: "destination-over",
    description:
      "目标图像绘制在源图像的下方。这种模式下，只有目标图像的那些部分不透明的地方会显示源图像",
  },
  {
    value: "destination-in",
    description:
      "目标图像仅在源图像的交集部分显示。若目标图像没有与源图像重叠，则不会显示任何图像。",
  },
  {
    value: "destination-out",
    description:
      "从目标图像中去除与源图像重叠的部分。源图像起到“擦除”目标图像中重叠部分的作用。",
  },
  {
    value: "destination-atop",
    description:
      "目标图像在源图像的上方绘制，但仅在源图像的覆盖区域内进行绘制。其他部分则不受影响。",
  },
  {
    value: "lighter",
    description:
      "源图像与目标图像相加，产生更亮的颜色效果。叠加的颜色会更亮，但不会超过白色。",
  },
  { value: "copy", description: "只显示新内容。" },
  { value: "xor", description: "互相重叠的区域是透明的。" },
  {
    value: "multiply",
    description:
      "正片叠底。顶层的像素与底层的对应像素相乘。结果是一幅更黑暗的图画。",
  },
  {
    value: "screen",
    description:
      "滤色。像素反转，相乘，然后再反转。最终得到更淡的图形（和multiply相反）。",
  },
  {
    value: "overlay",
    description:
      "叠加。multiply和screen组合效果。基础图层上暗的部分更暗，亮的部分更亮。",
  },
  {
    value: "darken",
    description: "变暗。保留原内容和新内容中最暗的像素。",
  },
  { value: "lighten", description: "变亮。保留原内容和新内容中最亮的像素。" },
  {
    value: "color-dodge",
    description: "颜色减淡。底部图层色值除以顶部图层的反相色值。",
  },
  {
    value: "color-burn",
    description: "颜色加深。底部图层的色值除以顶部图层色值，得到的结果再反相。",
  },
  {
    value: "hard-light",
    description:
      "强光。类似overlay，是multiply和screen组合效果。只不过底层和顶层位置交换下。",
  },
  {
    value: "soft-light",
    description:
      "柔光。hard-light的柔和版本。纯黑色或白色不会生成为纯黑色或白色。",
  },
  {
    value: "difference",
    description:
      "差异。顶层色值减去底层色值的绝对值。如果都是白色，则最后是黑色，因为值为0；什么时候是白色呢，例如RGB(255,0,0)和RGB(0,255,255)，色值相减后绝对值是RGB(255,255,255)。",
  },
  {
    value: "exclusion",
    description: "排除。类似difference，不过对比度较低。",
  },
  {
    value: "hue",
    description: "色调。最终的颜色保留底层的亮度和色度，同时采用顶层的色调。",
  },
  {
    value: "saturation",
    description: "饱和度。最终的颜色保留底层的亮度和色调，同时采用顶层的色度。",
  },
  {
    value: "color",
    description:
      "色值。最终的颜色保留底层的亮度，同时采用顶层的色调和色度。",
  },
  {
    value: "luminosity",
    description:
      "亮度。最终的颜色保留底层的色调和色度，同时采用顶层的亮度。",
  },
]);

const handleCompositeOperationChange = (e) => {
  draw(ctx.value);
  description.value = compositeOperationAndDescription.find(
    (item) => item.value === e
  ).description;
};

const draw = (ctx) => {
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  ctx.save();
  ctx.translate(400 / 2, 200 / 2);
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(-40, 20, 80, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
  ctx.globalCompositeOperation = compositeOperation.value;

  ctx.fillStyle = "orange";
  ctx.beginPath();
  ctx.arc(40, 20, 80, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};

onMounted(() => {
  const canvas = canvasRef?.value;
  ctx.value = canvas.getContext("2d");
  canvas.width = 400;
  canvas.height = 280;
  draw(ctx.value);
});
</script>

<style lang="scss" scoped>
.demo {
  padding: 20px;
  box-sizing: border-box;
  width: 600px;
  border-radius: 5px;
  .head {
    display: flex;
    justify-content: space-between;
    .cate {
      .target_body {
        display: flex;
        align-items: center;
        .box {
          width: 20px;
          height: 20px;
          background-color: red;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
      .source_body {
        align-items: center;
        display: flex;
        .box {
          width: 20px;
          height: 20px;
          background-color: orange;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
    }
  }
}
.el-select {
  width: 200px;
}
canvas {
  margin-top: 10px;
}
</style>
