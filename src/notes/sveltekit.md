---
title: SvelteKit
tags:
  - svelte
  - sveltekit
date: git Last Modified
---

## Routing file structure for pages

```sh
├─ src
│  ├─ routes
│  │  ├─ pageName ## app.com/pageName
│  │  │  ├─ +page.svelte
│  │  │  ├─ +page.server.ts ## or
│  │  │  ├─ +page.ts
│  │  ├─ entry
│  │  │  ├─ [id] ## app.com/entry/123
│  │  │  │  ├─ +page.svelte
│  │  │  │  ├─ +page.server.ts ## or
│  │  │  │  ├─ +page.ts
```

## Server side

This example `+page.server.ts` file uses `supabase` to insert a new entry into a table and then redirects to the new entry's page.

```ts
import { parseForm } from '@formdata-helper/base'
import type { PageServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async ({
  locals: { supabase },
  parent,
}) => {
  const { session } = await parent()
  if (!session) {
    throw redirect(303, '/')
  }

  const { data: journals } = await supabase
    .from('journals')
    .select('*')
    .match({ status: 'active' })

  return {
    journals,
  }
}

export const actions = {
  default: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession()
    const formData = await request.formData()
    const formDataObject = parseForm(formData)

    const { data: newEntry, error } = await supabase
      .from('journal_entries')
      .insert([{ ...formDataObject, owner: session?.user.id }])
      .select()

    if (error) {
      console.error(`🚀 ~ default: ~ error`, error)
      throw error
    }
    if (newEntry?.length) {
      throw redirect(303, `/entry/${newEntry[0].id}`)
    }
  },
}
```

## How To Add A Client Side Only Library To SvelteKit

```jsx
<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/env';

  onMount(() => {
    document.getElementByClass("test");
  })

  // or...

  if (browser) {
    document.getElementByClass("test");
  }
</script>
```

## Importing a client-side library

Sometimes, you might have a problem importing a library because some of its dependenices expect the DOM to be avaible. In that case, you can import it like so;

```jsx
<script>
  import { onMount } from 'svelte';

  onMount(async () => {
    const module = await import('some-lib');
    const SomeLib = module.default;

    // use module here...
  });
</script>
```
