<template>
  <div class="plugins">
    <div class="plugin" v-for="(plugins, pluginsIndex) in pluginList" :key="pluginsIndex" :style="{
      background: plugins.bgc,
    }">
      <div class="title">{{ plugins.title }}</div>
      <div class="plugin_list">
        <div class="single_plugin" v-for="(plugin, pluginIndex) in plugins.list" :key="pluginIndex">
          <div class="plugin_name">
            <div class="name">
              {{ plugin.name }}
            </div>
            <div class="extra" v-if="plugin.extra">
              {{ plugin.extra }}
            </div>
          </div>
          <div class="btns">
            <button class="cdn" v-if="plugin.cdn" @click="handleClick($event, plugin, 'cdn')">
              CDN
            </button>
            <button class="cdn" v-if="plugin.npm" @click="handleClick($event, plugin, 'npm')">
              NPM
            </button>
            <button class="cdn" v-if="plugin.umd" @click="handleClick($event, plugin, 'umd')">
              UMD
            </button>
            <button class="cdn" v-if="plugin.esm" @click="handleClick($event, plugin, 'esm')">
              ESM
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import gsap from "gsap";
// import { TextPlugin } from "gsap/TextPlugin";
// gsap.registerPlugin(TextPlugin);

const pluginList = reactive([
  {
    title: "Scroll Plugins",
    bgc: "linear-gradient(144.02deg, #00bae2 4.56%, #fec5fb 72.98%)",
    list: [
      {
        name: "ScrollTrigger",
        cdn: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js",
        esm: 'import { ScrollTrigger } from "gsap/ScrollTrigger";',
        umd: 'import { ScrollTrigger } from "gsap/dist/ScrollTrigger";',
      },
      {
        name: "ScrollTo",
        cdn: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollToPlugin.min.js",
        esm: 'import { ScrollToPlugin } from "gsap/ScrollToPlugin";',
        umd: 'import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";',
      },
      {
        name: "ScrollSmoother",
        cdn: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollSmoother.min.js",
        esm: 'import { ScrollSmoother } from "gsap/ScrollSmoother";',
        umd: 'import { ScrollSmoother } from "gsap/dist/ScrollSmoother";',
        extra: "requires ScrollTrigger",
      },
    ],
  },
  {
    title: "Text Plugins",
    bgc: "radial-gradient(129.03% 100% at 120.97% 81.45%, #dfdcff 27.08%, #a69eff 100%)",
    list: [
      {
        name: "SplitText",
        cdn: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js",
        esm: 'import { SplitText } from "gsap/SplitText";',
        umd: 'import { SplitText } from "gsap/dist/SplitText";',
      },
      {
        name: "ScrambleText",
        cdn: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrambleTextPlugin.min.js",
        esm: 'import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";',
        umd: 'import { ScrambleTextPlugin } from "gsap/dist/ScrambleTextPlugin"',
      },
      {
        name: "Text Replacement",
        cdn: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/TextPlugin.min.js",
        esm: 'import { TextPlugin } from "gsap/TextPlugin";',
        umd: 'import { TextPlugin } from "gsap/dist/TextPlugin";',
      },
    ],
  },
  {
    title: "SVG Plugins",
    bgc: "radial-gradient(70.77% 70.77% at 0% 70.77%, #ffd9b0 0%, #fd9f3b 80.73%, #ff8709 100%)",
    list: [
      {
        name: "DrawSVG",
        cdn: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/DrawSVGPlugin.min.js",
        esm: 'import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";',
        umd: 'import { DrawSVGPlugin } from "gsap/dist/DrawSVGPlugin";',
      },
      {
        name: " MorphSVG",
        cdn: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/MorphSVGPlugin.min.js",
        esm: 'import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";',
        umd: 'import { MorphSVGPlugin } from "gsap/dist/MorphSVGPlugin";',
      },
      {
        name: "MotionPath",
        cdn: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/MotionPathPlugin.min.js",
        esm: 'import { MotionPathPlugin } from "gsap/MotionPathPlugin";',
        umd: 'import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";',
      },
      {
        name: "MotionPathHelper",
        cdn: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/MotionPathHelper.min.js",
        esm: 'import { MotionPathHelper } from "gsap/MotionPathHelper";',
        umd: 'import { MotionPathHelper } from "gsap/dist/MotionPathHelper";',
      },
    ],
  },
  {
    title: "UI Plugins",
    bgc: "radial-gradient(78.77% 78.77% at 71.71% 30.77%, #f0fcff 0%, #9bedff 67.21%, #98ecff 76.04%, #5be1ff 84.9%, #00bae2 94.79%)",
    list: [
      {
        name: "Flip",
        cdn: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Flip.min.js",
        esm: 'import { Flip } from "gsap/Flip";',
        umd: 'import { Flip } from "gsap/dist/Flip";',
      },
      {
        name: "Draggable",
        cdn: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Draggable.min.js",
        esm: 'import { Draggable } from "gsap/Draggable";',
        umd: 'import { Draggable } from "gsap/dist/Draggable";',
      },
      {
        name: "Inertia",
        cdn: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/InertiaPlugin.min.js",
        esm: 'import { InertiaPlugin } from "gsap/InertiaPlugin"',
        umd: 'import { InertiaPlugin } from "gsap/dist/InertiaPlugin"',
      },
      {
        name: "Observer",
        cdn: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Observer.min.js",
        esm: 'import { Observer } from "gsap/Observer";',
        umd: 'import { Observer } from "gsap/dist/Observer";',
      },
    ],
  },
  {
    title: "Other Plugins",
    bgc: "linear-gradient(166.9deg, #0ae448 53.19%, #0085d0 107.69%)",
    list: [
      {
        name: "Physics2D",
        cdn: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Physics2DPlugin.min.js",
        esm: 'import { Physics2DPlugin } from "gsap/Physics2DPlugin";',
        umd: 'import { Physics2DPlugin } from "gsap/dist/Physics2DPlugin";',
      },
      {
        name: "PhysicsProps",
        cdn: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/PhysicsPropsPlugin.min.js",
        esm: 'import { PhysicsPropsPlugin } from "gsap/PhysicsPropsPlugin";',
        umd: 'import { PhysicsPropsPlugin } from "gsap/dist/PhysicsPropsPlugin";',
      },
      {
        name: "GSDevTools",
        cdn: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/GSDevTools.min.js",
        umd: 'import { Flip } from "gsap/dist/Flip";',
        esm: 'import { Flip } from "gsap/Flip";',
      },
      {
        name: "Easel",
        cdn: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/EaselPlugin.min.js",
        umd: 'import { EaselPlugin } from "gsap/dist/EaselPlugin";',
        esm: 'import { EaselPlugin } from "gsap/EaselPlugin";',
      },
      {
        name: "Pixi",
        cdn: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/PixiPlugin.min.js",
        umd: 'import { PixiPlugin } from "gsap/dist/PixiPlugin";',
        esm: 'import { PixiPlugin } from "gsap/PixiPlugin";',
      },
    ],
  },
  {
    title: "Eases",
    bgc: "linear-gradient(153.58deg, #f7bdf8 32.25%, #2f3cc0 92.68%)",
    list: [
      {
        name: "CustomEase",
        cdn: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/CustomEase.min.js",
        umd: 'import { CustomEase } from "gsap/dist/CustomEase";',
        esm: 'import { CustomEase } from "gsap/CustomEase";',
      },
      {
        name: "EasePack",
        cdn: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/EasePack.min.js",
        extra: "rough, slow, and expoScale",
        esm: 'import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";',
        umd: 'import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/dist/EasePack";',
      },
      {
        name: "CustomWiggle",
        cdn: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/CustomWiggle.min.js",
        extra: "requires CustomEase",
        esm: 'import { CustomWiggle } from "gsap/CustomWiggle";',
        umd: 'import { CustomWiggle } from "gsap/dist/CustomWiggle";',
      },
      {
        name: "CustomBounce",
        cdn: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/CustomBounce.min.js",
        extra: "requires CustomEase",
        esm: 'import { CustomBounce } from "gsap/CustomBounce";',
        umd: 'import { CustomBounce } from "gsap/dist/CustomBounce";',
      },
    ],
  },
  {
    title: "React",
    bgc: "radial-gradient(78.77% 78.77% at 71.71% 30.77%, #f0fcff 0%, #9bedff 67.21%, #98ecff 76.04%, #5be1ff 84.9%, #00bae2 94.79%)",
    list: [
      {
        name: "useGSAP()",
        npm: "https://www.npmjs.com/package/@gsap/react",
        esm: 'import { useGSAP } from "@gsap/react";',
        umd: "import { useGSAP } from '@gsap/react/dist';",
      },
    ],
  },
]);

const btnAnimate = (e, plugin) => {
  const target = e.target;
  const html = target.innerHTML;
  gsap.to(target, {
    keyframes: [
      { scale: 0.8, duration: 0.1 },
      { scale: 1.1, duration: 0.2 },
      { scale: 1, duration: 0.2 },
    ],
  });
  const tl = gsap.timeline();
  tl.to(target, {
    innerHTML: "🗸",
    duration: 0.4,
  });
  tl.to(target, {
    duration: 0.2,
    backgroundColor: "#1fb84b",
    text: {
      value: "COPIED",
      newClass: "green",
    },
  });
  tl.to(target, {
    backgroundColor: "#484946",
    innerHTML: html,
    delay: 0.8,
    duration: 0.2,
  });
};

const copy = (plugin, type) => {
  navigator.clipboard.writeText(plugin[type]);
};

const handleClick = (e, plugin, type) => {
  copy(plugin, type);
  btnAnimate(e, plugin);
};
</script>

<style lang="scss" scoped>
.plugins {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  box-sizing: border-box;

  .plugin {
    min-width: 450px;
    flex: 1;
    margin-bottom: 10px;
    border-radius: 10px;
    overflow: hidden;
    padding: 0 10px 10px 10px;
    display: flex;
    flex-flow: column;
    margin-right: 10px;

    .title {
      font-size: 18px;
      text-align: center;
      font-weight: 600;
      height: 40px;
      line-height: 40px;
      color: #000;
    }

    .plugin_list {
      background-color: #0e100f;
      color: #bbbaa1;
      box-sizing: border-box;
      padding: 20px 10px;
      border-radius: 10px;
      flex: 1;

      .single_plugin {
        display: flex;
        padding: 10px 0;
        justify-content: space-between;
        align-items: center;
        line-height: 1;

        .name {
          margin-bottom: 2px;
        }

        .extra {
          font-size: 14.4px;
        }

        .btns {
          display: flex;

          button {
            font-size: 12px;
            width: 60px;
            height: 24px;
            border-radius: 4px;
            background-color: #484946;
            color: whitesmoke;
            margin-right: 5px;
          }
        }
      }
    }
  }
}

.green {
  background-color: #1fb84b;
}
</style>
