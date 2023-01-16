const { DateTime } = require('luxon')
const shikiTwoslash = require('eleventy-plugin-shiki-twoslash')
const rssPlugin = require('@11ty/eleventy-plugin-rss')
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const { getColourFromString } = require('./src/utils/getColourFromString')
const slugify = require('@alexcarpenter/slugify')
const pluginTOC = require('eleventy-plugin-nesting-toc')
const heroIcons = require('eleventy-plugin-heroicons')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const markdownItWikilinks = require('markdown-it-wikilinks')
const markdownItCopyCode = require('markdown-it-code-copy')
// const PostCSSPlugin = require('eleventy-plugin-postcss')

module.exports = function (eleventyConfig) {
  // Plugins
  // eleventyConfig.addPlugin(PostCSSPlugin)
  eleventyConfig.addPlugin(rssPlugin)
  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.addPlugin(shikiTwoslash, {
    themes: ['dark-plus', 'light-plus'],
  })
  eleventyConfig.addPlugin(pluginTOC, {
    ignoredElements: ['.visually-hidden', '[aria-hidden]'],
  })
  eleventyConfig.addPlugin(heroIcons, {
    className: 'icon',
    errorOnMissing: true,
  })

  let options = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  }
  eleventyConfig.setLibrary('md', markdownIt(options))
  eleventyConfig.amendLibrary('md', (mdLib) =>
    mdLib.use(markdownItAnchor, {
      permalink: true,
      safariReaderFix: true,
      permalink: markdownItAnchor.permalink.linkInsideHeader({
        symbol: `
        <span class="visually-hidden">Jump to heading</span>
        <span aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon inline-block" width="20">
        <path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
      </svg>
      </span>
      `,
        placement: 'after',
      }),
      slugify: (s) => slugify(s),
    })
  )
  eleventyConfig.amendLibrary('md', (mdLib) => mdLib.use(markdownItWikilinks()))
  eleventyConfig.amendLibrary('md', (mdLib) => mdLib.use(markdownItCopyCode))

  // Filters
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd')
  })

  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
      'dd LLL, yyyy'
    )
  })

  // Collections
  // Tags
  eleventyConfig.addCollection('tagList', (collection) => {
    const tagsObject = {}
    collection.getAll().forEach((item) => {
      if (!item.data.tags) return
      item.data.tags
        .filter((tag) => !['post', 'all'].includes(tag))
        .forEach((tag) => {
          if (typeof tagsObject[tag] === 'undefined') {
            tagsObject[tag] = 1
          } else {
            tagsObject[tag] += 1
          }
        })
    })

    const tagList = []

    Object.keys(tagsObject).forEach((tag) => {
      const tagName = slugify(tag)
      tagList.push({
        name: tag,
        count: tagsObject[tag],
        color: getColourFromString(tagName),
        path: tagName,
      })
    })
    return tagList.sort((a, b) => b.count - a.count)
  })

  // Notes
  eleventyConfig.addCollection('notes', (collection) => {
    return collection.getFilteredByGlob('src/notes/*.md').sort((a, b) => {
      const aDate = new Date(a.data.modified) || new Date(a.data.created)
      const bDate = new Date(b.data.modified) || new Date(b.data.created)
      return aDate.getTime() / 1000 < bDate.getTime() / 1000 ? 1 : -1
    })
  })

  eleventyConfig.addShortcode('tagDisplay', function (tag) {
    const tagName = slugify(tag)
    const tagColor = getColourFromString(tagName)
    return `<span class="tag" style="background-color: ${tagColor};">${tag}</span>`
  })
  eleventyConfig.addShortcode('tagLink', function (tag) {
    const tagName = slugify(tag)
    const tagColor = getColourFromString(tagName)
    return `<a href="/tags/${tagName}" class="tag" style="background-color: ${tagColor};">${tag}</a>`
  })
  eleventyConfig.addShortcode('tagDot', function (tag) {
    const tagName = slugify(tag)
    const tagColor = getColourFromString(tagName)
    return `<span class="tagDot" style="background-color: ${tagColor};"></span>`
  })

  return {
    markdownTemplateEngine: false,
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
    },
  }
}
