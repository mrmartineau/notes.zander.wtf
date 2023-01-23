require('dotenv').config()
const { EleventyServerlessBundlerPlugin } = require('@11ty/eleventy')
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
const markdownItCopyCode = require('markdown-it-copy')
const pluginJsonFeed = require('eleventy-plugin-json-feed')
const algoliasearch = require('algoliasearch')

const client = algoliasearch(
  process.env.ALGOLIA_APP,
  process.env.ALGOLIA_SEARCH_KEY
)
const index = client.initIndex(process.env.ALGOLIA_INDEX)

module.exports = function (eleventyConfig) {
  // Plugins
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
  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: 'search',
    functionsDir: './netlify/functions/',
    excludeDependencies: ['eleventy-plugin-json-feed'],
  })
  eleventyConfig.addAsyncFilter('getResults', function (query) {
    const results = index
      .search(query, {
        attributesToRetrieve: ['title', 'url', 'date_published', 'tags'],
      })
      .then((res) => {
        return res.hits
      })
    return results
  })
  eleventyConfig.addPlugin(pluginJsonFeed, {
    content_html: false,
    content_text: true,
    filter_posts_tag: true,
    tags_metadata_field_name: 'tags',
  })

  eleventyConfig.setLibrary(
    'md',
    markdownIt({
      html: true,
      breaks: true,
      linkify: true,
      typographer: true,
    })
  )
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
  eleventyConfig.amendLibrary('md', (mdLib) =>
    mdLib.use(markdownItCopyCode, {
      successText: `<svg xmlns="http://www.w3.org/2000/svg" class="icon inline-block" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    `,
      btnText: `<svg xmlns="http://www.w3.org/2000/svg" class="icon inline-block" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>`,
    })
  )

  // Filters
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd')
  })

  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
      'dd LLL, yyyy'
    )
  })

  eleventyConfig.addFilter('dateFromISO', (timestamp) => {
    return DateTime.fromISO(timestamp, { zone: 'utc' }).toJSDate()
  })

  // Collections
  // Tags
  eleventyConfig.addCollection('tagList', (collection) => {
    const tagsObject = {
      untagged: 0,
    }
    collection.getFilteredByGlob('src/notes/*.md').forEach((item) => {
      if (item.data.draft) {
        return
      }
      if (!item.data.tags) {
        tagsObject.untagged += 1
        return
      }
      item.data.tags.forEach((tag) => {
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
    return collection.getFilteredByGlob('src/notes/*.md').filter((item) => {
      return !item.data.draft
    })
  })
  eleventyConfig.addCollection('untagged', (collection) => {
    return collection.getFilteredByGlob('src/notes/*.md').filter((item) => {
      return (
        (!item.data.tags || item.data.tags.length === 0) && !item.data.draft
      )
    })
  })

  // Short codes
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
    if (!tag) {
      return `<span class="tagDot" style="background-color: #ddd;"></span>`
    }
    const tagName = slugify(tag)
    const tagColor = getColourFromString(tagName)
    return `<span class="tagDot" style="background-color: ${tagColor};"></span>`
  })

  eleventyConfig.setServerOptions({
    // The starting port number
    // Will increment up to (configurable) 10 times if a port is already in use.
    port: 3456,

    // Additional files to watch that will trigger server updates
    // Accepts an Array of file paths or globs (passed to `chokidar.watch`).
    // Works great with a separate bundler writing files to your output folder.
    // e.g. `watch: ["_site/**/*.css"]`
    watch: ['_site/css/**/*.css'],
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
