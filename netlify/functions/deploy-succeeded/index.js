const algoliasearch = require('algoliasearch')
const fetch = require('node-fetch')

exports.handler = async (event, context) => {
  console.time('deploy succeeded')
  try {
    const client = algoliasearch(
      process.env.ALGOLIA_APP,
      process.env.ALGOLIA_ADMIN_KEY
    )
    const dataResp = await fetch('https://notes.zander.wtf/algolia.json')
    const records = await dataResp.json()
    const index = client.initIndex(process.env.ALGOLIA_INDEX)
    const replacedObjectIds = await index.replaceAllObjects(records, {
      safe: true,
      autoGenerateObjectIDIfNotExist: true,
    })
    console.log(`🚀 ~ deploy succeeded`, replacedObjectIds)
    console.timeEnd('deploy succeeded')
  } catch (error) {
    console.log(`🚀 ~ deploy succeeded ~ error`, error)
  }
}
