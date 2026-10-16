# 项目：xarzhi（VitePress 学习笔记站）

- 包管理器：**pnpm**（存在 `node_modules/.pnpm`）。
- 内容目录：`docs/docs`（约 956 个 md）；站点根 = `docs`。
- 命令：根 `package.json` 的 `dev/build/preview` → `vitepress dev|build|preview docs`（带 `--max-old-space-size=8192`）。

## 性能约定（勿回退）
- **dev 下必须关闭本地搜索**：`search.provider: 'local'` 会在启动时渲染全部 956 页来建索引，Shiki 高亮占启动耗时 ~55%，实测拖到 ~45s。现用 `isDev ? false : {provider:'local'}`（见 `config.mjs`）。dev 启动因此从 45s → 5s。dev 想要搜索可用 `vitepress-plugin-pagefind`/Algolia。
- **不要开 `lastUpdated: true`**：会按页 spawn `git log`，956 页 ≈ 5 分钟（本机 ≈311ms/次）。
- element-plus 走**按需自动引入**（`unplugin-vue-components` + `ElementPlusResolver`）；**不要**再 `app.use(ElementPlus)` 全量引入 / `import 'element-plus/dist/index.css'`。
- Sass 只能写在 `vite.css.preprocessorOptions`，`api: 'modern-compiler'`（依赖 `sass-embedded`）。**VitePress UserConfig 没有顶层 `css` 选项**。

## 本机调试注意
- 判断 dev server 就绪用端口探测（curl 200），不要 grep 日志（重定向会缓冲）。
- 后台计时脚本用 `;` 分隔命令，避免 `&&` 链后 `$!` 指错进程。`wmic` 被禁用，用 `tasklist`/`netstat`。
- 定位启动热点用 `node --cpu-prof --cpu-prof-dir=<dir> <script>`（脚本内 `createServer`+`listen`+`close`+`exit`），解析 `.cpuprofile` 的 `hitCount` 求自耗时。
