import algoliasearch from 'algoliasearch'

export default {
  async fetch(request, env) {
    // Only allow POST requests (webhook calls)
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 })
    }

    // Optional: Verify webhook secret
    const authHeader = request.headers.get('Authorization')
    if (env.WEBHOOK_SECRET && authHeader !== `Bearer ${env.WEBHOOK_SECRET}`) {
      return new Response('Unauthorized', { status: 401 })
    }

    const startTime = Date.now()

    try {
      const client = algoliasearch(env.ALGOLIA_APP, env.ALGOLIA_ADMIN_KEY)

      // Fetch the algolia.json from the deployed site
      const siteUrl = env.SITE_URL || 'https://notes.zander.wtf'
      const dataResp = await fetch(`${siteUrl}/algolia.json`)

      if (!dataResp.ok) {
        throw new Error(`Failed to fetch algolia.json: ${dataResp.status}`)
      }

      const records = await dataResp.json()
      const index = client.initIndex(env.ALGOLIA_INDEX)

      const replacedObjectIds = await index.replaceAllObjects(records, {
        safe: true,
        autoGenerateObjectIDIfNotExist: true,
      })

      const duration = Date.now() - startTime

      console.log(`Deploy succeeded - Updated ${replacedObjectIds.objectIDs?.length || 0} records in ${duration}ms`)

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Algolia index updated successfully',
          objectCount: replacedObjectIds.objectIDs?.length || 0,
          duration: `${duration}ms`,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
    } catch (error) {
      console.error('Deploy webhook error:', error)

      return new Response(
        JSON.stringify({
          success: false,
          error: error.message,
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }
  },
}

