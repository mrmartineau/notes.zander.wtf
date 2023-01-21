---
title: Vercel Serverless functions
link: https://vercel.com/docs/concepts/functions/serverless-functions
date: 2021-12-06
---

## Basic example

### With JavaScript

```ts
// /api/test.js
const handler = (request, response) => {
  response.status(200).json({
    body: request.body,
    query: request.query,
    cookies: request.cookies,
  })
}

export default handler
```

### With TypeScript

```ts
// /api/test.ts
import { VercelApiHandler } from './types'

const handler: VercelApiHandler = (request, response) => {
  response.status(200).json({
    body: request.body,
    query: request.query,
    cookies: request.cookies,
  })
}

export default handler
```

## Enabling CORS

https://vercel.com/support/articles/how-to-enable-cors
