import DefaultTheme from "vitepress/theme";
import "./style/index.css";
import "./style/home.scss";
import "./style/nav.scss";
import "./style/blur.css";
import mouseClick from "./utils/mouse-click-particles";
import mediumZoom from "medium-zoom";
import { onMounted, watch, nextTick } from "vue";
import { useRoute, useData, useRouter } from "vitepress";
import { h } from "vue";
import { register } from "./components/index";
import Layout from "./Layout.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    
    // 注册全局组件
    register(app);
    app.component("Layout", Layout);
    app.use(ElementPlus);
  },
  Layout: () => {
    const props = {};
    const { frontmatter } = useData();
    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass;
    }
    return h(Layout, props);
  },
  setup() {
    mouseClick(document);
    const route = useRoute();
    const router = useRouter();
    const initZoom = () => {
      mediumZoom(".main img,div:not(a) > img", {
        background: "rgba(0, 0, 0, 0.6)",
      });
    };
    const addOpenBtnOnSidebar = () => {
      nextTick(() => {
        const sidebar = document.querySelector("ul.VPDocOutlineItem.root");
        const lis = sidebar.children;
        for (let item of lis) {
          const childUl = item.querySelector("ul.VPDocOutlineItem.nested");
          if (childUl) {
            item.style.position = "relative";
            item.style.overflow = "hidden";
            const openBtn_box = document.createElement("span");
            openBtn_box.classList.add("openBtn_box");
            const openBtn = document.createElement("button");
            openBtn.classList.add("openBtn");
            openBtn.innerText = "+";
            openBtn_box.append(openBtn);
            item.append(openBtn_box);
            childUl.style.transition = "all 0.5s";

            childUl.style.height = 0;
            openBtn.addEventListener("click", (e) => {
              childUl.style.height =
                childUl.style.height === "0px" ? "auto" : 0;
            });
            const childLis = childUl.children;
            for (let childLi of childLis) {
              childLi.addEventListener("click", (e) => {
                const parentTitle = item.querySelector("a").innerText;
                const path = parentTitle + "/" + e.target.innerText;
                router.go("docs/收藏的网站/#" + path);
                // location.hash = "+ path;
                console.log(path);
              });
            }
          }
        }
      });
    };
    onMounted(() => {
      initZoom();
      // addOpenBtnOnSidebar();
    });
    window.$app = app;
    watch(
      () => route.path,
      () =>
        nextTick(() => {
          initZoom();
          // addOpenBtnOnSidebar();
        })
    );
  },
};
