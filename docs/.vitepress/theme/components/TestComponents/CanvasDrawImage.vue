<template>
  <div class="demo">
    <div class="head">
      <div class="left">
        <el-select @change="handleChange" v-model="mode">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :on-change="handlePictureCardPreview"
          accept=""
        >
          <el-button type="primary">上传本地图片</el-button>
        </el-upload>
      </div>
      <div class="option">
        <div class="slider-demo-block" v-for="item in slides" :key="item.label">
          <template v-if="item.case && item.case.includes(mode)">
            <span class="demonstration">{{ item.label }}</span>
            <el-slider
              v-model="args[item.model]"
              :max="item.max"
              :min="item.min"
              @input="handleArgsChange($event, item.model)"
              :size="item.size"
              :input-size="item.size"
            />
          </template>
        </div>
      </div>
    </div>

    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
const canvas = ref(null);
const ctx = ref(null);
const mode = ref("3");
const isOnload = ref(false);
const src = ref(
  "https://gitee.com/xarzhi/picture/raw/master/img/image-20241115145905081.png"
);
const slides = reactive([
  {
    label: "水平位置",
    model: "dx",
    min: 0,
    max: 800,
    size: "small",
    case: "3,5,9",
  },
  {
    label: "垂直位置",
    model: "dy",
    min: 0,
    max: 500,
    size: "small",
    case: "3,5,9",
  },
  {
    label: "裁剪x坐标",
    model: "sx",
    min: 0,
    max: 800,
    size: "small",
    case: "9",
  },
  {
    label: "裁剪y坐标",
    model: "sy",
    min: 0,
    max: 500,
    size: "small",
    case: "9",
  },
  {
    label: "图片宽度",
    model: "dWidth",
    min: 300,
    max: 800,
    size: "small",
    case: "5,9",
  },
  {
    label: "图片高度",
    model: "dHeight",
    min: 300,
    max: 500,
    size: "small",
    case: "5,9",
  },
  {
    label: "裁剪宽度",
    model: "sWidth",
    min: 0,
    max: 800,
    size: "small",
    case: "9",
  },
  {
    label: "裁剪高度",
    model: "sHeight",
    min: 0,
    max: 500,
    size: "small",
    case: "9",
  },
]);
const options = [
  { value: "3", label: "三个参数" },
  { value: "5", label: "五个参数" },
  { value: "9", label: "九个参数" },
];

const args = reactive({
  sx: 0,
  sy: 0,
  sWidth: 400,
  sHeight: 250,
  dx: 0,
  dy: 0,
  dWidth: 800,
  dHeight: 500,
});

const image = new Image();
image.src = src.value;
image.onload = (e) => {
  isOnload.value = true;
  slides[2].max = image.width;
  slides[3].max = image.height;
  slides[6].max = image.width;
  slides[7].max = image.height;
  draw(ctx.value);
};

const draw = (ctx) => {
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  const map = new Map([
    ["3", [args.dx, args.dy]],
    ["5", [args.dx, args.dy, args.dWidth, args.dHeight]],
    [
      "9",
      [
        args.sx,
        args.sy,
        args.sWidth,
        args.sHeight,
        args.dx,
        args.dy,
        args.dWidth,
        args.dHeight,
      ],
    ],
  ]);
  if (isOnload.value) {
    ctx.drawImage(image, ...map.get(mode.value));
  }
};

const handleChange = (val) => {
  if (isOnload.value) {
    draw(ctx.value);
  }
};

const handleArgsChange = (val, key) => {
  args[key] = val;
  if (isOnload.value) {
    draw(ctx.value);
  }
};

const handlePictureCardPreview = (file) => {
  // 把file转成base64
  const reader = new FileReader();
  reader.readAsDataURL(file.raw);
  reader.onload = (e) => {
    src.value = e.target.result;
    image.src = src.value;
    image.onload = (e) => {
      isOnload.value = true;
      slides[2].max = image.width;
      slides[3].max = image.height;
      slides[6].max = image.width;
      slides[7].max = image.height;
      draw(ctx.value);
    };
  };
};
onMounted(() => {
  ctx.value = canvas.value.getContext("2d");

  canvas.value.width = 800;
  canvas.value.height = 500;
  draw(ctx.value);
});
</script>
<style lang="scss" scoped>
.demo {
  border-radius: 5px;
  .head {
    display: flex;
    justify-content: space-between;
    .el-select {
      width: 200px;
      margin-bottom: 10px;
    }
    .option {
      margin-left: 30px;
      flex: 1;
      display: flex;
      flex-flow: row wrap;
    }
  }
  padding: 10px;
  box-sizing: border-box;
}
canvas {
  border: 1px solid #d1d0d0;
  margin: 20px auto;
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
</style>
