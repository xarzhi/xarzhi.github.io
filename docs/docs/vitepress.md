# Vitepress

## 1.什么是Vitepress

[VitePress](https://vitepress.dev/zh/) 是一个**静态站点生成器** (SSG)，专为构建快速、以内容为中心的站点而设计。

简而言之，VitePress 获取用 Markdown 编写的内容，对其应用主题，并生成可以轻松部署到任何地方的静态 HTML 页面。

应用场景：个人博客、技术文档

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
◇  Where should VitePress initialize the config?					配置文件保存文件夹
│  ./docs
│
◇  Site title:														网站标题
│  My Awesome Project
│
◇  Site description:												网站描述
│  A VitePress Site
│
◇  Theme:															选择网站样式主题
│  ● Default Theme (Out of the box, good-looking docs)
│  ○ Default Theme + Customization
│  ○ Custom Theme
│ 
◇  Use TypeScript for config and theme files?						是否使用Ts
│  No
│
◇  Add VitePress npm scripts to package.json?						是否在package.json中写入相关指令
│  Yes
│
└  Done! Now run npm run docs:dev and start writing.
```

:::tip Vue 作为 peer dependency
如果打算使用 Vue 组件或 API 进行自定义，还应该明确地将 `vue` 安装为 dependency。
:::

### 2.6 文件结构

```
.
├─ docs								配置文件及文档存放目录
│  ├─ .vitepress					配置文件存档目录
│  │  └─ config.js					配置文件
│  ├─ api-examples.md				md文档案例
│  ├─ markdown-examples.md			md文档案例
│  └─ index.md						主页配置md文档
└─ package.json
```

`docs` 目录作为 VitePress 站点的项目**根目录**。`.vitepress` 目录是 VitePress 配置文件、开发服务器缓存、构建输出和可选主题自定义代码的位置。



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



### 4.2 创建github仓库

`github`右上角`New repository`创建新仓库

![image-20240522153045830](https://gitee.com/xarzhi/picture/raw/master/img/image-20240522153045830.png)



::: tip

若想最后的网站链接如`xxxx.github.io`形式，仓库名应设置为`xxxx.github.io`，`xxxx`应和`github`账号名一致，然后点击`create repository`

:::

![image-20240522153242492](https://gitee.com/xarzhi/picture/raw/master/img/image-20240522153242492.png)

:::tip

若部署的网站为子网站，即`xxxx.github.io/yyyy`格式，需要修改`config.mjs`中的`base`为`'/yyyy/'`

:::

### 4.3 上传代码

在项目根目录下打开终端，或`git bash`，输入如下指令

```sh
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/xarzhi/xiazhi.git //切换为自己的仓库地址
git push -u origin main
```



### 4.4 设置pages部署形式

按步骤选择`Setting=>pages=>Deploy from a branch=>GitHub Actions`

![image-20240522153749206](https://gitee.com/xarzhi/picture/raw/master/img/image-20240522153749206.png)

### 4.5 创建工作流

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

在此之后，仓库中会多一此commit记录，并且在项目根目录中会新增一个`.github/workflows/deploy.yml`文件，之后等待片刻再打开pages



#### 4.5.2 项目中创建

除了上面方法，也可以直接在项目根目录创建`.github/workflows/deploy.yml`文件，复制上面`deploy.yml`内容，之后push代码进仓库



### 4.6 部署成功

再次进入`Github pages`页面，若部署成功，会显示我们的网站，点进去即可看到

以后每次更新内容，只用`push`代码，`github`会自动帮我们更新部署

![image-20240522155932701](https://gitee.com/xarzhi/picture/raw/master/img/image-20240522155932701.png)

效果

![image-20240522160815725](https://gitee.com/xarzhi/picture/raw/master/img/image-20240522160815725.png)





之后进入`Actions`界面，会显示每次的部署记录，若部署失败，可以点击进入查看失败原因

![image-20240522161824842](https://gitee.com/xarzhi/picture/raw/master/img/image-20240522161824842.png)





## 5.公共组件

### 5.1 单独使用

可以在md文件中直接使用一个`script`标签，使用`vue3`的语法导入相应的组件

:::code-group

```markdown [test.md] {1-3,8}
<script setup>
import Test from './test.vue'
</script>


# 测试用例

<Test/>
```

:::



### 5.2 公共组件

在`.vitepress`文件夹下创建`theme`文件夹，并创建`index.js`文件，写入如下内容

```js {2,8}
import DefaultTheme from 'vitepress/theme'
import Circle from "./compnents/Circle.vue";

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        // 注册自定义全局组件
        app.component("Circle", Circle);
    }
}
```

之后就可以直接在`md`文档中使用组件，使用方式和`vue3`中使用组件方式一样



## 6.markdown扩展

### 6.1 自定义容器

#### 默认样式

`markdown`输入

```
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

`Html`输出

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::



#### 自定义标题

容器的 `type`之后附加文本来设置自定义标题

`markdown`输入

````
::: danger STOP
危险区域，请勿继续
:::

::: details 点我查看代码
```js
console.log('Hello, VitePress!')
```
:::
````

`Html`输出

::: danger STOP
危险区域，请勿继续
:::

::: details 点我查看代码
```js
console.log('Hello, VitePress!')
```
:::



此外，可以通过在站点配置中添加以下内容来全局设置自定义标题，如果不是用英语书写，这会很有帮助：

:::code-group

```js
// config.ts
export default defineConfig({
  // ...
  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  }
  // ...
})
```

:::



### 6.2 指定行高亮

#### 基本语法

语法如下，也就是通过在`{}`填入相应的行号

````markdown
```js {4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

效果如下所示

```js {4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

#### 多行高亮

除了单行之外，还可以指定多个单行、多行，或两者均指定：

- 多行：例如 `{5-8}`、`{3-10}`、`{10-17}`
- 多个单行：例如 `{4,7,9}`
- 多行与单行：例如 `{4,7-13,16,23-27,40}`

````markdown
```js{1,4,6-8}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VitePress is awesome',
      lorem: 'ipsum'
    }
  }
}
```
````

如下所示

```js {1,4,6-8}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VitePress is awesome',
      lorem: 'ipsum'
    }
  }
}
```

#### 通过注释实现

也可以使用 `// [!code highlight]` 注释实现行高亮。

````markdown
```js
export default {
  data () {
    return {
      msg: 'Highlighted!' // [!code highlight]
    }
  }
}
```
````

效果如下

```js
export default {
  data () {
    return {
      msg: 'Highlighted!' // [!code highlight]
    }
  }
}
```



### 6.3 代码块聚焦

在某一行上添加 `// [!code focus]` 注释将聚焦它并模糊代码的其他部分。

::: raw

```
```js								// [!code focus]
export default {					// [!code focus]
  data () {							// [!code focus]
    return {						// [!code focus]
      msg: 'Focused!' 				// // [!code focus] [!code focus]
    }								// [!code focus]
  }									// [!code focus]
}									// [!code focus]
```									// [!code focus]
```

:::





效果如下

```js
export default {
  data () {
    return {
      msg: 'Focused!' // [!code focus]
    }
  }
}
```



### 6.4 代码块中的颜色差异

在某一行添加 `// [!code --]` 或 `// [!code ++]` 注释将会为该行创建 diff，同时保留代码块的颜色。

```js
export default {
  data () {
    return {
      msg: 'Removed' // [!code --]
      msg: 'Added' // [!code ++]
    }
  }
}
```





### 6.5 高亮“错误”和“警告”

在某一行添加 `// [!code warning]` 或 `// [!code error]` 注释将会为该行相应的着色。

```js
export default {
  data () {
    return {
      msg: 'Error', // [!code error]
      msg: 'Warning' // [!code warning]
    }
  }
}
```



### 6.6 行号

可以通过以下配置为每个代码块启用行号：

:::code-group 

```js [config.js]
export default {
  markdown: {
    lineNumbers: true
  }
}
```

:::

查看 [`markdown` 选项](https://vitepress.dev/zh/reference/site-config#markdown) 获取更多信息。

可以在代码块中添加 `:line-numbers` / `:no-line-numbers` 标记来覆盖在配置中的设置。

还可以通过在 `:line-numbers` 之后添加 `=` 来自定义起始行号，例如 `:line-numbers=2` 表示代码块中的行号从 2 开始。

````md


```ts:line-numbers {1}
// 启用行号
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers=2 {1}
// 行号已启用，并从 2 开始
const line3 = 'This is line 3'
const line4 = 'This is line 4'
```
````

效果如下

```ts {1}
// 默认禁用行号
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers {1}
// 启用行号
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers=2 {1}
// 行号已启用，并从 2 开始
const line3 = 'This is line 3'
const line4 = 'This is line 4'
```



### 6.5 代码组

````md
::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```

:::
````

效果如下

::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```

:::





### 6.5 图片懒加载

```js [config.js]
export default {
  markdown: {
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true
    }
  }
}
```

