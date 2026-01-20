---
title: useReducer
tags:
  - react
emoji: 🎣
date: git Last Modified
link: https://react.dev/reference/react/useReducer
---

- TS/React docs: https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/blob/master/README.md#hooks

## Example

```tsx
import { useReducer } from 'react'

interface State {
  count: number
}

type Action = { type: 'increment' } | { type: 'decrement' } | { type: 'reset'; payload: number }

const initialState: State = { count: 0 }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return { count: action.payload }
  }
}

export const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'reset', payload: 0 })}>Reset</button>
    </>
  )
}
```

## With lazy initialization

```tsx
const init = (initialCount: number): State => {
  return { count: initialCount }
}

const Counter = ({ initialCount }: { initialCount: number }) => {
  const [state, dispatch] = useReducer(reducer, initialCount, init)
  // ...
}
```

## useImmer

For complex stuff, [useImmer](https://github.com/immerjs/use-immer) is a great option
