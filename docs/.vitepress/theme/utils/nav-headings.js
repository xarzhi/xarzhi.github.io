import { slugify } from '@mdit-vue/shared'

/**
 * 网址导航页的锚点 id 规则。
 *
 * 这里必须和 VitePress 生成 heading id 的规则保持完全一致（@mdit-vue/shared 的 slugify），
 * 否则右侧「当前页大纲」里的链接点了不会滚到对应位置、也不会高亮。
 */

/** 分组标题（h2）的锚点 id，例如「实用工具」→ 实用工具、「UI 组件」→ ui-组件 */
export const sectionId = (title) => slugify(String(title ?? ''))

/**
 * tab（h3）的锚点 id：带上分组前缀，避免不同分组下同名 tab 撞车。
 * 「前端」+「开发框架」→ 前端-开发框架
 */
export const tabId = (sectionTitle, tabTitle) => slugify(`${sectionTitle} ${tabTitle}`)

/**
 * 该分组的 items 是否带了二级 tab。
 * 用 some 而不是只看 items[0]，免得数据里出现「部分有 tab、部分没有」时判断错。
 */
export const hasTabs = (items) => Array.isArray(items) && items.some((item) => Array.isArray(item?.items))
