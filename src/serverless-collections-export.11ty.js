exports.data = function () {
  return {
    // generate directly to the serverless bundle folder
    permalink: './netlify/functions/search/serverless-collections-tagList.json',
    permalinkBypassOutputDir: true,
    eleventyExcludeFromCollections: true,
  }
}

exports.render = function ({ collections }) {
  return JSON.stringify({
    tagList: collections.tagList,
  })
}
