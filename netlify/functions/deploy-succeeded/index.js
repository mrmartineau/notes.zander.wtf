const algoliasearch = require('algoliasearch')

exports.handler = async (event, context) => {
  console.time('deploy succeeded')
  try {
    const client = algoliasearch(
      process.env.ALGOLIA_APP,
      process.env.ALGOLIA_SEARCH_KEY
    )
    const dataResp = await fetch('https://notez.zander.wtf/algolia.json')
    const records = await dataResp.json()
    const index = client.initIndex(process.env.ALGOLIA_INDEX)
    const replacedObjectIds = await index.replaceAllObjects(records, {
      safe: true,
    })
    console.log(`🚀 ~ deploy succeeded`, replacedObjectIds)
    console.timeEnd('deploy succeeded')
  } catch (error) {
    console.log(`🚀 ~ deploy succeeded ~ error`, error)
  }
}
