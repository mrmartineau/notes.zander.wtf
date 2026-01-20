---
title: Next.js
link: https://nextjs.org/docs/
tags:
  - react
date: git Last Modified
---

## App Router (Next.js 13+)

The App Router uses a new `app/` directory structure with file-based conventions.

### File conventions

| File              | Purpose                                    |
| ----------------- | ------------------------------------------ |
| `page.tsx`        | UI for a route                             |
| `layout.tsx`      | Shared layout that wraps children          |
| `loading.tsx`     | Loading UI (Suspense boundary)             |
| `error.tsx`       | Error UI (Error boundary)                  |
| `not-found.tsx`   | 404 UI                                     |
| `route.ts`        | API endpoint                               |

### Root layout

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

### Page with params

```tsx
// app/posts/[slug]/page.tsx
interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)
  return <article>{post.title}</article>
}
```

### Server Components (default)

Components in the App Router are Server Components by default. They can be async and fetch data directly.

```tsx
// app/users/page.tsx
async function getUsers() {
  const res = await fetch('https://api.example.com/users', {
    cache: 'no-store', // or 'force-cache' for static
  })
  return res.json()
}

export default async function UsersPage() {
  const users = await getUsers()
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

### Client Components

Add `'use client'` directive for interactivity.

```tsx
'use client'

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>
}
```

### Server Actions

```tsx
// app/actions.ts
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title')
  // Insert into database
  // revalidatePath('/posts')
}
```

```tsx
// app/posts/new/page.tsx
import { createPost } from '../actions'

export default function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" required />
      <button type="submit">Create</button>
    </form>
  )
}
```

### Route Handlers (API routes)

```ts
// app/api/users/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const users = await getUsers()
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  const body = await request.json()
  const user = await createUser(body)
  return NextResponse.json(user, { status: 201 })
}
```

### Metadata

```tsx
// app/layout.tsx or app/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My App',
  description: 'My app description',
}
```

Dynamic metadata:

```tsx
// app/posts/[slug]/page.tsx
import type { Metadata } from 'next'

export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  return { title: post.title }
}
```

### Navigation

```tsx
import Link from 'next/link'
import { useRouter } from 'next/navigation' // not 'next/router'

// Link component
<Link href="/about">About</Link>

// Programmatic navigation (client components only)
const router = useRouter()
router.push('/about')
```

---

## Pages Router (Legacy)

### `_app.tsx`

```tsx
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
```

### `getStaticProps`

Fetch data at build time.

```tsx
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

export const getStaticProps: GetStaticProps<{ data: Post[] }> = async () => {
  const res = await fetch('https://...')
  const data = await res.json()

  return {
    props: { data },
    revalidate: 60, // ISR: regenerate every 60 seconds
  }
}

export default function Page({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <div>{/* render data */}</div>
}
```

### `getStaticPaths`

For dynamic routes with `getStaticProps`.

```tsx
import type { GetStaticPaths } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts()
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: 'blocking', // or true or false
  }
}
```

### `getServerSideProps`

Fetch data on every request.

```tsx
import type { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params, req, res, query } = context
  const data = await fetchData(params.id)

  if (!data) {
    return { notFound: true }
  }

  return { props: { data } }
}
```

### useRouter (Pages Router)

```tsx
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()
  const { id } = router.query

  return <button onClick={() => router.push('/about')}>Go to About</button>
}
```
