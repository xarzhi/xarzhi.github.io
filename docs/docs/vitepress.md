# Vitepress

## 1.什么是Vitepress

[VitePress](https://vitepress.dev/zh/) 是一个静态站点生成器 (SSG)，专为构建快速、以内容为中心的站点而设计。简而言之，VitePress 获取用 Markdown 编写的内容，对其应用主题，并生成可以轻松部署到任何地方的静态 HTML 页面。

## 2.创建项目

### 2.1 前置条件

- **Node.js18** 及以上版本。
- 通过命令行界面 (CLI) 访问 VitePress 的终端。
- 支持Markdown语法的编辑器。
  - 推荐 [VSCode](https://code.visualstudio.com/) 及其[官方 Vue 扩展](https://marketplace.visualstudio.com/items?itemName=Vue.volar)。

### 2.2 创建项目

创建项目文件夹，并在项目根目录处打开终端

```sh
mkdir <projectName>
cd <projectName>
```

### 2.3 初始化项目

生成`package.json`

```sh
npm init -y
```

### 2.4 安装vitepress依赖

::: code-group

```sh [npm]
$ npm add -D vitepress
```

```sh [pnpm]
$ pnpm add -D vitepress
```

```sh [yarn]
$ yarn add -D vitepress
```

```sh [bun]
$ bun add -D vitepress
```

:::

### 2.5 初始化vitepress项目

::: code-group

```sh [npm]
$ npx vitepress init
```

```sh [pnpm]
$ pnpm vitepress init
```

```sh [yarn]
$ yarn vitepress init
```

```sh [bun]
$ bun vitepress init
```

:::

将需要回答几个简单的问题：

```
┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./docs
│
◇  Site title:
│  My Awesome Project
│
◇  Site description:
│  A VitePress Site
│
◇  Theme:
│  ● Default Theme (Out of the box, good-looking docs)
│  ○ Default Theme + Customization
│  ○ Custom Theme
│
◇  Add VitePress npm scripts to package.json?
│  Yes
```

:::tip Vue 作为 peer dependency
如果打算使用 Vue 组件或 API 进行自定义，还应该明确地将 `vue` 安装为 dependency。
:::

### 2.6 文件结构

```
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.js
│  ├─ api-examples.md
│  ├─ markdown-examples.md
│  └─ index.md
└─ package.json
```

`docs` 目录作为 VitePress 站点的项目**根目录**。`.vitepress` 目录是 VitePress 配置文件、开发服务器缓存、构建输出和可选主题自定义代码的位置。

:::tip
默认情况下，VitePress 将其开发服务器缓存存储在 `.vitepress/cache` 中，并将生产构建输出存储在 `.vitepress/dist` 中。如果使用 Git，应该将它们添加到 `.gitignore` 文件中。也可以手动[配置](../reference/site-config#outdir)这些位置。
:::



### 2.7 配置文件

配置文件 (`.vitepress/config.js`) 让你能够自定义 VitePress 站点的各个方面，最基本的选项是站点的标题和描述：

```js
// .vitepress/config.js
export default {
  // 站点级选项
  title: 'VitePress',
  description: 'Just playing around.',

  themeConfig: {
    // 主题级选项
  }
}
```

还可以通过 `themeConfig` 选项配置主题的行为。有关所有配置选项的完整详细信息，请参见[配置参考](https://vitepress.dev/zh/reference/site-config)。



### 2.8 源文件

`.vitepress` 目录之外的 Markdown 文件被视为**源文件**。

VitePress 使用 **基于文件的路由**：每个 `.md` 文件将在相同的路径被编译成为 `.html` 文件。例如，`index.md` 将会被编译成 `index.html`，可以在生成的 VitePress 站点的根路径 `/` 进行访问。

VitePress 还提供了生成简洁 URL、重写路径和动态生成页面的能力。这些将在[路由指南](https://vitepress.dev/zh/guide/routing)中进行介绍。



### 2.9 启动并运行

 `package.json` 中我们可以看到相应的脚本

```json
{
  ...
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  ...
}
```

`docs:dev` 脚本将启动具有即时热更新的本地开发服务器。使用以下命令运行它：

::: code-group

```sh [npm]
$ npm run docs:dev
```

```sh [pnpm]
$ pnpm run docs:dev
```

```sh [yarn]
$ yarn docs:dev
```

```sh [bun]
$ bun run docs:dev
```

:::

除了 npm 脚本，还可以直接调用 VitePress：

::: code-group

```sh [npm]
$ npx vitepress dev docs
```

```sh [pnpm]
$ pnpm vitepress dev docs
```

```sh [yarn]
$ yarn vitepress dev docs
```

```sh [bun]
$ bun vitepress dev docs
```

:::

运行打开`http://localhost:5173`，我们可以看到出现如下页面

![image-20240522145503806](https://gitee.com/xarzhi/picture/raw/master/img/image-20240522145503806.png)

更多的命令行用法请参见 [CLI 参考](../reference/cli)。



## 3.页面配置

### 3.1 首页界面

根目录的`docs`里，通过`index.md`配置首页界面样式及内容

```markdown
---
layout: home
hero:
    name: Fade away
    tagline: 花有重开日，人无再少年
    image:
        src: /lufy.png
        alt: VitePress
    actions:
        - theme: brand
          text: VitePress
          link: /docs/vitepress
        - theme: alt
          text: 网址导航
          link: /docs/收藏的网站/index
features:
    - icon: ⚡️
      title: 首先，这是首先
    - icon: 🖖
      title: 其次，这是其次
    - icon: 🛠️
      title: 然后，就没啦
---
```

如下图所示

![image-20240522152307651](https://gitee.com/xarzhi/picture/raw/master/img/image-20240522152307651.png)

:::tip
`image`图片应该放在`docs`里的`public`里，没有就新建，

`config.mjs`中要添加`base:'/'`

```js
export default defineConfig({
	base: '/',
    // ...
})
```

:::

### 3.2 导航栏

`.vitepress/config.mjs`文件中，通过配置`themeConfig`里的`nav`，来配置顶部导航

```ts
type NavItem = NavItemWithLink | NavItemWithChildren

interface NavItemWithLink {
    text: string
    link: string
    items?: never
    activeMatch?: string
    rel?: string
    target?: string
    noIcon?: boolean
}
export interface NavItemChildren {
    text?: string
    items: NavItemWithLink[]
}

export interface NavItemWithChildren {
    text?: string
    items: (NavItemChildren | NavItemWithLink)[]
    activeMatch?: string
}


const nav:NavItem[]=[]
themeConfig: {
    nav,
    // ...
}
```

我自己网站的

```js
export default [
    {
        text: '前端',
        items: [
            {
                text: '前端三剑客',
                items: [
                    {
                        text: '🍉Html',
                        link: '/docs/前端/前端三剑客/Html/01.Html初识',
                    },
                    {
                        text: '🍊CSS',
                        link: '/docs/前端/前端三剑客/CSS/CSS/01.引入css样式表',
                    },
                    {
                        text: '🍇JavaScript',
                        link: '/docs/前端/前端三剑客/javascript/js基础/01.js基础语法',
                    },
                ],
            },
            {
                text: '框架',
                items: [
                    { text: '😺Vue', link: '/docs/前端/框架/Vue/Vue2/01.Vue基础' },
                    { text: '🐨React', link: '/docs/前端/框架/React/01.React入门' },
                ],
            },
            {
                text: '可视化',
                items: [
                    { text: '🍬Canvas', link: '/docs/前端/可视化/Canvas/01.认识Canvas' },
                    { text: '🍭WebGl', link: '/docs/前端/可视化/WebGL/01.WebGL基础' },
                    { text: '🍦Threejs', link: '/docs/前端/可视化/Three.js/01.基础用法' },
                ],
            },
            {
                text: '🛀小程序',
                link: '/docs/前端/小程序/01.mina.md',
            },
            {
                text: '⛵Webpack',
                link: '/docs/前端/Webpack/01.Webpack基础.md',
            },
        ],
    },
    {
        text: '后端',
        items: [
            {
                text: '🍔Node.js',
                link: '/docs/后端/Node.js/01.初识Node.js',
            },
            {
                text: '⚡C++',
                link: '/docs/后端/C++/01.环境配置',
            },
        ],
    },
    {
        text: '学习git',
        link: '/docs/学习git/git',
    },
    {
        text: '收藏网址',
        link: '/docs/收藏的网站/index',
    },
]
```



### 3.3 侧边栏

`.vitepress/config.mjs`文件中，通过配置`themeConfig`里的`sidebar`，来配置侧边栏导航

```ts
type Sidebar = SidebarItem[] | SidebarMulti

interface SidebarMulti {
    [path: string]: SidebarItem[] | { items: SidebarItem[]; base: string }
}

type SidebarItem = {
    text?: string
    link?: string
    items?: SidebarItem[]
    collapsed?: boolean
    base?: string
    docFooterText?: string
    rel?: string
    target?: string
}
```



## 4.部署github pages

### 4.1 添加.gitignore

`vitepress`创建的项目没有自动生成`.gitignore`文件，需要我们手动创建，不然会把`node_modules`等不需要的内容上传到`github`

根目录下创建`.gitignore`

> .gitignore

```
node_modules
.DS_Store
dist
dist-ssr
cache
.cache
.temp
*.local
```



### 4.2 打包

运行打包指令

::: code-group

```sh [npm]
$ npx run docs:build
```

```sh [pnpm]
$ pnpm run docs:build
```

```sh [yarn]
$ yarn docs:build
```

```sh [bun]
$ bun run docs:build
```

:::

打包后的内容会出现在`.vitepress/dist`中



### 4.3 创建github仓库

`github`右上角`New repository`创建新仓库

![image-20240522153045830](https://gitee.com/xarzhi/picture/raw/master/img/image-20240522153045830.png)



::: tip

若想最后的网站链接如`xxxx.github.io`形式，仓库名应设置为`xxxx.github.io`，`xxxx`应和`github`账号名一致，然后点击`create repository`

:::

![image-20240522153242492](https://gitee.com/xarzhi/picture/raw/master/img/image-20240522153242492.png)

:::tip

若部署的网站为子网站，即`xxxx.github.io/yyyy`格式，需要修改`config.mjs`中的`base`为`'/yyyy/'`

:::

### 4.4 上传代码

在项目根目录下打开终端，或`git bash`，输入如下指令

```sh
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/xarzhi/xiazhi.git //切换为自己的仓库地址
git push -u origin main
```



### 4.5 设置pages部署形式

按步骤选择`Setting=>pages=>Deploy from a branch=>GitHub Actions`

![image-20240522153749206](https://gitee.com/xarzhi/picture/raw/master/img/image-20240522153749206.png)

### 4.6 创建工作流

#### 4.5.1 github中创建

选择好`Github Actions`之后点击`browse all workflows`

![image-20240522154834662](https://gitee.com/xarzhi/picture/raw/master/img/image-20240522154834662.png)

或者从上方`Actions`处进入，之后点击`set up a workflow yourself` 

![image-20240522155002255](https://gitee.com/xarzhi/picture/raw/master/img/image-20240522155002255.png)

复制以下内容，看情况修改部分内容

> deploy.yml

```yml
# Sample workflow for building and deploying a VitePress site to GitHub Pages
#
name: Deploy VitePress site to Pages

on:
    # Runs on pushes targeting the `main` branch. Change this to `master` if you're
    # using the `master` branch as the default branch.
    push:
        branches: [main]

    # Allows you to run this workflow manually from the Actions tab
    workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
    contents: read
    pages: write
    id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
    group: pages
    cancel-in-progress: false

jobs:
    # Build job
    build:
        runs-on: ubuntu-latest
        steps:
            - name: Checkout
              uses: actions/checkout@v4
              with:
                  fetch-depth: 0 # Not needed if lastUpdated is not enabled
            # - uses: pnpm/action-setup@v3 # Uncomment this if you're using pnpm
            # - uses: oven-sh/setup-bun@v1 # Uncomment this if you're using Bun
            - name: Setup Node
              uses: actions/setup-node@v4
              with:
                  node-version: 20
                  cache: yarn # or pnpm / yarn
            - name: Setup Pages
              uses: actions/configure-pages@v4
            - name: Install dependencies
              run: yarn # or pnpm install / yarn install / bun install
            - name: Build with VitePress
              run: yarn run docs:build # or pnpm docs:build / yarn docs:build / bun run docs:build
            - name: Upload artifact
              uses: actions/upload-pages-artifact@v3
              with:
                  path: docs/.vitepress/dist

    # Deployment job
    deploy:
        environment:
            name: github-pages
            url: ${{ steps.deployment.outputs.page_url }}
        needs: build
        runs-on: ubuntu-latest
        name: Deploy
        steps:
            - name: Deploy to GitHub Pages
              id: deployment
              uses: actions/deploy-pages@v4
```

复制好之后修改文件名为`deploy.yml`，也可以不改，改了好看

之后点击右上角`commit changes...`

![image-20240522155308955](https://gitee.com/xarzhi/picture/raw/master/img/image-20240522155308955.png)

然后点击`commit changes`

![image-20240522155435153](https://gitee.com/xarzhi/picture/raw/master/img/image-20240522155435153.png)

在此之后，仓库中会多一此commit记录，并且在项目根目录中会新增一个`.github/workflows/deploy.yml`文件，以后每次push代码，都会自动部署更新我们的静态网站



#### 4.5.2 项目中创建

除了上面方法，也可以直接在项目根目录创建`.github/workflows/deploy.yml`文件，复制上面`deploy.yml`内容，之后push代码进仓库



### 4.7 部署成功

再次进入`Github pages`页面，若部署成功，会显示我们的网站，点进去即可看到

以后每次更新内容，只用`push`代码，`github`会自动帮我们更新部署

![image-20240522155932701](https://gitee.com/xarzhi/picture/raw/master/img/image-20240522155932701.png)

效果

