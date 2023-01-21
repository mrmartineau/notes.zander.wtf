---
title: React Context
tags:
  - react
emoji: 🎣
date: git Last Modified
link: https://kentcdodds.com/blog/how-to-use-react-context-effectively
---

- Docs: http://reactjs.org/docs/hooks-reference.html#usecontext
- TS/React docs: https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#context

```tsx
import * as React from 'react'

const CountContext = React.createContext()

function countReducer(state, action) {
  switch (action.type) {
    case 'increment': {
      return { count: state.count + 1 }
    }
    case 'decrement': {
      return { count: state.count - 1 }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function CountProvider({ children }) {
  const [state, dispatch] = React.useReducer(countReducer, { count: 0 })
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch }
  return <CountContext.Provider value={value}>{children}</CountContext.Provider>
}

function useCount() {
  const context = React.useContext(CountContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context
}

export { CountProvider, useCount }
```

## Usage

```tsx
import React, { useContext } from 'react'

const MyComponent = () => {
  const { count } = useCount()

  return <div>Count: {count}</div>
}
```

```tsx
<CountProvider>
  <MyComponent />
</CountProvider>
```

## Child as a function

We can change the `CountProvider` component

```tsx
function CountProvider({ children }) {
  const [state, dispatch] = React.useReducer(countReducer, { count: 0 })
  const value = { state, dispatch }
  return (
    <CountContext.Provider value={value}>
      {children(value)}
    </CountContext.Provider>
  )
}
```

And use it like so:

```tsx
<CountProvider>{({ count }) => <div>Count: {count}</div>}</CountProvider>
```
