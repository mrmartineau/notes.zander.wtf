---
title: Redux / Redux Toolkit
tags:
  - react
date: git Last Modified
link: https://redux-toolkit.js.org
---

## Redux Toolkit (RTK)

Redux Toolkit is the official, recommended way to write Redux logic. It simplifies store setup, reduces boilerplate, and includes useful utilities.

### Store setup

```ts
// store.ts
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

### Creating a slice

```ts
// features/counter/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer
```

### Typed hooks

```ts
// hooks.ts
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

### Using in components

```tsx
import { useAppSelector, useAppDispatch } from '../../hooks'
import { increment, decrement, incrementByAmount } from './counterSlice'

export const Counter = () => {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div>
      <button onClick={() => dispatch(decrement())}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  )
}
```

### Provider setup

```tsx
// main.tsx or App.tsx
import { Provider } from 'react-redux'
import { store } from './store'

const App = () => (
  <Provider store={store}>
    <YourApp />
  </Provider>
)
```

## Async logic with createAsyncThunk

```ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface User {
  id: string
  name: string
}

interface UsersState {
  entities: User[]
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: UsersState = {
  entities: [],
  loading: 'idle',
  error: null,
}

export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  const response = await fetch('/api/users')
  return response.json() as Promise<User[]>
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.entities = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.error.message ?? 'Something went wrong'
      })
  },
})

export default usersSlice.reducer
```

## RTK Query

For data fetching, RTK Query is built into Redux Toolkit and handles caching, loading states, and more.

```ts
// services/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Post {
  id: number
  title: string
  body: string
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
      providesTags: ['Post'],
    }),
    getPost: builder.query<Post, number>({
      query: (id) => `posts/${id}`,
    }),
    addPost: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Post'],
    }),
  }),
})

export const { useGetPostsQuery, useGetPostQuery, useAddPostMutation } = api
```

Add the API reducer and middleware to your store:

```ts
import { configureStore } from '@reduxjs/toolkit'
import { api } from './services/api'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})
```

Use in components:

```tsx
import { useGetPostsQuery, useAddPostMutation } from './services/api'

const Posts = () => {
  const { data: posts, isLoading, error } = useGetPostsQuery()
  const [addPost, { isLoading: isAdding }] = useAddPostMutation()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading posts</div>

  return (
  <div>
      <button onClick={() => addPost({ title: 'New Post' })} disabled={isAdding}>
        Add Post
      </button>
      {posts?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
  </div>
)
}
```

## Selectors

```ts
// Inline selector
const count = useAppSelector((state) => state.counter.value)

// Reusable selector
export const selectCount = (state: RootState) => state.counter.value

// With createSelector for memoization
import { createSelector } from '@reduxjs/toolkit'

const selectUsers = (state: RootState) => state.users.entities
const selectActiveFilter = (state: RootState) => state.filters.active

export const selectActiveUsers = createSelector(
  [selectUsers, selectActiveFilter],
  (users, isActive) => users.filter((user) => user.active === isActive)
)
```
