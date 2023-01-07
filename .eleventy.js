const { DateTime } = require('luxon')
const shikiTwoslash = require('eleventy-plugin-shiki-twoslash')
const rssPlugin = require('@11ty/eleventy-plugin-rss')
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const { getColourFromString } = require('./src/utils/getColourFromString')
const slugify = require('@alexcarpenter/slugify')

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(rssPlugin)
  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.addPlugin(shikiTwoslash, { theme: 'nord' })

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
    return tagList.sort((a, b) => b.tagCount - a.tagCount)
  })

  eleventyConfig.addCollection('notes', (collection) => {
    return collection.getFilteredByGlob('src/notes/*.md').sort((a, b) => {
      const aDate = new Date(a.data.created) ?? new Date(a.data.modified)
      const bDate = new Date(b.data.created) ?? new Date(b.data.modified)
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

  return {
    markdownTemplateEngine: false,
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
    },
  }
}
