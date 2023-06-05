---
title: Supabase.js
tags:
  - javascript
date: git Last Modified
emoji:
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
