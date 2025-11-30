const nav = [
  {
    text: "前端",
    items: [
      {
        text: "前端三剑客",
        items: [
          {
            text: "Html",
            link: "/docs/前端/前端三剑客/Html/01.Html初识",
            icon: "https://gitee.com/xarzhi/picture/raw/master/img/html5.svg",
          },
          {
            text: "CSS",
            link: "/docs/前端/前端三剑客/CSS/CSS/01.引入css样式表",
            icon: "https://gitee.com/xarzhi/picture/raw/master/img/css_old.svg",
          },
          {
            text: "JavaScript",
            link: "/docs/前端/前端三剑客/javascript/js基础/01.js基础语法",
            icon: "https://gitee.com/xarzhi/picture/raw/master/img/javascript.svg",
          },
        ],
      },
      {
        text: "TypeScript",
        items: [
          {
            text: "Ts入门",
            link: "/docs/前端/TypeScript/Ts入门/01.基本配置",
            icon: "https://gitee.com/xarzhi/picture/raw/master/img/typescript.svg",
          },
        ],
      },
      {
        text: "Vue",
        items: [
          {
            text: "Vue2",
            link: "/docs/前端/框架/Vue/Vue2/Vue2基础/01.Vue2基础",
            icon: "https://cn.vuejs.org/logo.svg",
          },
          {
            text: "Vue3",
            link: "/docs/前端/框架/Vue/Vue3/Vue3基础/01.Vue3基础",
            icon: "https://cn.vuejs.org/logo.svg",
          },
        ],
      },
      {
        text: "React",
        items: [
          {
            text: "React",
            link: "/docs/前端/框架/React/01.React入门",
            icon: "https://gitee.com/xarzhi/picture/raw/master/img/react_light.svg",
          },
        ],
      },

      {
        text: "小程序",
        link: "/docs/前端/小程序/01.mina.md",
        icon: "https://gitee.com/xarzhi/picture/raw/master/img/uni.png",
      },

      {
        text: "🧭一些问题",
        link: "/docs/前端/一些问题/01.后端返回10万条数据.md",
      },
    ],
  },
  {
    text: "可视化",
    items: [
      {
        text: "Canvas",
        link: "/docs/前端/可视化/Canvas/01.认识Canvas",
        icon: "https://gitee.com/xarzhi/picture/raw/master/img/canva.svg",
      },
      {
        text: "Threejs",
        link: "/docs/前端/可视化/Three.js/基本使用/01.安装threejs",
        icon: "https://gitee.com/xarzhi/picture/raw/master/img/threejs-light.svg",
      },
      {
        text: "WebGl",
        link: "/docs/前端/可视化/WebGL/01.WebGL基础",
        icon: "https://gitee.com/xarzhi/picture/raw/master/img/threejs-light.svg",
      },
    ],
  },
  {
    text: "工具库",
    items: [
      {
        text: "Gsap",
        link: "/docs/前端/工具库/Gsap/快速开始/01.安装.md",
        icon: "https://gitee.com/xarzhi/picture/raw/master/img/gsap.png",
      },
    ],
  },
  {
    text: "打包工具",
    items: [
      {
        text: "Webpack",
        link: "/docs/前端/Webpack/01.Webpack基础.md",
        icon: "https://gitee.com/xarzhi/picture/raw/master/img/webpack.png",
      },
    ],
  },
  {
    text: "后端",
    items: [
      {
        text: "Node.js",
        link: "/docs/后端/Node.js/01.初识Node.js",
        icon: "https://gitee.com/xarzhi/picture/raw/master/img/nodejs.png",
      },
      {
        text: "C++",
        items: [
          {
            text: "C++基础",
            link: "/docs/后端/C++/C++基础/C++基础/01.环境配置.md",
            icon: "https://gitee.com/xarzhi/picture/raw/master/img/c-plusplus.svg",
          },
          {
            text: "QT",
            link: "/docs/后端/C++/C++基础/01.环境配置.md",
            icon: "https://gitee.com/xarzhi/picture/raw/master/img/qt.svg",
          },
          {
            text: "Win32 api",
            link: "/docs/后端/C++/Win32/01.基础知识.md",
            icon: "https://gitee.com/xarzhi/picture/raw/master/img/c-plusplus.svg",
          },
          {
            text: "MFC",
            link: "/docs/后端/C++/MFC/MFC基础/01.环境配置.md",
            icon: "https://gitee.com/xarzhi/picture/raw/master/img/c-plusplus.svg",
          },
         
        ],
      },
      {
        text: "C#",
        items: [
          {
            text: "C#基础",
            link: "/docs/后端/CS/CS基础/CS基础/01.环境配置.md",
            icon: "https://gitee.com/xarzhi/picture/raw/master/img/csharp.svg",
          },
          {
            text: "Winform",
            link: "/docs/后端/CS/Winform/Winform基础/01.第一个窗口.md",
            icon: "https://gitee.com/xarzhi/picture/raw/master/img/csharp.svg",
          },
          {
            text: "WPF",
            link: "/docs/后端/CS/WPF/01.环境配置.md",
            icon: "https://gitee.com/xarzhi/picture/raw/master/img/c-plusplus.svg",
          },
        ],
      },
      {
        text: "Rust",
        items: [
          {
            text: "Rust基础",
            link: "/docs/后端/Rust/Rust基础/01.环境搭建.md",
            icon: "https://gitee.com/xarzhi/picture/raw/master/img/rust.svg",
          },
        ],
      },
    ],
  },
  {
    text: "学习git",
    link: "/docs/学习git/git",
  },
  {
    text: "其他问题",
    link: "/docs/其他问题/01.Typora使用PicGo实现图床",
  },
];

function concatenateIconToText(data) {
  data.forEach((item) => {
    const img = item.icon
      ? `<img src='${item.icon}' onerror="this.style.display='none'"/>`
      : "";
    item.text = `${img}${item.text}`;
    if (item.items && item.items.length > 0) {
      concatenateIconToText(item.items);
    }
  });
}
concatenateIconToText(nav);

export default nav;
