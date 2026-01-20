---
title: Supabase.js
tags:
  - javascript
  - typescript
date: git Last Modified
emoji: ⚡
---

## Selecting data

```ts
const { data, error } = await supabase.from('posts').select(`*`)
```

### Matching data

```ts
const { data, error } = await supabase
  .from('posts')
  .select(`*`)
  .match({ status: 'active' })
```

### Selecting specific items

```ts
const { data: entry } = await supabase
  .from('posts')
  .select(`*`)
  .match({ id: 1234, status: 'active' })
  .single()
```

### Sorting data

```ts
const { data, error } = await supabase
  .from('posts')
  .select(`*`)
  .order('date', { ascending: false })
```

### Related data

```ts
const { data, error } = await supabase
  .from('posts')
  .select(`*, journals(name, id)`)
```

### Paginate results

```ts
const getPagination = (page: number, count: number) => {
  const limit = count ? +count : 3
  const from = page ? page * limit : 0
  const to = page ? from + count - 1 : count - 1

  return { from, to }
}

const { from, to } = getPagination(page, 10)
const { data, count } = await supabase
  .from('posts')
  .select('*', { count: 'exact' })
  .order('id', { ascending: true })
  .range(from, to)
```

### Selecting data by date

```js
const { data, error } = await supabase
  .from('events')
  .select('*')
  .gte('starttime', new Date('2021-07-10').toISOString())
  .lte('starttime', new Date('2021-07-11').toISOString())
```

## Adding data

```ts
const { data, error } = await supabase
  .from('posts')
  .insert([
    {
      title: 'The title',
      body: 'The body',
      owner: session?.user.id,
    },
  ])
  .select() // This is needed to return the inserted data
```

## Generated your schema locally

```sh
npx supabase gen types typescript --project-id \"your-project-id\" --schema public > src/types/supabase.ts
```

## @supabase/ssr

### Browser client

```ts
import { Database } from '@/src/types/supabase' // generated from your DB schema
import { createBrowserClient as _createBrowserClient } from '@supabase/ssr'

export const createBrowserClient = () =>
  _createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
```

### Server client

The newer `@supabase/ssr` API uses `getAll` and `setAll` for cookie handling:

```ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
```

### Middleware client

```ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value, options)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session if expired
  await supabase.auth.getUser()

  return supabaseResponse
}
```

Use in middleware:

```ts
// middleware.ts
import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
```
