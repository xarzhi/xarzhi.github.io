// docs/.vitepress/config.mjs
import { defineConfig } from "file:///C:/Users/22357/Desktop/xarzhi/node_modules/vite/dist/node/index.js";

// docs/.vitepress/config/navbar.js
var nav = [
  {
    text: "\u524D\u7AEF",
    items: [
      {
        text: "\u524D\u7AEF\u4E09\u5251\u5BA2",
        items: [
          {
            text: "Html",
            link: "/docs/\u524D\u7AEF/\u524D\u7AEF\u4E09\u5251\u5BA2/Html/01.Html\u521D\u8BC6",
            icon: "https://gitee.com/xarzhi/picture/raw/master/img/html5.svg"
          },
          {
            text: "CSS",
            link: "/docs/\u524D\u7AEF/\u524D\u7AEF\u4E09\u5251\u5BA2/CSS/CSS/01.\u5F15\u5165css\u6837\u5F0F\u8868",
            icon: "https://gitee.com/xarzhi/picture/raw/master/img/css_old.svg"
          },
          {
            text: "JavaScript",
            link: "/docs/\u524D\u7AEF/\u524D\u7AEF\u4E09\u5251\u5BA2/javascript/js\u57FA\u7840/01.js\u57FA\u7840\u8BED\u6CD5",
            icon: "https://gitee.com/xarzhi/picture/raw/master/img/javascript.svg"
          }
        ]
      },
      {
        text: "TypeScript",
        items: [
          {
            text: "Ts\u5165\u95E8",
            link: "/docs/\u524D\u7AEF/TypeScript/Ts\u5165\u95E8/01.\u57FA\u672C\u914D\u7F6E",
            icon: "https://gitee.com/xarzhi/picture/raw/master/img/typescript.svg"
          }
        ]
      },
      {
        text: "Vue",
        items: [
          {
            text: "Vue2",
            link: "/docs/\u524D\u7AEF/\u6846\u67B6/Vue/Vue2/Vue2\u57FA\u7840/01.Vue2\u57FA\u7840",
            icon: "https://cn.vuejs.org/logo.svg"
          },
          {
            text: "Vue3",
            link: "/docs/\u524D\u7AEF/\u6846\u67B6/Vue/Vue3/Vue3\u57FA\u7840/01.Vue3\u57FA\u7840",
            icon: "https://cn.vuejs.org/logo.svg"
          }
        ]
      },
      {
        text: "React",
        items: [
          {
            text: "React",
            link: "/docs/\u524D\u7AEF/\u6846\u67B6/React/01.React\u5165\u95E8",
            icon: "https://gitee.com/xarzhi/picture/raw/master/img/react_light.svg"
          }
        ]
      },
      {
        text: "\u5C0F\u7A0B\u5E8F",
        link: "/docs/\u524D\u7AEF/\u5C0F\u7A0B\u5E8F/01.mina.md",
        icon: "https://gitee.com/xarzhi/picture/raw/master/img/uni.png"
      },
      {
        text: "\u{1F9ED}\u4E00\u4E9B\u95EE\u9898",
        link: "/docs/\u524D\u7AEF/\u4E00\u4E9B\u95EE\u9898/01.\u540E\u7AEF\u8FD4\u56DE10\u4E07\u6761\u6570\u636E.md"
      }
    ]
  },
  {
    text: "\u53EF\u89C6\u5316",
    items: [
      {
        text: "Canvas",
        link: "/docs/\u524D\u7AEF/\u53EF\u89C6\u5316/Canvas/01.\u8BA4\u8BC6Canvas",
        icon: "https://gitee.com/xarzhi/picture/raw/master/img/canva.svg"
      },
      {
        text: "Threejs",
        link: "/docs/\u524D\u7AEF/\u53EF\u89C6\u5316/Three.js/\u57FA\u672C\u4F7F\u7528/01.\u5B89\u88C5threejs",
        icon: "https://gitee.com/xarzhi/picture/raw/master/img/threejs-light.svg"
      },
      {
        text: "WebGl",
        link: "/docs/\u524D\u7AEF/\u53EF\u89C6\u5316/WebGL/01.WebGL\u57FA\u7840",
        icon: "https://gitee.com/xarzhi/picture/raw/master/img/threejs-light.svg"
      }
    ]
  },
  {
    text: "\u5DE5\u5177\u5E93",
    items: [
      {
        text: "Gsap",
        link: "/docs/\u524D\u7AEF/\u5DE5\u5177\u5E93/Gsap/\u5FEB\u901F\u5F00\u59CB/01.\u5B89\u88C5.md",
        icon: "https://gitee.com/xarzhi/picture/raw/master/img/gsap.png"
      }
    ]
  },
  {
    text: "\u6253\u5305\u5DE5\u5177",
    items: [
      {
        text: "Webpack",
        link: "/docs/\u524D\u7AEF/Webpack/01.Webpack\u57FA\u7840.md",
        icon: "https://gitee.com/xarzhi/picture/raw/master/img/webpack.png"
      }
    ]
  },
  {
    text: "\u540E\u7AEF",
    items: [
      {
        text: "Node.js",
        link: "/docs/\u540E\u7AEF/Node.js/01.\u521D\u8BC6Node.js",
        icon: "https://gitee.com/xarzhi/picture/raw/master/img/nodejs.png"
      },
      {
        text: "C++",
        items: [
          {
            text: "C++\u57FA\u7840",
            link: "/docs/\u540E\u7AEF/C++/C++\u57FA\u7840/C++\u57FA\u7840/01.\u73AF\u5883\u914D\u7F6E.md",
            icon: "https://gitee.com/xarzhi/picture/raw/master/img/c-plusplus.svg"
          },
          {
            text: "QT",
            link: "/docs/\u540E\u7AEF/C++/C++\u57FA\u7840/01.\u73AF\u5883\u914D\u7F6E.md",
            icon: "https://gitee.com/xarzhi/picture/raw/master/img/qt.svg"
          },
          {
            text: "Win32 api",
            link: "/docs/\u540E\u7AEF/C++/Win32/01.\u57FA\u7840\u77E5\u8BC6.md",
            icon: "https://gitee.com/xarzhi/picture/raw/master/img/c-plusplus.svg"
          },
          {
            text: "MFC",
            link: "/docs/\u540E\u7AEF/C++/MFC/MFC\u57FA\u7840/01.\u73AF\u5883\u914D\u7F6E.md",
            icon: "https://gitee.com/xarzhi/picture/raw/master/img/c-plusplus.svg"
          }
        ]
      },
      {
        text: "C#",
        items: [
          {
            text: "C#\u57FA\u7840",
            link: "/docs/\u540E\u7AEF/CS/CS\u57FA\u7840/CS\u57FA\u7840/01.\u73AF\u5883\u914D\u7F6E.md",
            icon: "https://gitee.com/xarzhi/picture/raw/master/img/csharp.svg"
          },
          {
            text: "Winform",
            link: "/docs/\u540E\u7AEF/CS/Winform/Winform\u57FA\u7840/01.\u7B2C\u4E00\u4E2A\u7A97\u53E3.md",
            icon: "https://gitee.com/xarzhi/picture/raw/master/img/csharp.svg"
          },
          {
            text: "WPF",
            link: "/docs/\u540E\u7AEF/CS/WPF/01.\u73AF\u5883\u914D\u7F6E.md",
            icon: "https://gitee.com/xarzhi/picture/raw/master/img/c-plusplus.svg"
          }
        ]
      },
      {
        text: "Rust",
        items: [
          {
            text: "Rust\u57FA\u7840",
            link: "/docs/\u540E\u7AEF/Rust/Rust\u57FA\u7840/01.\u73AF\u5883\u642D\u5EFA.md",
            icon: "https://gitee.com/xarzhi/picture/raw/master/img/rust.svg"
          }
        ]
      }
    ]
  },
  {
    text: "\u5B66\u4E60git",
    link: "/docs/\u5B66\u4E60git/git"
  },
  {
    text: "\u5176\u4ED6\u95EE\u9898",
    link: "/docs/\u5176\u4ED6\u95EE\u9898/01.Typora\u4F7F\u7528PicGo\u5B9E\u73B0\u56FE\u5E8A"
  }
];
function concatenateIconToText(data) {
  data.forEach((item) => {
    const img = `<img src='${item.icon}' onerror="this.style.display='none'"/> `;
    item.text = `${img}${item.text}`;
    if (item.items && item.items.length > 0) {
      concatenateIconToText(item.items);
    }
  });
}
concatenateIconToText(nav);
var navbar_default = nav;

// docs/.vitepress/config/sidebar.js
import { join } from "path";
import { readdirSync } from "fs";
var __vite_injected_original_dirname = "C:\\Users\\22357\\Desktop\\xarzhi\\docs\\.vitepress\\config";
function isMarkdownFile(fileName) {
  return !!fileName.match(/.+\.md$/);
}
function getItems(url) {
  const path = join(__vite_injected_original_dirname, `../../${url}`);
  return readdirSync(path).filter((item) => isMarkdownFile(item)).map((fileName) => {
    if (isMarkdownFile(fileName)) {
      const text = fileName.match(/^[0-9]{2}(-|.)+/) ? fileName.substring(3) : fileName;
      const fileData = {
        text: text.replace(".md", ""),
        link: `${url}/${fileName}`
      };
      return fileData;
    }
  });
}
var sidebar = {
  "/docs/\u524D\u7AEF/\u524D\u7AEF\u4E09\u5251\u5BA2/Html/": getItems("docs/\u524D\u7AEF/\u524D\u7AEF\u4E09\u5251\u5BA2/Html"),
  "/docs/\u524D\u7AEF/\u524D\u7AEF\u4E09\u5251\u5BA2/CSS": [
    { text: "CSS", items: getItems("/docs/\u524D\u7AEF/\u524D\u7AEF\u4E09\u5251\u5BA2/CSS/CSS") },
    { text: "CSS3", items: getItems("/docs/\u524D\u7AEF/\u524D\u7AEF\u4E09\u5251\u5BA2/CSS/CSS3") },
    { text: "Scss", items: getItems("/docs/\u524D\u7AEF/\u524D\u7AEF\u4E09\u5251\u5BA2/CSS/Scss") },
    { text: "Less", items: getItems("/docs/\u524D\u7AEF/\u524D\u7AEF\u4E09\u5251\u5BA2/CSS/Less") }
  ],
  "/docs/\u524D\u7AEF/\u524D\u7AEF\u4E09\u5251\u5BA2/javascript/": [
    {
      text: "js\u57FA\u7840",
      items: getItems("/docs/\u524D\u7AEF/\u524D\u7AEF\u4E09\u5251\u5BA2/javascript/js\u57FA\u7840")
    },
    {
      text: "js\u9AD8\u7EA7",
      items: getItems("/docs/\u524D\u7AEF/\u524D\u7AEF\u4E09\u5251\u5BA2/javascript/js\u9AD8\u7EA7")
    },
    {
      text: "Web Api",
      items: getItems("/docs/\u524D\u7AEF/\u524D\u7AEF\u4E09\u5251\u5BA2/javascript/WebApi")
    }
  ],
  "/docs/\u524D\u7AEF/\u5DE5\u5177\u5E93/Gsap": [
    {
      text: "\u5FEB\u901F\u5F00\u59CB",
      items: [
        {
          text: "\u57FA\u672C\u4F7F\u7528",
          items: getItems("/docs/\u524D\u7AEF/\u5DE5\u5177\u5E93/Gsap/\u5FEB\u901F\u5F00\u59CB")
        }
      ]
    },
    {
      text: "\u57FA\u672CApi",
      items: [
        {
          text: "GSAP\u5BF9\u8C61",
          collapsed: true,
          link: "/docs/\u524D\u7AEF/\u5DE5\u5177\u5E93/Gsap/\u57FA\u7840/gsap/start",
          items: [
            {
              text: "\u5C5E\u6027",
              collapsed: true,
              items: getItems("/docs/\u524D\u7AEF/\u5DE5\u5177\u5E93/Gsap/\u57FA\u7840/gsap/properties")
            },
            {
              text: "\u65B9\u6CD5",
              collapsed: true,
              items: getItems("/docs/\u524D\u7AEF/\u5DE5\u5177\u5E93/Gsap/\u57FA\u7840/gsap/methods")
            },
            {
              text: "\u5185\u90E8\u63D2\u4EF6",
              collapsed: true,
              items: getItems(
                "/docs/\u524D\u7AEF/\u5DE5\u5177\u5E93/Gsap/\u57FA\u7840/gsap/internal-plugins"
              )
            }
          ]
        },
        {
          text: "Tween(\u8865\u95F4\u52A8\u753B)",
          collapsed: true,
          link: "/docs/\u524D\u7AEF/\u5DE5\u5177\u5E93/Gsap/\u57FA\u7840/Tween/start",
          items: [
            {
              text: "\u5C5E\u6027",
              collapsed: true,
              items: getItems("/docs/\u524D\u7AEF/\u5DE5\u5177\u5E93/Gsap/\u57FA\u7840/Tween/properties")
            },
            {
              text: "\u65B9\u6CD5",
              collapsed: true,
              items: getItems("/docs/\u524D\u7AEF/\u5DE5\u5177\u5E93/Gsap/\u57FA\u7840/Tween/methods")
            }
          ]
        },
        {
          text: "Timeline(\u65F6\u95F4\u7EBF)",
          collapsed: true,
          link: "/docs/\u524D\u7AEF/\u5DE5\u5177\u5E93/Gsap/\u57FA\u7840/Timeline/start",
          items: [
            {
              text: "\u5C5E\u6027",
              collapsed: true,
              items: getItems(
                "/docs/\u524D\u7AEF/\u5DE5\u5177\u5E93/Gsap/\u57FA\u7840/Timeline/properties"
              )
            },
            {
              text: "\u65B9\u6CD5",
              collapsed: true,
              items: getItems("/docs/\u524D\u7AEF/\u5DE5\u5177\u5E93/Gsap/\u57FA\u7840/Timeline/methods")
            }
          ]
        },
        {
          text: "CSS",
          collapsed: false,
          link: "/docs/\u524D\u7AEF/\u5DE5\u5177\u5E93/Gsap/\u57FA\u7840/Css/start"
        },
        {
          text: "Easing",
          collapsed: true,
          items: getItems("/docs/\u524D\u7AEF/\u5DE5\u5177\u5E93/Gsap/\u57FA\u7840/Easing")
        }
      ]
    },
    {
      text: "\u63D2\u4EF6",
      link: "/docs/\u524D\u7AEF/\u5DE5\u5177\u5E93/Gsap/\u63D2\u4EF6/start",
      items: getItems("/docs/\u524D\u7AEF/\u5DE5\u5177\u5E93/Gsap/\u63D2\u4EF6/plugins"),
      collapsed: true
    },
    {
      text: "\u7279\u5F81\u548C\u5DE5\u5177",
      items: getItems("/docs/\u524D\u7AEF/\u5DE5\u5177\u5E93/Gsap/\u7279\u5F81\u548C\u5DE5\u5177"),
      collapsed: true
    }
  ],
  "/docs/\u524D\u7AEF/\u6846\u67B6/Vue/Vue2/": [
    { text: "Vue2\u57FA\u7840", items: getItems("/docs/\u524D\u7AEF/\u6846\u67B6/Vue/Vue2/Vue2\u57FA\u7840") },
    { text: "Vue2\u8FDB\u9636", items: getItems("/docs/\u524D\u7AEF/\u6846\u67B6/Vue/Vue2/Vue2\u8FDB\u9636") }
  ],
  "/docs/\u524D\u7AEF/\u6846\u67B6/Vue/Vue3/": [
    { text: "Vue3\u57FA\u7840", items: getItems("/docs/\u524D\u7AEF/\u6846\u67B6/Vue/Vue3/Vue3\u57FA\u7840") },
    {
      text: "\u7EC4\u5408\u5F0FApi",
      items: getItems("/docs/\u524D\u7AEF/\u6846\u67B6/Vue/Vue3/\u7EC4\u5408\u5F0FApi")
    },
    {
      text: "Vue3\u8FDB\u9636",
      items: getItems("/docs/\u524D\u7AEF/\u6846\u67B6/Vue/Vue3/Vue3\u8FDB\u9636"),
      collapsed: true
    },
    {
      text: "\u5185\u7F6E\u7EC4\u4EF6",
      items: getItems("/docs/\u524D\u7AEF/\u6846\u67B6/Vue/Vue3/\u5185\u7F6E\u7EC4\u4EF6"),
      collapsed: true
    },
    {
      text: "\u5F00\u53D1\u7EC4\u4EF6\u5E93",
      items: getItems("/docs/\u524D\u7AEF/\u6846\u67B6/Vue/Vue3/\u5F00\u53D1\u7EC4\u4EF6\u5E93"),
      collapsed: true
    }
  ],
  "/docs/\u524D\u7AEF/TypeScript/Ts\u5165\u95E8/": [
    { text: "Ts\u5165\u95E8", items: getItems("/docs/\u524D\u7AEF/TypeScript/Ts\u5165\u95E8") }
  ],
  "/docs/\u524D\u7AEF/\u6846\u67B6/React/": getItems("/docs/\u524D\u7AEF/\u6846\u67B6/React"),
  "/docs/\u524D\u7AEF/\u53EF\u89C6\u5316/Canvas/": getItems("/docs/\u524D\u7AEF/\u53EF\u89C6\u5316/Canvas"),
  "/docs/\u524D\u7AEF/\u53EF\u89C6\u5316/WebGL/": getItems("/docs/\u524D\u7AEF/\u53EF\u89C6\u5316/WebGL"),
  "/docs/\u524D\u7AEF/\u53EF\u89C6\u5316/Three.js/": [
    {
      text: "\u57FA\u672C\u4F7F\u7528",
      items: getItems("/docs/\u524D\u7AEF/\u53EF\u89C6\u5316/Three.js/\u57FA\u672C\u4F7F\u7528")
    },
    {
      text: "\u51E0\u4F55\u4F53",
      items: getItems("/docs/\u524D\u7AEF/\u53EF\u89C6\u5316/Three.js/\u51E0\u4F55\u4F53"),
      collapsed: true
    },
    {
      text: "\u6750\u8D28",
      items: getItems("/docs/\u524D\u7AEF/\u53EF\u89C6\u5316/Three.js/\u6750\u8D28"),
      collapsed: true
    },
    {
      text: "\u7269\u4F53",
      items: getItems("/docs/\u524D\u7AEF/\u53EF\u89C6\u5316/Three.js/\u7269\u4F53"),
      collapsed: true
    },
    {
      text: "\u7EB9\u7406\u8D34\u56FE",
      items: getItems("/docs/\u524D\u7AEF/\u53EF\u89C6\u5316/Three.js/\u7EB9\u7406\u8D34\u56FE"),
      collapsed: true
    },
    {
      text: "\u5149\u6E90",
      items: getItems("/docs/\u524D\u7AEF/\u53EF\u89C6\u5316/Three.js/\u5149\u6E90"),
      collapsed: true
    },
    {
      text: "\u9634\u5F71",
      items: getItems("/docs/\u524D\u7AEF/\u53EF\u89C6\u5316/Three.js/\u9634\u5F71"),
      collapsed: true
    },
    {
      text: "\u573A\u666F",
      items: getItems("/docs/\u524D\u7AEF/\u53EF\u89C6\u5316/Three.js/\u573A\u666F"),
      collapsed: true
    },
    {
      text: "\u63A7\u5236\u5668",
      items: getItems("/docs/\u524D\u7AEF/\u53EF\u89C6\u5316/Three.js/\u63A7\u5236\u5668"),
      collapsed: true
    },
    {
      text: "\u8F85\u52A9\u5BF9\u8C61",
      items: getItems("/docs/\u524D\u7AEF/\u53EF\u89C6\u5316/Three.js/\u8F85\u52A9\u5BF9\u8C61"),
      collapsed: true
    },
    {
      text: "\u6444\u50CF\u673A",
      items: getItems("/docs/\u524D\u7AEF/\u53EF\u89C6\u5316/Three.js/\u6444\u50CF\u673A"),
      collapsed: true
    },
    {
      text: "\u52A0\u8F7D\u5668",
      items: getItems("/docs/\u524D\u7AEF/\u53EF\u89C6\u5316/Three.js/\u52A0\u8F7D\u5668"),
      collapsed: true
    },
    {
      text: "\u6838\u5FC3",
      items: getItems("/docs/\u524D\u7AEF/\u53EF\u89C6\u5316/Three.js/\u6838\u5FC3"),
      collapsed: true
    },
    {
      text: "\u6570\u5B66\u5E93",
      items: getItems("/docs/\u524D\u7AEF/\u53EF\u89C6\u5316/Three.js/\u6570\u5B66\u5E93"),
      collapsed: true
    },
    {
      text: "\u5E38\u91CF",
      items: getItems("/docs/\u524D\u7AEF/\u53EF\u89C6\u5316/Three.js/\u5E38\u91CF"),
      collapsed: true
    }
  ],
  "/docs/\u540E\u7AEF/C++/C++\u57FA\u7840": [
    { text: "C++\u57FA\u7840", items: getItems("/docs/\u540E\u7AEF/C++/C++\u57FA\u7840/C++\u57FA\u7840") },
    { text: "C++\u8FDB\u9636", items: getItems("/docs/\u540E\u7AEF/C++/C++\u57FA\u7840/C++\u8FDB\u9636") },
    { text: "\u9762\u5411\u5BF9\u8C61", items: getItems("/docs/\u540E\u7AEF/C++/C++\u57FA\u7840/\u9762\u5411\u5BF9\u8C61") },
    { text: "STL", items: getItems("/docs/\u540E\u7AEF/C++/C++\u57FA\u7840/STL") }
  ],
  "/docs/\u540E\u7AEF/CS/CS\u57FA\u7840": [
    { text: "CS\u57FA\u7840", items: getItems("/docs/\u540E\u7AEF/CS/CS\u57FA\u7840/CS\u57FA\u7840") },
    { text: "CS\u9AD8\u7EA7", items: getItems("/docs/\u540E\u7AEF/CS/CS\u57FA\u7840/CS\u9AD8\u7EA7") },
    { text: "\u9762\u5411\u5BF9\u8C61", items: getItems("/docs/\u540E\u7AEF/CS/CS\u57FA\u7840/\u9762\u5411\u5BF9\u8C61") }
  ],
  "/docs/\u540E\u7AEF/CS/WPF": [
    { text: "WPF\u57FA\u7840", items: getItems("/docs/\u540E\u7AEF/CS/WPF") }
  ],
  "/docs/\u540E\u7AEF/CS/Winform": [
    {
      text: "Winform\u57FA\u7840",
      items: getItems("/docs/\u540E\u7AEF/CS/Winform/Winform\u57FA\u7840")
    },
    {
      text: "\u5E38\u7528\u63A7\u4EF6",
      items: getItems("/docs/\u540E\u7AEF/CS/Winform/\u5E38\u7528\u63A7\u4EF6")
    }
  ],
  "/docs/\u540E\u7AEF/C++/Win32": [
    { text: "Win32", items: getItems("/docs/\u540E\u7AEF/C++/Win32") }
  ],
  "/docs/\u540E\u7AEF/C++/MFC": [
    { text: "MFC\u57FA\u7840", items: getItems("/docs/\u540E\u7AEF/C++/MFC/MFC\u57FA\u7840") },
    { text: "\u5E38\u7528\u63A7\u4EF6", items: getItems("/docs/\u540E\u7AEF/C++/MFC/\u5E38\u7528\u63A7\u4EF6") },
    { text: "\u5E38\u7528\u7C7B", items: getItems("/docs/\u540E\u7AEF/C++/MFC/\u5E38\u7528\u7C7B") }
  ],
  "/docs/\u524D\u7AEF/\u5C0F\u7A0B\u5E8F/": getItems("/docs/\u524D\u7AEF/\u5C0F\u7A0B\u5E8F"),
  "/docs/\u540E\u7AEF/Node.js/": getItems("/docs/\u540E\u7AEF/Node.js/"),
  "/docs/\u524D\u7AEF/\u4E00\u4E9B\u95EE\u9898/": getItems("/docs/\u524D\u7AEF/\u4E00\u4E9B\u95EE\u9898/"),
  "/docs/\u5176\u4ED6\u95EE\u9898": getItems("/docs/\u5176\u4ED6\u95EE\u9898"),
  "/docs/\u540E\u7AEF/Rust": [
    { text: "Rust\u57FA\u7840", items: getItems("/docs/\u540E\u7AEF/Rust/Rust\u57FA\u7840") },
    { text: "\u6807\u91CF\u7C7B\u578B", items: getItems("/docs/\u540E\u7AEF/Rust/\u6807\u91CF\u7C7B\u578B"), collapsed: true },
    { text: "\u6DF1\u5165\u7C7B\u578B", items: getItems("/docs/\u540E\u7AEF/Rust/\u6DF1\u5165\u7C7B\u578B") },
    {
      text: "\u590D\u5408\u7C7B\u578B",
      collapsed: true,
      items: [
        { text: "\u5143\u7EC4", link: "/docs/\u540E\u7AEF/Rust/\u590D\u5408\u7C7B\u578B/\u5143\u7EC4Tuple/index" },
        { text: "\u6570\u7EC4", link: "/docs/\u540E\u7AEF/Rust/\u590D\u5408\u7C7B\u578B/\u6570\u7EC4Array/index" },
        { text: "\u7ED3\u6784\u4F53", link: "/docs/\u540E\u7AEF/Rust/\u590D\u5408\u7C7B\u578B/\u7ED3\u6784\u4F53Struct/index" },
        { text: "\u679A\u4E3E", link: "/docs/\u540E\u7AEF/Rust/\u590D\u5408\u7C7B\u578B/\u679A\u4E3EEnum/index", items: getItems("/docs/\u540E\u7AEF/Rust/\u590D\u5408\u7C7B\u578B/\u679A\u4E3EEnum/docs"), collapsed: true },
        { text: "\u8054\u5408\u4F53", link: "/docs/\u540E\u7AEF/Rust/\u590D\u5408\u7C7B\u578B/\u8054\u5408\u4F53Union/index" },
        { text: "\u5B57\u7B26\u4E32", link: "/docs/\u540E\u7AEF/Rust/\u590D\u5408\u7C7B\u578B/\u5B57\u7B26\u4E32String/index", items: getItems("/docs/\u540E\u7AEF/Rust/\u590D\u5408\u7C7B\u578B/\u5B57\u7B26\u4E32String/docs"), collapsed: true }
      ]
    },
    { text: "\u6A21\u5F0F\u5339\u914D", items: getItems("/docs/\u540E\u7AEF/Rust/\u6A21\u5F0F\u5339\u914D"), collapsed: true },
    { text: "\u6240\u6709\u6743", items: getItems("/docs/\u540E\u7AEF/Rust/Rust\u8FDB\u9636/\u6240\u6709\u6743"), collapsed: true },
    {
      text: "\u96C6\u5408\u7C7B\u578B",
      collapsed: true,
      items: [
        { text: "Vector", items: getItems("/docs/\u540E\u7AEF/Rust/\u96C6\u5408\u7C7B\u578B/Vector"), collapsed: true },
        { text: "HashMap", items: getItems("/docs/\u540E\u7AEF/Rust/\u96C6\u5408\u7C7B\u578B/HashMap"), collapsed: true }
      ]
    },
    {
      text: "Rust\u8FDB\u9636",
      collapsed: true,
      items: [
        { text: "\u6CDB\u578B", items: getItems("/docs/\u540E\u7AEF/Rust/Rust\u8FDB\u9636/\u6CDB\u578B"), collapsed: true },
        { text: "Trait", items: getItems("/docs/\u540E\u7AEF/Rust/Rust\u8FDB\u9636/Trait"), collapsed: true },
        { text: "\u751F\u547D\u5468\u671F", items: getItems("/docs/\u540E\u7AEF/Rust/Rust\u8FDB\u9636/\u751F\u547D\u5468\u671F"), collapsed: true },
        { text: "\u5305\u548C\u6A21\u5757", items: getItems("/docs/\u540E\u7AEF/Rust/Rust\u8FDB\u9636/\u5305\u548C\u6A21\u5757"), collapsed: true },
        { text: "\u5B8F", items: getItems("/docs/\u540E\u7AEF/Rust/Rust\u8FDB\u9636/\u5B8F"), collapsed: true },
        { text: "\u95ED\u5305", items: getItems("/docs/\u540E\u7AEF/Rust/Rust\u8FDB\u9636/\u95ED\u5305"), collapsed: true }
      ]
    }
  ]
};
for (let key in sidebar) {
  if (Array.isArray(sidebar[key])) {
    sidebar[key] = sidebar[key].map((item) => {
      return {
        ...item,
        collapsed: item.collapsed || false
      };
    });
  }
}
var sidebar_default = sidebar;

// docs/.vitepress/config.mjs
import timeline from "file:///C:/Users/22357/Desktop/xarzhi/node_modules/vitepress-markdown-timeline/dist/cjs/index.cjs.js";
var config = defineConfig({
  base: "/",
  head: [
    [
      "meta",
      {
        name: "referrer",
        content: "no-referrer"
      }
    ],
    ["link", { rel: "icon", href: "/logo.png" }],
    [
      "meta",
      { name: "algolia-site-verification", content: "2468E82FC5CF0E3F" }
    ]
  ],
  title: "Fade away",
  description: "\u82B1\u6709\u91CD\u5F00\u65E5\uFF0C\u4EBA\u65E0\u5728\u5C11\u5E74",
  lastUpdated: true,
  markdown: {
    math: true,
    lineNumbers: true,
    // 显示行号
    image: {
      // lazyLoading: true,  // 图片懒加载
    },
    //时间线
    config: (md) => {
      md.use(timeline);
    }
  },
  themeConfig: {
    nav: navbar_default,
    sidebar: sidebar_default,
    outline: {
      //level: [2, 3, 4, 5], // 显示2-4级标题
      level: "deep",
      // 显示2-4级标题
      label: "\u5F53\u524D\u9875\u5927\u7EB2"
      // 文字显示
    },
    logo: "/logo.png",
    // 本地搜索
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "\u641C\u7D22\u6587\u6863",
            buttonAriaLabel: "\u641C\u7D22\u6587\u6863"
          },
          modal: {
            noResultsText: "\u65E0\u6CD5\u627E\u5230\u76F8\u5173\u7ED3\u679C",
            resetButtonTitle: "\u6E05\u9664\u67E5\u8BE2\u6761\u4EF6",
            footer: {
              selectText: "\u9009\u62E9",
              navigateText: "\u5207\u6362"
            }
          }
        }
      }
    },
    //上次更新时间
    lastUpdated: {
      text: "\u4E0A\u6B21\u66F4\u65B0\u65F6\u95F4",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium"
      }
    },
    //自定义上下页名
    docFooter: {
      prev: "\u4E0A\u4E00\u9875",
      next: "\u4E0B\u4E00\u9875"
    },
    //markdown配置
    socialLinks: [
      { icon: "github", link: "https://github.com/xarzhi/xarzhi.github.io" }
    ],
    footer: {
      message: "MIT Licensed",
      copyright: "Copyright \xA9 2024-present xarzhi"
    },
    lightModeSwitchTitle: "\u5207\u6362\u81F3\u6DF1\u8272\u6A21\u5F0F",
    darkModeSwitchTitle: "\u5207\u6362\u81F3\u6D45\u8272\u6A21\u5F0F"
  }
});
var config_default = config;
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tanMiLCAiZG9jcy8udml0ZXByZXNzL2NvbmZpZy9uYXZiYXIuanMiLCAiZG9jcy8udml0ZXByZXNzL2NvbmZpZy9zaWRlYmFyLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcMjIzNTdcXFxcRGVza3RvcFxcXFx4YXJ6aGlcXFxcZG9jc1xcXFwudml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwyMjM1N1xcXFxEZXNrdG9wXFxcXHhhcnpoaVxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnLm1qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvMjIzNTcvRGVza3RvcC94YXJ6aGkvZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgbmF2YmFyIGZyb20gXCIuL2NvbmZpZy9uYXZiYXJcIjtcclxuaW1wb3J0IHNpZGViYXIgZnJvbSBcIi4vY29uZmlnL3NpZGViYXJcIjtcclxuaW1wb3J0IHRpbWVsaW5lIGZyb20gXCJ2aXRlcHJlc3MtbWFya2Rvd24tdGltZWxpbmVcIjtcclxuXHJcbmNvbnN0IGNvbmZpZyA9IGRlZmluZUNvbmZpZyh7XHJcbiAgYmFzZTogXCIvXCIsXHJcbiAgaGVhZDogW1xyXG4gICAgW1xyXG4gICAgICBcIm1ldGFcIixcclxuICAgICAge1xyXG4gICAgICAgIG5hbWU6IFwicmVmZXJyZXJcIixcclxuICAgICAgICBjb250ZW50OiBcIm5vLXJlZmVycmVyXCIsXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gICAgW1wibGlua1wiLCB7IHJlbDogXCJpY29uXCIsIGhyZWY6IFwiL2xvZ28ucG5nXCIgfV0sXHJcbiAgICBbXHJcbiAgICAgIFwibWV0YVwiLFxyXG4gICAgICB7IG5hbWU6IFwiYWxnb2xpYS1zaXRlLXZlcmlmaWNhdGlvblwiLCBjb250ZW50OiBcIjI0NjhFODJGQzVDRjBFM0ZcIiB9LFxyXG4gICAgXSxcclxuICBdLFxyXG4gIHRpdGxlOiBcIkZhZGUgYXdheVwiLFxyXG4gIGRlc2NyaXB0aW9uOiBcIlx1ODJCMVx1NjcwOVx1OTFDRFx1NUYwMFx1NjVFNVx1RkYwQ1x1NEVCQVx1NjVFMFx1NTcyOFx1NUMxMVx1NUU3NFwiLFxyXG4gIGxhc3RVcGRhdGVkOiB0cnVlLFxyXG4gIG1hcmtkb3duOiB7XHJcbiAgICBtYXRoOiB0cnVlLFxyXG4gICAgbGluZU51bWJlcnM6IHRydWUsIC8vIFx1NjYzRVx1NzkzQVx1ODg0Q1x1NTNGN1xyXG4gICAgaW1hZ2U6IHtcclxuICAgICAgLy8gbGF6eUxvYWRpbmc6IHRydWUsICAvLyBcdTU2RkVcdTcyNDdcdTYxRDJcdTUyQTBcdThGN0RcclxuICAgIH0sXHJcblxyXG4gICAgLy9cdTY1RjZcdTk1RjRcdTdFQkZcclxuICAgIGNvbmZpZzogKG1kKSA9PiB7XHJcbiAgICAgIG1kLnVzZSh0aW1lbGluZSk7XHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIHRoZW1lQ29uZmlnOiB7XHJcbiAgICBuYXY6IG5hdmJhcixcclxuICAgIHNpZGViYXI6IHNpZGViYXIsXHJcbiAgICBvdXRsaW5lOiB7XHJcbiAgICAgIC8vbGV2ZWw6IFsyLCAzLCA0LCA1XSwgLy8gXHU2NjNFXHU3OTNBMi00XHU3RUE3XHU2ODA3XHU5ODk4XHJcbiAgICAgIGxldmVsOiBcImRlZXBcIiwgLy8gXHU2NjNFXHU3OTNBMi00XHU3RUE3XHU2ODA3XHU5ODk4XHJcbiAgICAgIGxhYmVsOiBcIlx1NUY1M1x1NTI0RFx1OTg3NVx1NTkyN1x1N0VCMlwiLCAvLyBcdTY1ODdcdTVCNTdcdTY2M0VcdTc5M0FcclxuICAgIH0sXHJcbiAgICBsb2dvOiBcIi9sb2dvLnBuZ1wiLFxyXG4gICAgLy8gXHU2NzJDXHU1NzMwXHU2NDFDXHU3RDIyXHJcbiAgICBzZWFyY2g6IHtcclxuICAgICAgcHJvdmlkZXI6IFwibG9jYWxcIixcclxuICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgIHRyYW5zbGF0aW9uczoge1xyXG4gICAgICAgICAgYnV0dG9uOiB7XHJcbiAgICAgICAgICAgIGJ1dHRvblRleHQ6IFwiXHU2NDFDXHU3RDIyXHU2NTg3XHU2ODYzXCIsXHJcbiAgICAgICAgICAgIGJ1dHRvbkFyaWFMYWJlbDogXCJcdTY0MUNcdTdEMjJcdTY1ODdcdTY4NjNcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBtb2RhbDoge1xyXG4gICAgICAgICAgICBub1Jlc3VsdHNUZXh0OiBcIlx1NjVFMFx1NkNENVx1NjI3RVx1NTIzMFx1NzZGOFx1NTE3M1x1N0VEM1x1Njc5Q1wiLFxyXG4gICAgICAgICAgICByZXNldEJ1dHRvblRpdGxlOiBcIlx1NkUwNVx1OTY2NFx1NjdFNVx1OEJFMlx1Njc2MVx1NEVGNlwiLFxyXG4gICAgICAgICAgICBmb290ZXI6IHtcclxuICAgICAgICAgICAgICBzZWxlY3RUZXh0OiBcIlx1OTAwOVx1NjJFOVwiLFxyXG4gICAgICAgICAgICAgIG5hdmlnYXRlVGV4dDogXCJcdTUyMDdcdTYzNjJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICAvL1x1NEUwQVx1NkIyMVx1NjZGNFx1NjVCMFx1NjVGNlx1OTVGNFxyXG4gICAgbGFzdFVwZGF0ZWQ6IHtcclxuICAgICAgdGV4dDogXCJcdTRFMEFcdTZCMjFcdTY2RjRcdTY1QjBcdTY1RjZcdTk1RjRcIixcclxuICAgICAgZm9ybWF0T3B0aW9uczoge1xyXG4gICAgICAgIGRhdGVTdHlsZTogXCJmdWxsXCIsXHJcbiAgICAgICAgdGltZVN0eWxlOiBcIm1lZGl1bVwiLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIC8vXHU4MUVBXHU1QjlBXHU0RTQ5XHU0RTBBXHU0RTBCXHU5ODc1XHU1NDBEXHJcbiAgICBkb2NGb290ZXI6IHtcclxuICAgICAgcHJldjogXCJcdTRFMEFcdTRFMDBcdTk4NzVcIixcclxuICAgICAgbmV4dDogXCJcdTRFMEJcdTRFMDBcdTk4NzVcIixcclxuICAgIH0sXHJcbiAgICAvL21hcmtkb3duXHU5MTREXHU3RjZFXHJcblxyXG4gICAgc29jaWFsTGlua3M6IFtcclxuICAgICAgeyBpY29uOiBcImdpdGh1YlwiLCBsaW5rOiBcImh0dHBzOi8vZ2l0aHViLmNvbS94YXJ6aGkveGFyemhpLmdpdGh1Yi5pb1wiIH0sXHJcbiAgICBdLFxyXG4gICAgZm9vdGVyOiB7XHJcbiAgICAgIG1lc3NhZ2U6IFwiTUlUIExpY2Vuc2VkXCIsXHJcbiAgICAgIGNvcHlyaWdodDogXCJDb3B5cmlnaHQgXHUwMEE5IDIwMjQtcHJlc2VudCB4YXJ6aGlcIixcclxuICAgIH0sXHJcbiAgICBsaWdodE1vZGVTd2l0Y2hUaXRsZTogXCJcdTUyMDdcdTYzNjJcdTgxRjNcdTZERjFcdTgyNzJcdTZBMjFcdTVGMEZcIixcclxuICAgIGRhcmtNb2RlU3dpdGNoVGl0bGU6IFwiXHU1MjA3XHU2MzYyXHU4MUYzXHU2RDQ1XHU4MjcyXHU2QTIxXHU1RjBGXCIsXHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcMjIzNTdcXFxcRGVza3RvcFxcXFx4YXJ6aGlcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcMjIzNTdcXFxcRGVza3RvcFxcXFx4YXJ6aGlcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFxuYXZiYXIuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLzIyMzU3L0Rlc2t0b3AveGFyemhpL2RvY3MvLnZpdGVwcmVzcy9jb25maWcvbmF2YmFyLmpzXCI7Y29uc3QgbmF2ID0gW1xyXG4gIHtcclxuICAgIHRleHQ6IFwiXHU1MjREXHU3QUVGXCIsXHJcbiAgICBpdGVtczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogXCJcdTUyNERcdTdBRUZcdTRFMDlcdTUyNTFcdTVCQTJcIixcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0OiBcIkh0bWxcIixcclxuICAgICAgICAgICAgbGluazogXCIvZG9jcy9cdTUyNERcdTdBRUYvXHU1MjREXHU3QUVGXHU0RTA5XHU1MjUxXHU1QkEyL0h0bWwvMDEuSHRtbFx1NTIxRFx1OEJDNlwiLFxyXG4gICAgICAgICAgICBpY29uOiBcImh0dHBzOi8vZ2l0ZWUuY29tL3hhcnpoaS9waWN0dXJlL3Jhdy9tYXN0ZXIvaW1nL2h0bWw1LnN2Z1wiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdGV4dDogXCJDU1NcIixcclxuICAgICAgICAgICAgbGluazogXCIvZG9jcy9cdTUyNERcdTdBRUYvXHU1MjREXHU3QUVGXHU0RTA5XHU1MjUxXHU1QkEyL0NTUy9DU1MvMDEuXHU1RjE1XHU1MTY1Y3NzXHU2ODM3XHU1RjBGXHU4ODY4XCIsXHJcbiAgICAgICAgICAgIGljb246IFwiaHR0cHM6Ly9naXRlZS5jb20veGFyemhpL3BpY3R1cmUvcmF3L21hc3Rlci9pbWcvY3NzX29sZC5zdmdcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6IFwiSmF2YVNjcmlwdFwiLFxyXG4gICAgICAgICAgICBsaW5rOiBcIi9kb2NzL1x1NTI0RFx1N0FFRi9cdTUyNERcdTdBRUZcdTRFMDlcdTUyNTFcdTVCQTIvamF2YXNjcmlwdC9qc1x1NTdGQVx1Nzg0MC8wMS5qc1x1NTdGQVx1Nzg0MFx1OEJFRFx1NkNENVwiLFxyXG4gICAgICAgICAgICBpY29uOiBcImh0dHBzOi8vZ2l0ZWUuY29tL3hhcnpoaS9waWN0dXJlL3Jhdy9tYXN0ZXIvaW1nL2phdmFzY3JpcHQuc3ZnXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiBcIlR5cGVTY3JpcHRcIixcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0OiBcIlRzXHU1MTY1XHU5NUU4XCIsXHJcbiAgICAgICAgICAgIGxpbms6IFwiL2RvY3MvXHU1MjREXHU3QUVGL1R5cGVTY3JpcHQvVHNcdTUxNjVcdTk1RTgvMDEuXHU1N0ZBXHU2NzJDXHU5MTREXHU3RjZFXCIsXHJcbiAgICAgICAgICAgIGljb246IFwiaHR0cHM6Ly9naXRlZS5jb20veGFyemhpL3BpY3R1cmUvcmF3L21hc3Rlci9pbWcvdHlwZXNjcmlwdC5zdmdcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6IFwiVnVlXCIsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdGV4dDogXCJWdWUyXCIsXHJcbiAgICAgICAgICAgIGxpbms6IFwiL2RvY3MvXHU1MjREXHU3QUVGL1x1Njg0Nlx1NjdCNi9WdWUvVnVlMi9WdWUyXHU1N0ZBXHU3ODQwLzAxLlZ1ZTJcdTU3RkFcdTc4NDBcIixcclxuICAgICAgICAgICAgaWNvbjogXCJodHRwczovL2NuLnZ1ZWpzLm9yZy9sb2dvLnN2Z1wiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdGV4dDogXCJWdWUzXCIsXHJcbiAgICAgICAgICAgIGxpbms6IFwiL2RvY3MvXHU1MjREXHU3QUVGL1x1Njg0Nlx1NjdCNi9WdWUvVnVlMy9WdWUzXHU1N0ZBXHU3ODQwLzAxLlZ1ZTNcdTU3RkFcdTc4NDBcIixcclxuICAgICAgICAgICAgaWNvbjogXCJodHRwczovL2NuLnZ1ZWpzLm9yZy9sb2dvLnN2Z1wiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogXCJSZWFjdFwiLFxyXG4gICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6IFwiUmVhY3RcIixcclxuICAgICAgICAgICAgbGluazogXCIvZG9jcy9cdTUyNERcdTdBRUYvXHU2ODQ2XHU2N0I2L1JlYWN0LzAxLlJlYWN0XHU1MTY1XHU5NUU4XCIsXHJcbiAgICAgICAgICAgIGljb246IFwiaHR0cHM6Ly9naXRlZS5jb20veGFyemhpL3BpY3R1cmUvcmF3L21hc3Rlci9pbWcvcmVhY3RfbGlnaHQuc3ZnXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogXCJcdTVDMEZcdTdBMEJcdTVFOEZcIixcclxuICAgICAgICBsaW5rOiBcIi9kb2NzL1x1NTI0RFx1N0FFRi9cdTVDMEZcdTdBMEJcdTVFOEYvMDEubWluYS5tZFwiLFxyXG4gICAgICAgIGljb246IFwiaHR0cHM6Ly9naXRlZS5jb20veGFyemhpL3BpY3R1cmUvcmF3L21hc3Rlci9pbWcvdW5pLnBuZ1wiLFxyXG4gICAgICB9LFxyXG5cclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6IFwiXHVEODNFXHVEREVEXHU0RTAwXHU0RTlCXHU5NUVFXHU5ODk4XCIsXHJcbiAgICAgICAgbGluazogXCIvZG9jcy9cdTUyNERcdTdBRUYvXHU0RTAwXHU0RTlCXHU5NUVFXHU5ODk4LzAxLlx1NTQwRVx1N0FFRlx1OEZENFx1NTZERTEwXHU0RTA3XHU2NzYxXHU2NTcwXHU2MzZFLm1kXCIsXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgdGV4dDogXCJcdTUzRUZcdTg5QzZcdTUzMTZcIixcclxuICAgIGl0ZW1zOiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiBcIkNhbnZhc1wiLFxyXG4gICAgICAgIGxpbms6IFwiL2RvY3MvXHU1MjREXHU3QUVGL1x1NTNFRlx1ODlDNlx1NTMxNi9DYW52YXMvMDEuXHU4QkE0XHU4QkM2Q2FudmFzXCIsXHJcbiAgICAgICAgaWNvbjogXCJodHRwczovL2dpdGVlLmNvbS94YXJ6aGkvcGljdHVyZS9yYXcvbWFzdGVyL2ltZy9jYW52YS5zdmdcIixcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6IFwiVGhyZWVqc1wiLFxyXG4gICAgICAgIGxpbms6IFwiL2RvY3MvXHU1MjREXHU3QUVGL1x1NTNFRlx1ODlDNlx1NTMxNi9UaHJlZS5qcy9cdTU3RkFcdTY3MkNcdTRGN0ZcdTc1MjgvMDEuXHU1Qjg5XHU4OEM1dGhyZWVqc1wiLFxyXG4gICAgICAgIGljb246IFwiaHR0cHM6Ly9naXRlZS5jb20veGFyemhpL3BpY3R1cmUvcmF3L21hc3Rlci9pbWcvdGhyZWVqcy1saWdodC5zdmdcIixcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6IFwiV2ViR2xcIixcclxuICAgICAgICBsaW5rOiBcIi9kb2NzL1x1NTI0RFx1N0FFRi9cdTUzRUZcdTg5QzZcdTUzMTYvV2ViR0wvMDEuV2ViR0xcdTU3RkFcdTc4NDBcIixcclxuICAgICAgICBpY29uOiBcImh0dHBzOi8vZ2l0ZWUuY29tL3hhcnpoaS9waWN0dXJlL3Jhdy9tYXN0ZXIvaW1nL3RocmVlanMtbGlnaHQuc3ZnXCIsXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgdGV4dDogXCJcdTVERTVcdTUxNzdcdTVFOTNcIixcclxuICAgIGl0ZW1zOiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiBcIkdzYXBcIixcclxuICAgICAgICBsaW5rOiBcIi9kb2NzL1x1NTI0RFx1N0FFRi9cdTVERTVcdTUxNzdcdTVFOTMvR3NhcC9cdTVGRUJcdTkwMUZcdTVGMDBcdTU5Q0IvMDEuXHU1Qjg5XHU4OEM1Lm1kXCIsXHJcbiAgICAgICAgaWNvbjogXCJodHRwczovL2dpdGVlLmNvbS94YXJ6aGkvcGljdHVyZS9yYXcvbWFzdGVyL2ltZy9nc2FwLnBuZ1wiLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICB9LFxyXG4gIHtcclxuICAgIHRleHQ6IFwiXHU2MjUzXHU1MzA1XHU1REU1XHU1MTc3XCIsXHJcbiAgICBpdGVtczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogXCJXZWJwYWNrXCIsXHJcbiAgICAgICAgbGluazogXCIvZG9jcy9cdTUyNERcdTdBRUYvV2VicGFjay8wMS5XZWJwYWNrXHU1N0ZBXHU3ODQwLm1kXCIsXHJcbiAgICAgICAgaWNvbjogXCJodHRwczovL2dpdGVlLmNvbS94YXJ6aGkvcGljdHVyZS9yYXcvbWFzdGVyL2ltZy93ZWJwYWNrLnBuZ1wiLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICB9LFxyXG4gIHtcclxuICAgIHRleHQ6IFwiXHU1NDBFXHU3QUVGXCIsXHJcbiAgICBpdGVtczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogXCJOb2RlLmpzXCIsXHJcbiAgICAgICAgbGluazogXCIvZG9jcy9cdTU0MEVcdTdBRUYvTm9kZS5qcy8wMS5cdTUyMURcdThCQzZOb2RlLmpzXCIsXHJcbiAgICAgICAgaWNvbjogXCJodHRwczovL2dpdGVlLmNvbS94YXJ6aGkvcGljdHVyZS9yYXcvbWFzdGVyL2ltZy9ub2RlanMucG5nXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiBcIkMrK1wiLFxyXG4gICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6IFwiQysrXHU1N0ZBXHU3ODQwXCIsXHJcbiAgICAgICAgICAgIGxpbms6IFwiL2RvY3MvXHU1NDBFXHU3QUVGL0MrKy9DKytcdTU3RkFcdTc4NDAvQysrXHU1N0ZBXHU3ODQwLzAxLlx1NzNBRlx1NTg4M1x1OTE0RFx1N0Y2RS5tZFwiLFxyXG4gICAgICAgICAgICBpY29uOiBcImh0dHBzOi8vZ2l0ZWUuY29tL3hhcnpoaS9waWN0dXJlL3Jhdy9tYXN0ZXIvaW1nL2MtcGx1c3BsdXMuc3ZnXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0OiBcIlFUXCIsXHJcbiAgICAgICAgICAgIGxpbms6IFwiL2RvY3MvXHU1NDBFXHU3QUVGL0MrKy9DKytcdTU3RkFcdTc4NDAvMDEuXHU3M0FGXHU1ODgzXHU5MTREXHU3RjZFLm1kXCIsXHJcbiAgICAgICAgICAgIGljb246IFwiaHR0cHM6Ly9naXRlZS5jb20veGFyemhpL3BpY3R1cmUvcmF3L21hc3Rlci9pbWcvcXQuc3ZnXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0OiBcIldpbjMyIGFwaVwiLFxyXG4gICAgICAgICAgICBsaW5rOiBcIi9kb2NzL1x1NTQwRVx1N0FFRi9DKysvV2luMzIvMDEuXHU1N0ZBXHU3ODQwXHU3N0U1XHU4QkM2Lm1kXCIsXHJcbiAgICAgICAgICAgIGljb246IFwiaHR0cHM6Ly9naXRlZS5jb20veGFyemhpL3BpY3R1cmUvcmF3L21hc3Rlci9pbWcvYy1wbHVzcGx1cy5zdmdcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6IFwiTUZDXCIsXHJcbiAgICAgICAgICAgIGxpbms6IFwiL2RvY3MvXHU1NDBFXHU3QUVGL0MrKy9NRkMvTUZDXHU1N0ZBXHU3ODQwLzAxLlx1NzNBRlx1NTg4M1x1OTE0RFx1N0Y2RS5tZFwiLFxyXG4gICAgICAgICAgICBpY29uOiBcImh0dHBzOi8vZ2l0ZWUuY29tL3hhcnpoaS9waWN0dXJlL3Jhdy9tYXN0ZXIvaW1nL2MtcGx1c3BsdXMuc3ZnXCIsXHJcbiAgICAgICAgICB9LFxyXG5cclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogXCJDI1wiLFxyXG4gICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6IFwiQyNcdTU3RkFcdTc4NDBcIixcclxuICAgICAgICAgICAgbGluazogXCIvZG9jcy9cdTU0MEVcdTdBRUYvQ1MvQ1NcdTU3RkFcdTc4NDAvQ1NcdTU3RkFcdTc4NDAvMDEuXHU3M0FGXHU1ODgzXHU5MTREXHU3RjZFLm1kXCIsXHJcbiAgICAgICAgICAgIGljb246IFwiaHR0cHM6Ly9naXRlZS5jb20veGFyemhpL3BpY3R1cmUvcmF3L21hc3Rlci9pbWcvY3NoYXJwLnN2Z1wiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdGV4dDogXCJXaW5mb3JtXCIsXHJcbiAgICAgICAgICAgIGxpbms6IFwiL2RvY3MvXHU1NDBFXHU3QUVGL0NTL1dpbmZvcm0vV2luZm9ybVx1NTdGQVx1Nzg0MC8wMS5cdTdCMkNcdTRFMDBcdTRFMkFcdTdBOTdcdTUzRTMubWRcIixcclxuICAgICAgICAgICAgaWNvbjogXCJodHRwczovL2dpdGVlLmNvbS94YXJ6aGkvcGljdHVyZS9yYXcvbWFzdGVyL2ltZy9jc2hhcnAuc3ZnXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0OiBcIldQRlwiLFxyXG4gICAgICAgICAgICBsaW5rOiBcIi9kb2NzL1x1NTQwRVx1N0FFRi9DUy9XUEYvMDEuXHU3M0FGXHU1ODgzXHU5MTREXHU3RjZFLm1kXCIsXHJcbiAgICAgICAgICAgIGljb246IFwiaHR0cHM6Ly9naXRlZS5jb20veGFyemhpL3BpY3R1cmUvcmF3L21hc3Rlci9pbWcvYy1wbHVzcGx1cy5zdmdcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6IFwiUnVzdFwiLFxyXG4gICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6IFwiUnVzdFx1NTdGQVx1Nzg0MFwiLFxyXG4gICAgICAgICAgICBsaW5rOiBcIi9kb2NzL1x1NTQwRVx1N0FFRi9SdXN0L1J1c3RcdTU3RkFcdTc4NDAvMDEuXHU3M0FGXHU1ODgzXHU2NDJEXHU1RUZBLm1kXCIsXHJcbiAgICAgICAgICAgIGljb246IFwiaHR0cHM6Ly9naXRlZS5jb20veGFyemhpL3BpY3R1cmUvcmF3L21hc3Rlci9pbWcvcnVzdC5zdmdcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgfSxcclxuICB7XHJcbiAgICB0ZXh0OiBcIlx1NUI2Nlx1NEU2MGdpdFwiLFxyXG4gICAgbGluazogXCIvZG9jcy9cdTVCNjZcdTRFNjBnaXQvZ2l0XCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICB0ZXh0OiBcIlx1NTE3Nlx1NEVENlx1OTVFRVx1OTg5OFwiLFxyXG4gICAgbGluazogXCIvZG9jcy9cdTUxNzZcdTRFRDZcdTk1RUVcdTk4OTgvMDEuVHlwb3JhXHU0RjdGXHU3NTI4UGljR29cdTVCOUVcdTczQjBcdTU2RkVcdTVFOEFcIixcclxuICB9LFxyXG5dO1xyXG5cclxuZnVuY3Rpb24gY29uY2F0ZW5hdGVJY29uVG9UZXh0KGRhdGEpIHtcclxuICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgIGNvbnN0IGltZyA9IGA8aW1nIHNyYz0nJHtpdGVtLmljb259JyBvbmVycm9yPVwidGhpcy5zdHlsZS5kaXNwbGF5PSdub25lJ1wiLz4gYFxyXG4gICAgaXRlbS50ZXh0ID0gYCR7aW1nfSR7aXRlbS50ZXh0fWA7XHJcbiAgICBpZiAoaXRlbS5pdGVtcyAmJiBpdGVtLml0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uY2F0ZW5hdGVJY29uVG9UZXh0KGl0ZW0uaXRlbXMpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcbmNvbmNhdGVuYXRlSWNvblRvVGV4dChuYXYpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmF2O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDIyMzU3XFxcXERlc2t0b3BcXFxceGFyemhpXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxjb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDIyMzU3XFxcXERlc2t0b3BcXFxceGFyemhpXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxjb25maWdcXFxcc2lkZWJhci5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvMjIzNTcvRGVza3RvcC94YXJ6aGkvZG9jcy8udml0ZXByZXNzL2NvbmZpZy9zaWRlYmFyLmpzXCI7aW1wb3J0IHsgam9pbiB9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IHJlYWRkaXJTeW5jIH0gZnJvbSBcImZzXCI7XHJcblxyXG5mdW5jdGlvbiBpc01hcmtkb3duRmlsZShmaWxlTmFtZSkge1xyXG4gIHJldHVybiAhIWZpbGVOYW1lLm1hdGNoKC8uK1xcLm1kJC8pO1xyXG59XHJcbmZ1bmN0aW9uIGdldEl0ZW1zKHVybCkge1xyXG4gIGNvbnN0IHBhdGggPSBqb2luKF9fZGlybmFtZSwgYC4uLy4uLyR7dXJsfWApO1xyXG4gIHJldHVybiByZWFkZGlyU3luYyhwYXRoKVxyXG4gICAgLmZpbHRlcigoaXRlbSkgPT4gaXNNYXJrZG93bkZpbGUoaXRlbSkpXHJcbiAgICAubWFwKChmaWxlTmFtZSkgPT4ge1xyXG4gICAgICBpZiAoaXNNYXJrZG93bkZpbGUoZmlsZU5hbWUpKSB7XHJcbiAgICAgICAgY29uc3QgdGV4dCA9IGZpbGVOYW1lLm1hdGNoKC9eWzAtOV17Mn0oLXwuKSsvKVxyXG4gICAgICAgICAgPyBmaWxlTmFtZS5zdWJzdHJpbmcoMylcclxuICAgICAgICAgIDogZmlsZU5hbWU7XHJcbiAgICAgICAgY29uc3QgZmlsZURhdGEgPSB7XHJcbiAgICAgICAgICB0ZXh0OiB0ZXh0LnJlcGxhY2UoXCIubWRcIiwgXCJcIiksXHJcbiAgICAgICAgICBsaW5rOiBgJHt1cmx9LyR7ZmlsZU5hbWV9YCxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBmaWxlRGF0YTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmNvbnN0IHNpZGViYXIgPSB7XHJcbiAgXCIvZG9jcy9cdTUyNERcdTdBRUYvXHU1MjREXHU3QUVGXHU0RTA5XHU1MjUxXHU1QkEyL0h0bWwvXCI6IGdldEl0ZW1zKFwiZG9jcy9cdTUyNERcdTdBRUYvXHU1MjREXHU3QUVGXHU0RTA5XHU1MjUxXHU1QkEyL0h0bWxcIiksXHJcbiAgXCIvZG9jcy9cdTUyNERcdTdBRUYvXHU1MjREXHU3QUVGXHU0RTA5XHU1MjUxXHU1QkEyL0NTU1wiOiBbXHJcbiAgICB7IHRleHQ6IFwiQ1NTXCIsIGl0ZW1zOiBnZXRJdGVtcyhcIi9kb2NzL1x1NTI0RFx1N0FFRi9cdTUyNERcdTdBRUZcdTRFMDlcdTUyNTFcdTVCQTIvQ1NTL0NTU1wiKSB9LFxyXG4gICAgeyB0ZXh0OiBcIkNTUzNcIiwgaXRlbXM6IGdldEl0ZW1zKFwiL2RvY3MvXHU1MjREXHU3QUVGL1x1NTI0RFx1N0FFRlx1NEUwOVx1NTI1MVx1NUJBMi9DU1MvQ1NTM1wiKSB9LFxyXG4gICAgeyB0ZXh0OiBcIlNjc3NcIiwgaXRlbXM6IGdldEl0ZW1zKFwiL2RvY3MvXHU1MjREXHU3QUVGL1x1NTI0RFx1N0FFRlx1NEUwOVx1NTI1MVx1NUJBMi9DU1MvU2Nzc1wiKSB9LFxyXG4gICAgeyB0ZXh0OiBcIkxlc3NcIiwgaXRlbXM6IGdldEl0ZW1zKFwiL2RvY3MvXHU1MjREXHU3QUVGL1x1NTI0RFx1N0FFRlx1NEUwOVx1NTI1MVx1NUJBMi9DU1MvTGVzc1wiKSB9LFxyXG4gIF0sXHJcbiAgXCIvZG9jcy9cdTUyNERcdTdBRUYvXHU1MjREXHU3QUVGXHU0RTA5XHU1MjUxXHU1QkEyL2phdmFzY3JpcHQvXCI6IFtcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJqc1x1NTdGQVx1Nzg0MFwiLFxyXG4gICAgICBpdGVtczogZ2V0SXRlbXMoXCIvZG9jcy9cdTUyNERcdTdBRUYvXHU1MjREXHU3QUVGXHU0RTA5XHU1MjUxXHU1QkEyL2phdmFzY3JpcHQvanNcdTU3RkFcdTc4NDBcIiksXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcImpzXHU5QUQ4XHU3RUE3XCIsXHJcbiAgICAgIGl0ZW1zOiBnZXRJdGVtcyhcIi9kb2NzL1x1NTI0RFx1N0FFRi9cdTUyNERcdTdBRUZcdTRFMDlcdTUyNTFcdTVCQTIvamF2YXNjcmlwdC9qc1x1OUFEOFx1N0VBN1wiKSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiV2ViIEFwaVwiLFxyXG4gICAgICBpdGVtczogZ2V0SXRlbXMoXCIvZG9jcy9cdTUyNERcdTdBRUYvXHU1MjREXHU3QUVGXHU0RTA5XHU1MjUxXHU1QkEyL2phdmFzY3JpcHQvV2ViQXBpXCIpLFxyXG4gICAgfSxcclxuICBdLFxyXG4gIFwiL2RvY3MvXHU1MjREXHU3QUVGL1x1NURFNVx1NTE3N1x1NUU5My9Hc2FwXCI6IFtcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJcdTVGRUJcdTkwMUZcdTVGMDBcdTU5Q0JcIixcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiBcIlx1NTdGQVx1NjcyQ1x1NEY3Rlx1NzUyOFwiLFxyXG4gICAgICAgICAgaXRlbXM6IGdldEl0ZW1zKFwiL2RvY3MvXHU1MjREXHU3QUVGL1x1NURFNVx1NTE3N1x1NUU5My9Hc2FwL1x1NUZFQlx1OTAxRlx1NUYwMFx1NTlDQlwiKSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJcdTU3RkFcdTY3MkNBcGlcIixcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiBcIkdTQVBcdTVCRjlcdThDNjFcIixcclxuICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgICAgICAgIGxpbms6IFwiL2RvY3MvXHU1MjREXHU3QUVGL1x1NURFNVx1NTE3N1x1NUU5My9Hc2FwL1x1NTdGQVx1Nzg0MC9nc2FwL3N0YXJ0XCIsXHJcbiAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGV4dDogXCJcdTVDNUVcdTYwMjdcIixcclxuICAgICAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgaXRlbXM6IGdldEl0ZW1zKFwiL2RvY3MvXHU1MjREXHU3QUVGL1x1NURFNVx1NTE3N1x1NUU5My9Hc2FwL1x1NTdGQVx1Nzg0MC9nc2FwL3Byb3BlcnRpZXNcIiksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0ZXh0OiBcIlx1NjVCOVx1NkNENVwiLFxyXG4gICAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICBpdGVtczogZ2V0SXRlbXMoXCIvZG9jcy9cdTUyNERcdTdBRUYvXHU1REU1XHU1MTc3XHU1RTkzL0dzYXAvXHU1N0ZBXHU3ODQwL2dzYXAvbWV0aG9kc1wiKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRleHQ6IFwiXHU1MTg1XHU5MEU4XHU2M0QyXHU0RUY2XCIsXHJcbiAgICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgIGl0ZW1zOiBnZXRJdGVtcyhcclxuICAgICAgICAgICAgICAgIFwiL2RvY3MvXHU1MjREXHU3QUVGL1x1NURFNVx1NTE3N1x1NUU5My9Hc2FwL1x1NTdGQVx1Nzg0MC9nc2FwL2ludGVybmFsLXBsdWdpbnNcIlxyXG4gICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogXCJUd2VlbihcdTg4NjVcdTk1RjRcdTUyQThcdTc1M0IpXCIsXHJcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICAgICAgICBsaW5rOiBcIi9kb2NzL1x1NTI0RFx1N0FFRi9cdTVERTVcdTUxNzdcdTVFOTMvR3NhcC9cdTU3RkFcdTc4NDAvVHdlZW4vc3RhcnRcIixcclxuICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0ZXh0OiBcIlx1NUM1RVx1NjAyN1wiLFxyXG4gICAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICBpdGVtczogZ2V0SXRlbXMoXCIvZG9jcy9cdTUyNERcdTdBRUYvXHU1REU1XHU1MTc3XHU1RTkzL0dzYXAvXHU1N0ZBXHU3ODQwL1R3ZWVuL3Byb3BlcnRpZXNcIiksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0ZXh0OiBcIlx1NjVCOVx1NkNENVwiLFxyXG4gICAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICBpdGVtczogZ2V0SXRlbXMoXCIvZG9jcy9cdTUyNERcdTdBRUYvXHU1REU1XHU1MTc3XHU1RTkzL0dzYXAvXHU1N0ZBXHU3ODQwL1R3ZWVuL21ldGhvZHNcIiksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogXCJUaW1lbGluZShcdTY1RjZcdTk1RjRcdTdFQkYpXCIsXHJcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICAgICAgICBsaW5rOiBcIi9kb2NzL1x1NTI0RFx1N0FFRi9cdTVERTVcdTUxNzdcdTVFOTMvR3NhcC9cdTU3RkFcdTc4NDAvVGltZWxpbmUvc3RhcnRcIixcclxuICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0ZXh0OiBcIlx1NUM1RVx1NjAyN1wiLFxyXG4gICAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICBpdGVtczogZ2V0SXRlbXMoXHJcbiAgICAgICAgICAgICAgICBcIi9kb2NzL1x1NTI0RFx1N0FFRi9cdTVERTVcdTUxNzdcdTVFOTMvR3NhcC9cdTU3RkFcdTc4NDAvVGltZWxpbmUvcHJvcGVydGllc1wiXHJcbiAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRleHQ6IFwiXHU2NUI5XHU2Q0Q1XCIsXHJcbiAgICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgIGl0ZW1zOiBnZXRJdGVtcyhcIi9kb2NzL1x1NTI0RFx1N0FFRi9cdTVERTVcdTUxNzdcdTVFOTMvR3NhcC9cdTU3RkFcdTc4NDAvVGltZWxpbmUvbWV0aG9kc1wiKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiBcIkNTU1wiLFxyXG4gICAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcclxuICAgICAgICAgIGxpbms6IFwiL2RvY3MvXHU1MjREXHU3QUVGL1x1NURFNVx1NTE3N1x1NUU5My9Hc2FwL1x1NTdGQVx1Nzg0MC9Dc3Mvc3RhcnRcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IFwiRWFzaW5nXCIsXHJcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICAgICAgICBpdGVtczogZ2V0SXRlbXMoXCIvZG9jcy9cdTUyNERcdTdBRUYvXHU1REU1XHU1MTc3XHU1RTkzL0dzYXAvXHU1N0ZBXHU3ODQwL0Vhc2luZ1wiKSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJcdTYzRDJcdTRFRjZcIixcclxuICAgICAgbGluazogXCIvZG9jcy9cdTUyNERcdTdBRUYvXHU1REU1XHU1MTc3XHU1RTkzL0dzYXAvXHU2M0QyXHU0RUY2L3N0YXJ0XCIsXHJcblxyXG4gICAgICBpdGVtczogZ2V0SXRlbXMoXCIvZG9jcy9cdTUyNERcdTdBRUYvXHU1REU1XHU1MTc3XHU1RTkzL0dzYXAvXHU2M0QyXHU0RUY2L3BsdWdpbnNcIiksXHJcbiAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiXHU3Mjc5XHU1RjgxXHU1NDhDXHU1REU1XHU1MTc3XCIsXHJcbiAgICAgIGl0ZW1zOiBnZXRJdGVtcyhcIi9kb2NzL1x1NTI0RFx1N0FFRi9cdTVERTVcdTUxNzdcdTVFOTMvR3NhcC9cdTcyNzlcdTVGODFcdTU0OENcdTVERTVcdTUxNzdcIiksXHJcbiAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgIH0sXHJcbiAgXSxcclxuICBcIi9kb2NzL1x1NTI0RFx1N0FFRi9cdTY4NDZcdTY3QjYvVnVlL1Z1ZTIvXCI6IFtcclxuICAgIHsgdGV4dDogXCJWdWUyXHU1N0ZBXHU3ODQwXCIsIGl0ZW1zOiBnZXRJdGVtcyhcIi9kb2NzL1x1NTI0RFx1N0FFRi9cdTY4NDZcdTY3QjYvVnVlL1Z1ZTIvVnVlMlx1NTdGQVx1Nzg0MFwiKSB9LFxyXG4gICAgeyB0ZXh0OiBcIlZ1ZTJcdThGREJcdTk2MzZcIiwgaXRlbXM6IGdldEl0ZW1zKFwiL2RvY3MvXHU1MjREXHU3QUVGL1x1Njg0Nlx1NjdCNi9WdWUvVnVlMi9WdWUyXHU4RkRCXHU5NjM2XCIpIH0sXHJcbiAgXSxcclxuICBcIi9kb2NzL1x1NTI0RFx1N0FFRi9cdTY4NDZcdTY3QjYvVnVlL1Z1ZTMvXCI6IFtcclxuICAgIHsgdGV4dDogXCJWdWUzXHU1N0ZBXHU3ODQwXCIsIGl0ZW1zOiBnZXRJdGVtcyhcIi9kb2NzL1x1NTI0RFx1N0FFRi9cdTY4NDZcdTY3QjYvVnVlL1Z1ZTMvVnVlM1x1NTdGQVx1Nzg0MFwiKSB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIlx1N0VDNFx1NTQwOFx1NUYwRkFwaVwiLFxyXG4gICAgICBpdGVtczogZ2V0SXRlbXMoXCIvZG9jcy9cdTUyNERcdTdBRUYvXHU2ODQ2XHU2N0I2L1Z1ZS9WdWUzL1x1N0VDNFx1NTQwOFx1NUYwRkFwaVwiKSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiVnVlM1x1OEZEQlx1OTYzNlwiLFxyXG4gICAgICBpdGVtczogZ2V0SXRlbXMoXCIvZG9jcy9cdTUyNERcdTdBRUYvXHU2ODQ2XHU2N0I2L1Z1ZS9WdWUzL1Z1ZTNcdThGREJcdTk2MzZcIiksXHJcbiAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiXHU1MTg1XHU3RjZFXHU3RUM0XHU0RUY2XCIsXHJcbiAgICAgIGl0ZW1zOiBnZXRJdGVtcyhcIi9kb2NzL1x1NTI0RFx1N0FFRi9cdTY4NDZcdTY3QjYvVnVlL1Z1ZTMvXHU1MTg1XHU3RjZFXHU3RUM0XHU0RUY2XCIpLFxyXG4gICAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIlx1NUYwMFx1NTNEMVx1N0VDNFx1NEVGNlx1NUU5M1wiLFxyXG4gICAgICBpdGVtczogZ2V0SXRlbXMoXCIvZG9jcy9cdTUyNERcdTdBRUYvXHU2ODQ2XHU2N0I2L1Z1ZS9WdWUzL1x1NUYwMFx1NTNEMVx1N0VDNFx1NEVGNlx1NUU5M1wiKSxcclxuICAgICAgY29sbGFwc2VkOiB0cnVlLFxyXG4gICAgfSxcclxuICBdLFxyXG4gIFwiL2RvY3MvXHU1MjREXHU3QUVGL1R5cGVTY3JpcHQvVHNcdTUxNjVcdTk1RTgvXCI6IFtcclxuICAgIHsgdGV4dDogXCJUc1x1NTE2NVx1OTVFOFwiLCBpdGVtczogZ2V0SXRlbXMoXCIvZG9jcy9cdTUyNERcdTdBRUYvVHlwZVNjcmlwdC9Uc1x1NTE2NVx1OTVFOFwiKSB9LFxyXG4gIF0sXHJcbiAgXCIvZG9jcy9cdTUyNERcdTdBRUYvXHU2ODQ2XHU2N0I2L1JlYWN0L1wiOiBnZXRJdGVtcyhcIi9kb2NzL1x1NTI0RFx1N0FFRi9cdTY4NDZcdTY3QjYvUmVhY3RcIiksXHJcbiAgXCIvZG9jcy9cdTUyNERcdTdBRUYvXHU1M0VGXHU4OUM2XHU1MzE2L0NhbnZhcy9cIjogZ2V0SXRlbXMoXCIvZG9jcy9cdTUyNERcdTdBRUYvXHU1M0VGXHU4OUM2XHU1MzE2L0NhbnZhc1wiKSxcclxuICBcIi9kb2NzL1x1NTI0RFx1N0FFRi9cdTUzRUZcdTg5QzZcdTUzMTYvV2ViR0wvXCI6IGdldEl0ZW1zKFwiL2RvY3MvXHU1MjREXHU3QUVGL1x1NTNFRlx1ODlDNlx1NTMxNi9XZWJHTFwiKSxcclxuICBcIi9kb2NzL1x1NTI0RFx1N0FFRi9cdTUzRUZcdTg5QzZcdTUzMTYvVGhyZWUuanMvXCI6IFtcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJcdTU3RkFcdTY3MkNcdTRGN0ZcdTc1MjhcIixcclxuICAgICAgaXRlbXM6IGdldEl0ZW1zKFwiL2RvY3MvXHU1MjREXHU3QUVGL1x1NTNFRlx1ODlDNlx1NTMxNi9UaHJlZS5qcy9cdTU3RkFcdTY3MkNcdTRGN0ZcdTc1MjhcIiksXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIlx1NTFFMFx1NEY1NVx1NEY1M1wiLFxyXG4gICAgICBpdGVtczogZ2V0SXRlbXMoXCIvZG9jcy9cdTUyNERcdTdBRUYvXHU1M0VGXHU4OUM2XHU1MzE2L1RocmVlLmpzL1x1NTFFMFx1NEY1NVx1NEY1M1wiKSxcclxuICAgICAgY29sbGFwc2VkOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJcdTY3NTBcdThEMjhcIixcclxuICAgICAgaXRlbXM6IGdldEl0ZW1zKFwiL2RvY3MvXHU1MjREXHU3QUVGL1x1NTNFRlx1ODlDNlx1NTMxNi9UaHJlZS5qcy9cdTY3NTBcdThEMjhcIiksXHJcbiAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiXHU3MjY5XHU0RjUzXCIsXHJcbiAgICAgIGl0ZW1zOiBnZXRJdGVtcyhcIi9kb2NzL1x1NTI0RFx1N0FFRi9cdTUzRUZcdTg5QzZcdTUzMTYvVGhyZWUuanMvXHU3MjY5XHU0RjUzXCIpLFxyXG4gICAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIlx1N0VCOVx1NzQwNlx1OEQzNFx1NTZGRVwiLFxyXG4gICAgICBpdGVtczogZ2V0SXRlbXMoXCIvZG9jcy9cdTUyNERcdTdBRUYvXHU1M0VGXHU4OUM2XHU1MzE2L1RocmVlLmpzL1x1N0VCOVx1NzQwNlx1OEQzNFx1NTZGRVwiKSxcclxuICAgICAgY29sbGFwc2VkOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJcdTUxNDlcdTZFOTBcIixcclxuICAgICAgaXRlbXM6IGdldEl0ZW1zKFwiL2RvY3MvXHU1MjREXHU3QUVGL1x1NTNFRlx1ODlDNlx1NTMxNi9UaHJlZS5qcy9cdTUxNDlcdTZFOTBcIiksXHJcbiAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiXHU5NjM0XHU1RjcxXCIsXHJcbiAgICAgIGl0ZW1zOiBnZXRJdGVtcyhcIi9kb2NzL1x1NTI0RFx1N0FFRi9cdTUzRUZcdTg5QzZcdTUzMTYvVGhyZWUuanMvXHU5NjM0XHU1RjcxXCIpLFxyXG4gICAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIlx1NTczQVx1NjY2RlwiLFxyXG4gICAgICBpdGVtczogZ2V0SXRlbXMoXCIvZG9jcy9cdTUyNERcdTdBRUYvXHU1M0VGXHU4OUM2XHU1MzE2L1RocmVlLmpzL1x1NTczQVx1NjY2RlwiKSxcclxuICAgICAgY29sbGFwc2VkOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJcdTYzQTdcdTUyMzZcdTU2NjhcIixcclxuICAgICAgaXRlbXM6IGdldEl0ZW1zKFwiL2RvY3MvXHU1MjREXHU3QUVGL1x1NTNFRlx1ODlDNlx1NTMxNi9UaHJlZS5qcy9cdTYzQTdcdTUyMzZcdTU2NjhcIiksXHJcbiAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiXHU4Rjg1XHU1MkE5XHU1QkY5XHU4QzYxXCIsXHJcbiAgICAgIGl0ZW1zOiBnZXRJdGVtcyhcIi9kb2NzL1x1NTI0RFx1N0FFRi9cdTUzRUZcdTg5QzZcdTUzMTYvVGhyZWUuanMvXHU4Rjg1XHU1MkE5XHU1QkY5XHU4QzYxXCIpLFxyXG4gICAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIlx1NjQ0NFx1NTBDRlx1NjczQVwiLFxyXG4gICAgICBpdGVtczogZ2V0SXRlbXMoXCIvZG9jcy9cdTUyNERcdTdBRUYvXHU1M0VGXHU4OUM2XHU1MzE2L1RocmVlLmpzL1x1NjQ0NFx1NTBDRlx1NjczQVwiKSxcclxuICAgICAgY29sbGFwc2VkOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJcdTUyQTBcdThGN0RcdTU2NjhcIixcclxuICAgICAgaXRlbXM6IGdldEl0ZW1zKFwiL2RvY3MvXHU1MjREXHU3QUVGL1x1NTNFRlx1ODlDNlx1NTMxNi9UaHJlZS5qcy9cdTUyQTBcdThGN0RcdTU2NjhcIiksXHJcbiAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiXHU2ODM4XHU1RkMzXCIsXHJcbiAgICAgIGl0ZW1zOiBnZXRJdGVtcyhcIi9kb2NzL1x1NTI0RFx1N0FFRi9cdTUzRUZcdTg5QzZcdTUzMTYvVGhyZWUuanMvXHU2ODM4XHU1RkMzXCIpLFxyXG4gICAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIlx1NjU3MFx1NUI2Nlx1NUU5M1wiLFxyXG4gICAgICBpdGVtczogZ2V0SXRlbXMoXCIvZG9jcy9cdTUyNERcdTdBRUYvXHU1M0VGXHU4OUM2XHU1MzE2L1RocmVlLmpzL1x1NjU3MFx1NUI2Nlx1NUU5M1wiKSxcclxuICAgICAgY29sbGFwc2VkOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJcdTVFMzhcdTkxQ0ZcIixcclxuICAgICAgaXRlbXM6IGdldEl0ZW1zKFwiL2RvY3MvXHU1MjREXHU3QUVGL1x1NTNFRlx1ODlDNlx1NTMxNi9UaHJlZS5qcy9cdTVFMzhcdTkxQ0ZcIiksXHJcbiAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgIH0sXHJcbiAgXSxcclxuICBcIi9kb2NzL1x1NTQwRVx1N0FFRi9DKysvQysrXHU1N0ZBXHU3ODQwXCI6IFtcclxuICAgIHsgdGV4dDogXCJDKytcdTU3RkFcdTc4NDBcIiwgaXRlbXM6IGdldEl0ZW1zKFwiL2RvY3MvXHU1NDBFXHU3QUVGL0MrKy9DKytcdTU3RkFcdTc4NDAvQysrXHU1N0ZBXHU3ODQwXCIpIH0sXHJcbiAgICB7IHRleHQ6IFwiQysrXHU4RkRCXHU5NjM2XCIsIGl0ZW1zOiBnZXRJdGVtcyhcIi9kb2NzL1x1NTQwRVx1N0FFRi9DKysvQysrXHU1N0ZBXHU3ODQwL0MrK1x1OEZEQlx1OTYzNlwiKSB9LFxyXG4gICAgeyB0ZXh0OiBcIlx1OTc2Mlx1NTQxMVx1NUJGOVx1OEM2MVwiLCBpdGVtczogZ2V0SXRlbXMoXCIvZG9jcy9cdTU0MEVcdTdBRUYvQysrL0MrK1x1NTdGQVx1Nzg0MC9cdTk3NjJcdTU0MTFcdTVCRjlcdThDNjFcIikgfSxcclxuICAgIHsgdGV4dDogXCJTVExcIiwgaXRlbXM6IGdldEl0ZW1zKFwiL2RvY3MvXHU1NDBFXHU3QUVGL0MrKy9DKytcdTU3RkFcdTc4NDAvU1RMXCIpIH0sXHJcbiAgXSxcclxuICBcIi9kb2NzL1x1NTQwRVx1N0FFRi9DUy9DU1x1NTdGQVx1Nzg0MFwiOiBbXHJcbiAgICB7IHRleHQ6IFwiQ1NcdTU3RkFcdTc4NDBcIiwgaXRlbXM6IGdldEl0ZW1zKFwiL2RvY3MvXHU1NDBFXHU3QUVGL0NTL0NTXHU1N0ZBXHU3ODQwL0NTXHU1N0ZBXHU3ODQwXCIpIH0sXHJcbiAgICB7IHRleHQ6IFwiQ1NcdTlBRDhcdTdFQTdcIiwgaXRlbXM6IGdldEl0ZW1zKFwiL2RvY3MvXHU1NDBFXHU3QUVGL0NTL0NTXHU1N0ZBXHU3ODQwL0NTXHU5QUQ4XHU3RUE3XCIpIH0sXHJcbiAgICB7IHRleHQ6IFwiXHU5NzYyXHU1NDExXHU1QkY5XHU4QzYxXCIsIGl0ZW1zOiBnZXRJdGVtcyhcIi9kb2NzL1x1NTQwRVx1N0FFRi9DUy9DU1x1NTdGQVx1Nzg0MC9cdTk3NjJcdTU0MTFcdTVCRjlcdThDNjFcIikgfSxcclxuICBdLFxyXG4gIFwiL2RvY3MvXHU1NDBFXHU3QUVGL0NTL1dQRlwiOiBbXHJcbiAgICB7IHRleHQ6IFwiV1BGXHU1N0ZBXHU3ODQwXCIsIGl0ZW1zOiBnZXRJdGVtcyhcIi9kb2NzL1x1NTQwRVx1N0FFRi9DUy9XUEZcIikgfSxcclxuICBdLFxyXG4gIFwiL2RvY3MvXHU1NDBFXHU3QUVGL0NTL1dpbmZvcm1cIjogW1xyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIldpbmZvcm1cdTU3RkFcdTc4NDBcIixcclxuICAgICAgaXRlbXM6IGdldEl0ZW1zKFwiL2RvY3MvXHU1NDBFXHU3QUVGL0NTL1dpbmZvcm0vV2luZm9ybVx1NTdGQVx1Nzg0MFwiKSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiXHU1RTM4XHU3NTI4XHU2M0E3XHU0RUY2XCIsXHJcbiAgICAgIGl0ZW1zOiBnZXRJdGVtcyhcIi9kb2NzL1x1NTQwRVx1N0FFRi9DUy9XaW5mb3JtL1x1NUUzOFx1NzUyOFx1NjNBN1x1NEVGNlwiKSxcclxuICAgIH0sXHJcbiAgXSxcclxuICBcIi9kb2NzL1x1NTQwRVx1N0FFRi9DKysvV2luMzJcIjogW1xyXG4gICAgeyB0ZXh0OiBcIldpbjMyXCIsIGl0ZW1zOiBnZXRJdGVtcyhcIi9kb2NzL1x1NTQwRVx1N0FFRi9DKysvV2luMzJcIikgfSxcclxuICBdLFxyXG4gIFwiL2RvY3MvXHU1NDBFXHU3QUVGL0MrKy9NRkNcIjogW1xyXG4gICAgeyB0ZXh0OiBcIk1GQ1x1NTdGQVx1Nzg0MFwiLCBpdGVtczogZ2V0SXRlbXMoXCIvZG9jcy9cdTU0MEVcdTdBRUYvQysrL01GQy9NRkNcdTU3RkFcdTc4NDBcIikgfSxcclxuICAgIHsgdGV4dDogXCJcdTVFMzhcdTc1MjhcdTYzQTdcdTRFRjZcIiwgaXRlbXM6IGdldEl0ZW1zKFwiL2RvY3MvXHU1NDBFXHU3QUVGL0MrKy9NRkMvXHU1RTM4XHU3NTI4XHU2M0E3XHU0RUY2XCIpIH0sXHJcbiAgICB7IHRleHQ6IFwiXHU1RTM4XHU3NTI4XHU3QzdCXCIsIGl0ZW1zOiBnZXRJdGVtcyhcIi9kb2NzL1x1NTQwRVx1N0FFRi9DKysvTUZDL1x1NUUzOFx1NzUyOFx1N0M3QlwiKSB9LFxyXG4gIF0sXHJcbiAgXCIvZG9jcy9cdTUyNERcdTdBRUYvXHU1QzBGXHU3QTBCXHU1RThGL1wiOiBnZXRJdGVtcyhcIi9kb2NzL1x1NTI0RFx1N0FFRi9cdTVDMEZcdTdBMEJcdTVFOEZcIiksXHJcbiAgXCIvZG9jcy9cdTU0MEVcdTdBRUYvTm9kZS5qcy9cIjogZ2V0SXRlbXMoXCIvZG9jcy9cdTU0MEVcdTdBRUYvTm9kZS5qcy9cIiksXHJcbiAgXCIvZG9jcy9cdTUyNERcdTdBRUYvXHU0RTAwXHU0RTlCXHU5NUVFXHU5ODk4L1wiOiBnZXRJdGVtcyhcIi9kb2NzL1x1NTI0RFx1N0FFRi9cdTRFMDBcdTRFOUJcdTk1RUVcdTk4OTgvXCIpLFxyXG4gIFwiL2RvY3MvXHU1MTc2XHU0RUQ2XHU5NUVFXHU5ODk4XCI6IGdldEl0ZW1zKFwiL2RvY3MvXHU1MTc2XHU0RUQ2XHU5NUVFXHU5ODk4XCIpLFxyXG4gIFwiL2RvY3MvXHU1NDBFXHU3QUVGL1J1c3RcIjogW1xyXG4gICAgeyB0ZXh0OiBcIlJ1c3RcdTU3RkFcdTc4NDBcIiwgaXRlbXM6IGdldEl0ZW1zKFwiL2RvY3MvXHU1NDBFXHU3QUVGL1J1c3QvUnVzdFx1NTdGQVx1Nzg0MFwiKSB9LFxyXG4gICAgeyB0ZXh0OiBcIlx1NjgwN1x1OTFDRlx1N0M3Qlx1NTc4QlwiLCBpdGVtczogZ2V0SXRlbXMoXCIvZG9jcy9cdTU0MEVcdTdBRUYvUnVzdC9cdTY4MDdcdTkxQ0ZcdTdDN0JcdTU3OEJcIiksIGNvbGxhcHNlZDogdHJ1ZSB9LFxyXG4gICAgeyB0ZXh0OiBcIlx1NkRGMVx1NTE2NVx1N0M3Qlx1NTc4QlwiLCBpdGVtczogZ2V0SXRlbXMoXCIvZG9jcy9cdTU0MEVcdTdBRUYvUnVzdC9cdTZERjFcdTUxNjVcdTdDN0JcdTU3OEJcIikgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJcdTU5MERcdTU0MDhcdTdDN0JcdTU3OEJcIixcclxuICAgICAgY29sbGFwc2VkOiB0cnVlLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgIHsgdGV4dDogJ1x1NTE0M1x1N0VDNCcsIGxpbms6IFwiL2RvY3MvXHU1NDBFXHU3QUVGL1J1c3QvXHU1OTBEXHU1NDA4XHU3QzdCXHU1NzhCL1x1NTE0M1x1N0VDNFR1cGxlL2luZGV4XCIsIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnXHU2NTcwXHU3RUM0JywgbGluazogXCIvZG9jcy9cdTU0MEVcdTdBRUYvUnVzdC9cdTU5MERcdTU0MDhcdTdDN0JcdTU3OEIvXHU2NTcwXHU3RUM0QXJyYXkvaW5kZXhcIiwgfSxcclxuICAgICAgICB7IHRleHQ6ICdcdTdFRDNcdTY3ODRcdTRGNTMnLCBsaW5rOiBcIi9kb2NzL1x1NTQwRVx1N0FFRi9SdXN0L1x1NTkwRFx1NTQwOFx1N0M3Qlx1NTc4Qi9cdTdFRDNcdTY3ODRcdTRGNTNTdHJ1Y3QvaW5kZXhcIiwgfSxcclxuICAgICAgICB7IHRleHQ6ICdcdTY3OUFcdTRFM0UnLCBsaW5rOiBcIi9kb2NzL1x1NTQwRVx1N0FFRi9SdXN0L1x1NTkwRFx1NTQwOFx1N0M3Qlx1NTc4Qi9cdTY3OUFcdTRFM0VFbnVtL2luZGV4XCIsIGl0ZW1zOiBnZXRJdGVtcyhcIi9kb2NzL1x1NTQwRVx1N0FFRi9SdXN0L1x1NTkwRFx1NTQwOFx1N0M3Qlx1NTc4Qi9cdTY3OUFcdTRFM0VFbnVtL2RvY3NcIiksIGNvbGxhcHNlZDogdHJ1ZSwgfSxcclxuICAgICAgICB7IHRleHQ6ICdcdTgwNTRcdTU0MDhcdTRGNTMnLCBsaW5rOiBcIi9kb2NzL1x1NTQwRVx1N0FFRi9SdXN0L1x1NTkwRFx1NTQwOFx1N0M3Qlx1NTc4Qi9cdTgwNTRcdTU0MDhcdTRGNTNVbmlvbi9pbmRleFwiLCB9LFxyXG4gICAgICAgIHsgdGV4dDogJ1x1NUI1N1x1N0IyNlx1NEUzMicsIGxpbms6IFwiL2RvY3MvXHU1NDBFXHU3QUVGL1J1c3QvXHU1OTBEXHU1NDA4XHU3QzdCXHU1NzhCL1x1NUI1N1x1N0IyNlx1NEUzMlN0cmluZy9pbmRleFwiLCBpdGVtczogZ2V0SXRlbXMoXCIvZG9jcy9cdTU0MEVcdTdBRUYvUnVzdC9cdTU5MERcdTU0MDhcdTdDN0JcdTU3OEIvXHU1QjU3XHU3QjI2XHU0RTMyU3RyaW5nL2RvY3NcIiksIGNvbGxhcHNlZDogdHJ1ZSwgfSxcclxuICAgICAgXVxyXG4gICAgfSxcclxuICAgIHsgdGV4dDogXCJcdTZBMjFcdTVGMEZcdTUzMzlcdTkxNERcIiwgaXRlbXM6IGdldEl0ZW1zKFwiL2RvY3MvXHU1NDBFXHU3QUVGL1J1c3QvXHU2QTIxXHU1RjBGXHU1MzM5XHU5MTREXCIpLCBjb2xsYXBzZWQ6IHRydWUsIH0sXHJcbiAgICB7IHRleHQ6IFwiXHU2MjQwXHU2NzA5XHU2NzQzXCIsIGl0ZW1zOiBnZXRJdGVtcyhcIi9kb2NzL1x1NTQwRVx1N0FFRi9SdXN0L1J1c3RcdThGREJcdTk2MzYvXHU2MjQwXHU2NzA5XHU2NzQzXCIpLCBjb2xsYXBzZWQ6IHRydWUsIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiXHU5NkM2XHU1NDA4XHU3QzdCXHU1NzhCXCIsXHJcbiAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICB7IHRleHQ6ICdWZWN0b3InLCBpdGVtczogZ2V0SXRlbXMoXCIvZG9jcy9cdTU0MEVcdTdBRUYvUnVzdC9cdTk2QzZcdTU0MDhcdTdDN0JcdTU3OEIvVmVjdG9yXCIpLCBjb2xsYXBzZWQ6IHRydWUsIH0sXHJcbiAgICAgICAgeyB0ZXh0OiAnSGFzaE1hcCcsIGl0ZW1zOiBnZXRJdGVtcyhcIi9kb2NzL1x1NTQwRVx1N0FFRi9SdXN0L1x1OTZDNlx1NTQwOFx1N0M3Qlx1NTc4Qi9IYXNoTWFwXCIpLCBjb2xsYXBzZWQ6IHRydWUgfSxcclxuICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJSdXN0XHU4RkRCXHU5NjM2XCIsXHJcbiAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICB7IHRleHQ6IFwiXHU2Q0RCXHU1NzhCXCIsIGl0ZW1zOiBnZXRJdGVtcyhcIi9kb2NzL1x1NTQwRVx1N0FFRi9SdXN0L1J1c3RcdThGREJcdTk2MzYvXHU2Q0RCXHU1NzhCXCIpLCBjb2xsYXBzZWQ6IHRydWUsIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIlRyYWl0XCIsIGl0ZW1zOiBnZXRJdGVtcyhcIi9kb2NzL1x1NTQwRVx1N0FFRi9SdXN0L1J1c3RcdThGREJcdTk2MzYvVHJhaXRcIiksIGNvbGxhcHNlZDogdHJ1ZSwgfSxcclxuICAgICAgICB7IHRleHQ6IFwiXHU3NTFGXHU1NDdEXHU1NDY4XHU2NzFGXCIsIGl0ZW1zOiBnZXRJdGVtcyhcIi9kb2NzL1x1NTQwRVx1N0FFRi9SdXN0L1J1c3RcdThGREJcdTk2MzYvXHU3NTFGXHU1NDdEXHU1NDY4XHU2NzFGXCIpLCBjb2xsYXBzZWQ6IHRydWUsIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIlx1NTMwNVx1NTQ4Q1x1NkEyMVx1NTc1N1wiLCBpdGVtczogZ2V0SXRlbXMoXCIvZG9jcy9cdTU0MEVcdTdBRUYvUnVzdC9SdXN0XHU4RkRCXHU5NjM2L1x1NTMwNVx1NTQ4Q1x1NkEyMVx1NTc1N1wiKSwgY29sbGFwc2VkOiB0cnVlLCB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJcdTVCOEZcIiwgaXRlbXM6IGdldEl0ZW1zKFwiL2RvY3MvXHU1NDBFXHU3QUVGL1J1c3QvUnVzdFx1OEZEQlx1OTYzNi9cdTVCOEZcIiksIGNvbGxhcHNlZDogdHJ1ZSwgfSxcclxuICAgICAgICB7IHRleHQ6IFwiXHU5NUVEXHU1MzA1XCIsIGl0ZW1zOiBnZXRJdGVtcyhcIi9kb2NzL1x1NTQwRVx1N0FFRi9SdXN0L1J1c3RcdThGREJcdTk2MzYvXHU5NUVEXHU1MzA1XCIpLCBjb2xsYXBzZWQ6IHRydWUsIH0sXHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgXVxyXG59XHJcblxyXG5mb3IgKGxldCBrZXkgaW4gc2lkZWJhcikge1xyXG4gIGlmIChBcnJheS5pc0FycmF5KHNpZGViYXJba2V5XSkpIHtcclxuICAgIHNpZGViYXJba2V5XSA9IHNpZGViYXJba2V5XS5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5pdGVtLFxyXG4gICAgICAgIGNvbGxhcHNlZDogaXRlbS5jb2xsYXBzZWQgfHwgZmFsc2UsXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgc2lkZWJhcjtcclxuXHJcbi8vIDYxOGMyYjJkZWUwYTM1NTUyMjQxZjQyYmM0N2E5YTFlIl0sCiAgIm1hcHBpbmdzIjogIjtBQUErVCxTQUFTLG9CQUFvQjs7O0FDQVIsSUFBTSxNQUFNO0FBQUEsRUFDOVY7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxVQUNSO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFVBQ1I7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxVQUNMO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxVQUNSO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFVBQ1I7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BRUE7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFFQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1I7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1I7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0w7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFVBQ1I7QUFBQSxRQUVG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
