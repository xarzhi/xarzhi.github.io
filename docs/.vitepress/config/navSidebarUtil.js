import { resolve, join, sep } from 'path'
import { readdirSync, statSync } from 'fs'

/**
 * 判断是否为markdown文件
 * @param fileName 文件名
 * @returns 有返回值则表示是markdown文件,否则不是
 */
function isMarkdownFile(fileName) {
	return !!fileName.match(/.+\.md$/)
}

// 获取docs目录的完整名称(从根目录一直到docs目录)
const docsDirFullPath = join(__dirname, '../')
// 获取docs目录的完整长度
const docsDirFullPathLen = docsDirFullPath.length

/**
 * 获取dirOrFileFullName中第一个/docs/后的所有内容
 *  如:
 * /a-root/docs/test 则 获取到 /test
 * /a-root-docs/docs/test 则 获取到 /test
 * /a-root-docs/docs/docs/test 则 获取到 /docs/test
 * @param dirOrFileFullName 文件或者目录名
 * @returns
 */
function getDocsDirNameAfterStr(dirOrFileFullName) {
	// 使用docsDirFullPathLen采用字符串截取的方式，避免多层目录都叫docs的问题
	return `${sep}${dirOrFileFullName.substring(docsDirFullPathLen)}`
}

export function getSidebarData(sidebarGenerateConfig = {}) {
	const {
		dirName = 'docs',
		ignoreFileName = 'index.md',
		ignoreDirNames = ['demo', 'asserts'],
	} = sidebarGenerateConfig

	// 获取目录的绝对路径
	const dirFullPath = resolve(__dirname, `../${dirName}`)
	const allDirAndFileNameArr = readdirSync(dirFullPath)
	const obj = {}

	allDirAndFileNameArr.map(dirName => {
		let subDirFullName = join(dirFullPath, dirName)

		const property = getDocsDirNameAfterStr(subDirFullName).replace(/\\/g, '/') + '/'
		const arr = getSideBarItemTreeData(subDirFullName, 1, 3, ignoreFileName, ignoreDirNames)

		obj[property] = arr
	})

	return obj
}

function getSideBarItemTreeData(dirFullPath, level, maxLevel, ignoreFileName, ignoreDirNames) {
	// 获取所有文件名和目录名
	const allDirAndFileNameArr = readdirSync(dirFullPath)
	const result = []
	allDirAndFileNameArr.map((fileOrDirName, idx) => {
		const fileOrDirFullPath = join(dirFullPath, fileOrDirName)
		const stats = statSync(fileOrDirFullPath)
		if (stats.isDirectory()) {
			if (!ignoreDirNames.includes(fileOrDirName)) {
				const text = fileOrDirName.match(/^[0-9]{2}-.+/) ? fileOrDirName.substring(3) : fileOrDirName
				// 当前为文件夹
				const dirData = {
					text,
					collapsed: false,
				}
				if (level !== maxLevel) {
					dirData.items = getSideBarItemTreeData(
						fileOrDirFullPath,
						level + 1,
						maxLevel,
						ignoreFileName,
						ignoreDirNames
					)
				}
				if (dirData.items) {
					dirData.collapsible = true
				}
				result.push(dirData)
			}
		} else if (isMarkdownFile(fileOrDirName) && ignoreFileName !== fileOrDirName) {
			// 当前为文件
			const matchResult = fileOrDirName.match(/(.+)\.md/)
			let text = matchResult ? matchResult[1] : fileOrDirName
			text = text.match(/^[0-9]{2}-.+/) ? text.substring(3) : text

			const fileData = {
				text,
				link: getDocsDirNameAfterStr(fileOrDirFullPath).replace('.md', '').replace(/\\/g, '/'),
			}

			result.push(fileData)
		}
	})

	return result
}

export function getNavData(navGenerateConfig = {}) {
	const { dirName = 'docs', maxLevel = 2 } = navGenerateConfig
	const dirFullPath = resolve(__dirname, `../${dirName}`)
	const result = getNavDataArr(dirFullPath, 1, maxLevel)

	return result
}

/**
 * 获取顶部导航数据
 *
 * @param   {string}     dirFullPath  当前需要遍历的目录绝对路径
 * @param   {number}     level        当前层级
 * @param   {number[]}   maxLevel     允许遍历的最大层级
 * @return  {NavItem[]}               导航数据数组
 */
function getNavDataArr(dirFullPath, level, maxLevel) {
	// 获取所有文件名和目录名
	const allDirAndFileNameArr = readdirSync(dirFullPath)
	const result = []

	allDirAndFileNameArr.map((fileOrDirName, idx) => {
		const fileOrDirFullPath = join(dirFullPath, fileOrDirName)
		const stats = statSync(fileOrDirFullPath)
		const link = getDocsDirNameAfterStr(fileOrDirFullPath).replace('.md', '').replace(/\\/g, '/')

		const text = fileOrDirName.match(/^[0-9]{2}-.+/) ? fileOrDirName.substring(3) : fileOrDirName

		if (stats.isDirectory()) {
			// 当前为文件夹
			const dirData = {
				text,
				link: `${link}/`,
			}

			if (level !== maxLevel) {
				const arr = getNavDataArr(fileOrDirFullPath, level + 1, maxLevel).filter(v => v.text !== 'index.md')
				if (arr.length > 0) {
					// @ts-ignore
					dirData.items = arr
					delete dirData.link
				}
			}

			dirData.activeMatch = link + '/'
			result.push(dirData)
		} else if (isMarkdownFile(fileOrDirName)) {
			// 当前为文件
			const fileData = {
				text,
				link,
			}
			fileData.activeMatch = link + '/'
			result.push(fileData)
		}
	})

	return result
}
