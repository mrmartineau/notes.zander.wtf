---
title: TanStack Query (React Query)
link: https://tanstack.com/query/latest/docs/framework/react/overview
tags:
  - react
emoji: ⚛
date: git Last Modified
---

## useQuery

The v5 API uses a single object argument instead of positional arguments.

```ts
import { useQuery } from '@tanstack/react-query'

interface User {
  id: string
  name: string
}

const { data, error, isPending, isError } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
})
```

### With options

```ts
const { data, isPending } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  enabled: !!userId, // only run when userId is truthy
  staleTime: 1000 * 60 * 5, // 5 minutes
  gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
})
```

### As a custom hook

```ts
import { useQuery } from '@tanstack/react-query'

interface User {
  id: string
  name: string
  email: string
}

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async (): Promise<User> => {
      const response = await fetch(`/api/users/${userId}`)
      if (!response.ok) throw new Error('Failed to fetch user')
      return response.json()
    },
    enabled: !!userId,
  })
}
```

### Usage in a component

```tsx
const UserProfile = ({ userId }: { userId: string }) => {
  const { data: user, isPending, isError, error } = useUser(userId)

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  return <div>Name: {user.name}</div>
}
```

## useMutation

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query'

const queryClient = useQueryClient()

const mutation = useMutation({
  mutationFn: (newUser: { name: string }) => {
    return fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
    })
  },
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['users'] })
  },
})

// Usage
mutation.mutate({ name: 'New User' })
```

## queryOptions

The `queryOptions` helper lets you define query configuration in one place and reuse it across `useQuery`, `useSuspenseQuery`, `useQueries`, prefetching, and more. Great for co-locating `queryKey` and `queryFn` together.

```ts
import { queryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

function userOptions(id: string) {
  return queryOptions({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
    staleTime: 5 * 1000,
  })
}

// Usage in components
const { data } = useQuery(userOptions(userId))
const { data } = useSuspenseQuery(userOptions(userId))

// Prefetching
queryClient.prefetchQuery(userOptions(userId))

// Setting data directly
queryClient.setQueryData(userOptions(userId).queryKey, newUser)

// Multiple queries
useQueries({
  queries: [userOptions('1'), userOptions('2')],
})
```

Override options at the component level:

```ts
const { data } = useQuery({
  ...userOptions(userId),
  select: (data) => data.name, // type inference still works
})
```

For infinite queries, use `infiniteQueryOptions`.

## useQueries

Run multiple queries in parallel.

```ts
import { useQueries } from '@tanstack/react-query'

const results = useQueries({
  queries: [
    {
      queryKey: ['user', userId],
      queryFn: () => fetchUser(userId),
    },
    {
      queryKey: ['posts', userId],
      queryFn: () => fetchUserPosts(userId),
    },
  ],
})
```

## useSuspenseQuery

For use with React Suspense. Data is guaranteed to be defined.

```tsx
import { useSuspenseQuery } from '@tanstack/react-query'

const UserProfile = ({ userId }: { userId: string }) => {
  // data is guaranteed to be defined
  const { data: user } = useSuspenseQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  })

  return <div>Name: {user.name}</div>
}

// Wrap with Suspense
const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <UserProfile userId="123" />
  </Suspense>
)
```

## QueryClient setup

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      retry: 1,
    },
  },
})

const App = () => (
  <QueryClientProvider client={queryClient}>
    <YourApp />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
```

## Placeholder and initial data

```ts
const { data } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  // Show immediately while fetching
  placeholderData: { id: userId, name: 'Loading...' },
  // Or use previous data as placeholder
  placeholderData: (previousData) => previousData,
})
```
