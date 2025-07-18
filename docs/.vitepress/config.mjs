import { defineConfig } from "vite";
import navbar from "./config/navbar";
import sidebar from "./config/sidebar";
import timeline from "vitepress-markdown-timeline";
import { withPwa } from "@vite-pwa/vitepress";

const config = defineConfig({
  base: "/",
  head: [
    [
      "meta",
      {
        name: "referrer",
        content: "no-referrer",
      },
    ],
    ["link", { rel: "icon", href: "/logo.png" }],
    [
      "meta",
      { name: "algolia-site-verification", content: "2468E82FC5CF0E3F" },
    ],
  ],
  title: "Fade away",
  description: "花有重开日，人无在少年",
  lastUpdated: true,
  markdown: {
    math: true,
    lineNumbers: true, // 显示行号
    image: {
      // lazyLoading: true,  // 图片懒加载
    },

    //时间线
    config: (md) => {
      md.use(timeline);
    },
  },
  themeConfig: {
    nav: navbar,
    sidebar: sidebar,
    outline: {
      //level: [2, 3, 4, 5], // 显示2-4级标题
      level: "deep", // 显示2-4级标题
      label: "当前页大纲", // 文字显示
    },
    logo: "/logo.png",
    // 本地搜索
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
    //上次更新时间
    lastUpdated: {
      text: "上次更新时间",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
    //自定义上下页名
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    //markdown配置

    socialLinks: [
      { icon: "github", link: "https://github.com/xarzhi/xarzhi.github.io" },
    ],
    footer: {
      message: "MIT Licensed",
      copyright: "Copyright © 2024-present xarzhi",
    },
    lightModeSwitchTitle: "切换至深色模式",
    darkModeSwitchTitle: "切换至浅色模式",
  },
  pwa: {
    mode: "development",
    registerType: "autoUpdate",
    injectRegister: "script-defer",
    includeAssets: ["favicon.svg"],
    manifest: {
      name: "佳佳的博客",
      short_name: "JiaJia Blog",
      theme_color: "#ffffff",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
  },
  workbox: {
    globPatterns: ["**/*.{css,js,html,svg,png,ico,txt,woff2}"],
  },
  experimental: {
    includeAllowlist: true,
  },
  devOptions: {
    enabled: true,
    suppressWarnings: true,
    navigateFallback: "/",
  },
});

export default withPwa(defineConfig);
