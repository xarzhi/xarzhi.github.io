雷姆看板娘资源说明
==================

本目录下的文件都是从 npm 拉取后本地化的，站点运行时不请求任何外部 CDN。

1) oml2d.min.js
   - 来源：oh-my-live2d@0.19.3（https://github.com/oh-my-live2d/oh-my-live2d）
   - 许可证：MIT
   - 说明：已内置 Cubism 2 / Cubism 5 SDK，全局变量名 OML2D

2) rem/（雷姆模型，Cubism 2 格式）
   - 来源：npm 包 live2d-widget-model-rem@1.0.1 的 assets/ 目录
   - 入口文件：rem/assets/rem.model.json
   - 说明：模型素材版权归原作者所有，仅用于个人非商业展示

如需更换模型，把新模型的 json 路径填到
docs/.vitepress/theme/components/Live2dRem.vue 的 MODEL_PATH 即可。
