const { EleventyServerless } = require('@11ty/eleventy')
const algoliasearch = require('algoliasearch')

const client = algoliasearch(
  process.env.ALGOLIA_APP,
  process.env.ALGOLIA_SEARCH_KEY
)
const index = client.initIndex(process.env.ALGOLIA_INDEX)

// Explicit dependencies for the bundler from config file and global data.
// The file is generated by the Eleventy Serverless Bundler Plugin.
require('./eleventy-bundler-modules.js')

async function handler(event) {
  const searchQuery =
    event.multiValueQueryStringParameters || event.queryStringParameters
  console.log(`🚀 ~ handler ~ searchQuery`, searchQuery.query)
  let results
  try {
    results = await index.search(searchQuery.query, {
      attributesToRetrieve: ['title', 'url', 'date', 'tags', 'emoji'],
    })
  } catch (err) {
    console.log(`🚀 ~ handler ~ Algolia err`, err)
  }
  console.log(`🚀 ~ handler ~ results`, results.hits)
  let elev = new EleventyServerless('searcher', {
    path: new URL(event.rawUrl).pathname,
    query: searchQuery,
    functionsDir: './netlify/functions/',
    singleTemplateScope: false,
    config: function (config) {
      config.addGlobalData('searchResults', results?.hits)
    },
  })
  try {
    let [page] = await elev.getOutput()
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html; charset=UTF-8',
      },
      body: page.content,
    }
  } catch (error) {
    // Only console log for matching serverless paths
    // (otherwise you’ll see a bunch of BrowserSync 404s for non-dynamic URLs during --serve)
    if (elev.isServerlessUrl(event.path)) {
      console.log('Serverless Error:', error)
    }

    return {
      statusCode: error.httpStatusCode || 500,
      body: JSON.stringify(
        {
          error: error.message,
        },
        null,
        2
      ),
    }
  }
}

// Choose one:
// * Runs on each request: AWS Lambda, Netlify Function
// * Runs on first request only: Netlify On-demand Builder
//    1. Don’t forget to `npm install @netlify/functions`
//    2. Also use `redirects: "netlify-toml-builders"` in your config file’s serverless bundler options:
//       https://www.11ty.dev/docs/plugins/serverless/#bundler-options

exports.handler = handler

//const { builder } = require("@netlify/functions");
//exports.handler = builder(handler);