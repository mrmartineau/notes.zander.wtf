---
title: SvelteKit
tags:
  - svelte
  - sveltekit
date: git Last Modified
---

## Routing file structure

```sh
├─ src
│  ├─ routes
│  │  ├─ +page.svelte          # /
│  │  ├─ +layout.svelte        # Root layout
│  │  ├─ about
│  │  │  ├─ +page.svelte       # /about
│  │  ├─ blog
│  │  │  ├─ +page.svelte       # /blog
│  │  │  ├─ [slug]
│  │  │  │  ├─ +page.svelte    # /blog/:slug
│  │  │  │  ├─ +page.server.ts
```

## Page data loading

### `+page.server.ts` (server-only)

```ts
import type { PageServerLoad, Actions } from './$types'
import { redirect, fail } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ params, locals }) => {
  const { supabase, session } = locals

  if (!session) {
    redirect(303, '/login')
  }

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', session.user.id)

  return { posts }
}

export const actions: Actions = {
  create: async ({ request, locals }) => {
    const formData = await request.formData()
    const title = formData.get('title') as string

    if (!title) {
      return fail(400, { title, missing: true })
    }

    const { error } = await locals.supabase
      .from('posts')
      .insert({ title, user_id: locals.session?.user.id })

    if (error) {
      return fail(500, { message: error.message })
    }

    redirect(303, '/posts')
  },
}
```

### `+page.ts` (runs on server and client)

```ts
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch, params }) => {
  const response = await fetch(`/api/posts/${params.slug}`)
  const post = await response.json()
  return { post }
}
```

### Using data in the page

```svelte
<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<ul>
  {#each data.posts as post}
    <li>{post.title}</li>
  {/each}
</ul>
```

## Layouts

```svelte
<!-- +layout.svelte -->
<script lang="ts">
  import type { LayoutData } from './$types'

  export let data: LayoutData
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<slot />
```

## Form actions

```svelte
<!-- +page.svelte -->
<script lang="ts">
  import { enhance } from '$app/forms'
  import type { ActionData, PageData } from './$types'

  export let data: PageData
  export let form: ActionData
</script>

<form method="POST" action="?/create" use:enhance>
  <input name="title" value={form?.title ?? ''} />
  {#if form?.missing}
    <p class="error">Title is required</p>
  {/if}
  <button type="submit">Create</button>
</form>
```

## API routes

```ts
// src/routes/api/posts/+server.ts
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ url, locals }) => {
  const limit = Number(url.searchParams.get('limit') ?? 10)
  const { data } = await locals.supabase.from('posts').select('*').limit(limit)
  return json(data)
}

export const POST: RequestHandler = async ({ request, locals }) => {
  const body = await request.json()
  const { data, error } = await locals.supabase.from('posts').insert(body).select()

  if (error) {
    return json({ error: error.message }, { status: 500 })
  }

  return json(data, { status: 201 })
}
```

## Client-side only code

Use `$app/environment` to check if code is running in the browser:

```svelte
<script>
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'

  onMount(() => {
    // This only runs in the browser
    document.querySelector('.test')
  })

  // Or check explicitly
  if (browser) {
    console.log('Running in browser')
  }
</script>
```

## Importing client-side libraries

For libraries that expect the DOM to be available:

```svelte
<script>
  import { onMount } from 'svelte'

  let Chart

  onMount(async () => {
    const module = await import('chart.js')
    Chart = module.default

    // Use Chart here...
  })
</script>
```

## Hooks

```ts
// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  // Run before every request
  const session = await getSession(event.cookies)
  event.locals.session = session

  const response = await resolve(event)
  return response
}
```

## Environment variables

```ts
// Server-only (has access to private vars)
import { SECRET_KEY } from '$env/static/private'
import { env } from '$env/dynamic/private'

// Client-safe (only PUBLIC_ prefixed vars)
import { PUBLIC_API_URL } from '$env/static/public'
import { env } from '$env/dynamic/public'
```

## Preloading

```svelte
<script>
  import { preloadData } from '$app/navigation'
</script>

<a
  href="/blog/my-post"
  on:mouseenter={() => preloadData('/blog/my-post')}
>
  Read post
</a>

<!-- Or use data-sveltekit-preload-data -->
<a href="/blog/my-post" data-sveltekit-preload-data="hover">
  Read post
</a>
```
