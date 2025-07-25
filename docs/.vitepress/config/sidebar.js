import { join } from "path";
import { readdirSync } from "fs";

function isMarkdownFile(fileName) {
  return !!fileName.match(/.+\.md$/);
}
function getItems(url) {
  const path = join(__dirname, `../../${url}`);
  return readdirSync(path)
    .filter((item) => isMarkdownFile(item))
    .map((fileName) => {
      if (isMarkdownFile(fileName)) {
        const text = fileName.match(/^[0-9]{2}(-|.)+/)
          ? fileName.substring(3)
          : fileName;
        const fileData = {
          text: text.replace(".md", ""),
          link: `${url}/${fileName}`,
        };
        return fileData;
      }
    });
}

const sidebar = {
  "/docs/前端/前端三剑客/Html/": getItems("docs/前端/前端三剑客/Html"),
  "/docs/前端/前端三剑客/CSS": [
    { text: "CSS", items: getItems("/docs/前端/前端三剑客/CSS/CSS") },
    { text: "CSS3", items: getItems("/docs/前端/前端三剑客/CSS/CSS3") },
    { text: "Scss", items: getItems("/docs/前端/前端三剑客/CSS/Scss") },
    { text: "Less", items: getItems("/docs/前端/前端三剑客/CSS/Less") },
  ],
  "/docs/前端/前端三剑客/javascript/": [
    {
      text: "js基础",
      items: getItems("/docs/前端/前端三剑客/javascript/js基础"),
    },
    {
      text: "js高级",
      items: getItems("/docs/前端/前端三剑客/javascript/js高级"),
    },
    {
      text: "Web Api",
      items: getItems("/docs/前端/前端三剑客/javascript/WebApi"),
    },
  ],
  "/docs/前端/工具库/Gsap": [
    {
      text: "快速开始",
      items: [
        {
          text: "基本使用",
          items: getItems("/docs/前端/工具库/Gsap/快速开始"),
        },
      ],
    },
    {
      text: "基本Api",
      items: [
        {
          text: "GSAP对象",
          collapsed: true,
          link: "/docs/前端/工具库/Gsap/基础/gsap/start",
          items: [
            {
              text: "属性",
              collapsed: true,
              items: getItems("/docs/前端/工具库/Gsap/基础/gsap/properties"),
            },
            {
              text: "方法",
              collapsed: true,
              items: getItems("/docs/前端/工具库/Gsap/基础/gsap/methods"),
            },
            {
              text: "内部插件",
              collapsed: true,
              items: getItems(
                "/docs/前端/工具库/Gsap/基础/gsap/internal-plugins"
              ),
            },
          ],
        },
        {
          text: "Tween(补间动画)",
          collapsed: true,
          link: "/docs/前端/工具库/Gsap/基础/Tween/start",
          items: [
            {
              text: "属性",
              collapsed: true,
              items: getItems("/docs/前端/工具库/Gsap/基础/Tween/properties"),
            },
            {
              text: "方法",
              collapsed: true,
              items: getItems("/docs/前端/工具库/Gsap/基础/Tween/methods"),
            },
          ],
        },
        {
          text: "Timeline(时间线)",
          collapsed: true,
          link: "/docs/前端/工具库/Gsap/基础/Timeline/start",
          items: [
            {
              text: "属性",
              collapsed: true,
              items: getItems(
                "/docs/前端/工具库/Gsap/基础/Timeline/properties"
              ),
            },
            {
              text: "方法",
              collapsed: true,
              items: getItems("/docs/前端/工具库/Gsap/基础/Timeline/methods"),
            },
          ],
        },
        {
          text: "CSS",
          collapsed: false,
          link: "/docs/前端/工具库/Gsap/基础/Css/start",
        },
        {
          text: "Easing",
          collapsed: true,
          items: getItems("/docs/前端/工具库/Gsap/基础/Easing"),
        },
      ],
    },
    {
      text: "插件",
      link: "/docs/前端/工具库/Gsap/插件/start",

      items: getItems("/docs/前端/工具库/Gsap/插件/plugins"),
      collapsed: true,
    },
    {
      text: "特征和工具",
      items: getItems("/docs/前端/工具库/Gsap/特征和工具"),
      collapsed: true,
    },
  ],
  "/docs/前端/框架/Vue/Vue2/": [
    { text: "Vue2基础", items: getItems("/docs/前端/框架/Vue/Vue2/Vue2基础") },
    { text: "Vue2进阶", items: getItems("/docs/前端/框架/Vue/Vue2/Vue2进阶") },
  ],
  "/docs/前端/框架/Vue/Vue3/": [
    { text: "Vue3基础", items: getItems("/docs/前端/框架/Vue/Vue3/Vue3基础") },
    {
      text: "组合式Api",
      items: getItems("/docs/前端/框架/Vue/Vue3/组合式Api"),
    },
    {
      text: "Vue3进阶",
      items: getItems("/docs/前端/框架/Vue/Vue3/Vue3进阶"),
      collapsed: true,
    },
    {
      text: "内置组件",
      items: getItems("/docs/前端/框架/Vue/Vue3/内置组件"),
      collapsed: true,
    },
    {
      text: "开发组件库",
      items: getItems("/docs/前端/框架/Vue/Vue3/开发组件库"),
      collapsed: true,
    },
  ],
  "/docs/前端/TypeScript/Ts入门/": [
    { text: "Ts入门", items: getItems("/docs/前端/TypeScript/Ts入门") },
  ],
  "/docs/前端/框架/React/": getItems("/docs/前端/框架/React"),
  "/docs/前端/可视化/Canvas/": getItems("/docs/前端/可视化/Canvas"),
  "/docs/前端/可视化/WebGL/": getItems("/docs/前端/可视化/WebGL"),
  "/docs/前端/可视化/Three.js/": [
    {
      text: "基本使用",
      items: getItems("/docs/前端/可视化/Three.js/基本使用"),
    },
    {
      text: "几何体",
      items: getItems("/docs/前端/可视化/Three.js/几何体"),
      collapsed: true,
    },
    {
      text: "材质",
      items: getItems("/docs/前端/可视化/Three.js/材质"),
      collapsed: true,
    },
    {
      text: "物体",
      items: getItems("/docs/前端/可视化/Three.js/物体"),
      collapsed: true,
    },
    {
      text: "纹理贴图",
      items: getItems("/docs/前端/可视化/Three.js/纹理贴图"),
      collapsed: true,
    },
    {
      text: "光源",
      items: getItems("/docs/前端/可视化/Three.js/光源"),
      collapsed: true,
    },
    {
      text: "阴影",
      items: getItems("/docs/前端/可视化/Three.js/阴影"),
      collapsed: true,
    },
    {
      text: "场景",
      items: getItems("/docs/前端/可视化/Three.js/场景"),
      collapsed: true,
    },
    {
      text: "控制器",
      items: getItems("/docs/前端/可视化/Three.js/控制器"),
      collapsed: true,
    },
    {
      text: "辅助对象",
      items: getItems("/docs/前端/可视化/Three.js/辅助对象"),
      collapsed: true,
    },
    {
      text: "摄像机",
      items: getItems("/docs/前端/可视化/Three.js/摄像机"),
      collapsed: true,
    },
    {
      text: "加载器",
      items: getItems("/docs/前端/可视化/Three.js/加载器"),
      collapsed: true,
    },
    {
      text: "核心",
      items: getItems("/docs/前端/可视化/Three.js/核心"),
      collapsed: true,
    },
    {
      text: "数学库",
      items: getItems("/docs/前端/可视化/Three.js/数学库"),
      collapsed: true,
    },
    {
      text: "常量",
      items: getItems("/docs/前端/可视化/Three.js/常量"),
      collapsed: true,
    },
  ],
  "/docs/后端/C++/C++基础": [
    { text: "C++基础", items: getItems("/docs/后端/C++/C++基础/C++基础") },
    { text: "C++进阶", items: getItems("/docs/后端/C++/C++基础/C++进阶") },
    { text: "面向对象", items: getItems("/docs/后端/C++/C++基础/面向对象") },
    { text: "STL", items: getItems("/docs/后端/C++/C++基础/STL") },
  ],
  "/docs/后端/CS/CS基础": [
    { text: "CS基础", items: getItems("/docs/后端/CS/CS基础/CS基础") },
    { text: "CS高级", items: getItems("/docs/后端/CS/CS基础/CS高级") },
    { text: "面向对象", items: getItems("/docs/后端/CS/CS基础/面向对象") },
  ],
  "/docs/后端/CS/WPF": [
    { text: "WPF基础", items: getItems("/docs/后端/CS/WPF") },
  ],
  "/docs/后端/CS/Winform": [
    {
      text: "Winform基础",
      items: getItems("/docs/后端/CS/Winform/Winform基础"),
    },
    {
      text: "常用控件",
      items: getItems("/docs/后端/CS/Winform/常用控件"),
    },
  ],
  "/docs/后端/C++/Win32": [
    { text: "Win32", items: getItems("/docs/后端/C++/Win32") },
  ],
  "/docs/后端/C++/MFC": [
    { text: "MFC基础", items: getItems("/docs/后端/C++/MFC/MFC基础") },
    { text: "常用控件", items: getItems("/docs/后端/C++/MFC/常用控件") },
    { text: "常用类", items: getItems("/docs/后端/C++/MFC/常用类") },
  ],
  "/docs/前端/小程序/": getItems("/docs/前端/小程序"),
  "/docs/后端/Node.js/": getItems("/docs/后端/Node.js/"),
  "/docs/前端/一些问题/": getItems("/docs/前端/一些问题/"),
  "/docs/其他问题": getItems("/docs/其他问题"),
};

for (let key in sidebar) {
  if (Array.isArray(sidebar[key])) {
    sidebar[key] = sidebar[key].map((item) => {
      return {
        ...item,
        collapsed: item.collapsed || false,
      };
    });
  }
}
export default sidebar;

// 618c2b2dee0a35552241f42bc47a9a1e