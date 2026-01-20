---
title: React TypeScript
tags:
  - react
  - typescript
emoji: ⚛
date: git Last Modified
---

[React TypeScript cheatsheet](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet) is my bible for all React/TypeScript things.

## Typing components

The preferred method is to type props directly rather than using `FC`.

```tsx
interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

const Button = ({ label, onClick, disabled }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )
}
```

### With children

Explicitly type children when you need them:

```tsx
import type { ReactNode } from 'react'

interface CardProps {
  title: string
  children: ReactNode
}

const Card = ({ title, children }: CardProps) => (
  <div>
    <h2>{title}</h2>
    {children}
  </div>
)
```

### With PropsWithChildren

If you want a shorthand for adding children:

```tsx
import type { PropsWithChildren } from 'react'

interface CardProps {
  title: string
}

const Card = ({ title, children }: PropsWithChildren<CardProps>) => (
  <div>
    <h2>{title}</h2>
    {children}
  </div>
)
```

### Why not `FC`?

`FC` (FunctionComponent) is no longer recommended because:

1. It used to implicitly include `children` (fixed in React 18, but the habit stuck)
2. It doesn't play well with generics
3. Direct prop typing is more explicit and flexible

```tsx
// ❌ Less preferred
const Button: FC<ButtonProps> = ({ label }) => <button>{label}</button>

// ✅ Preferred
const Button = ({ label }: ButtonProps) => <button>{label}</button>
```

> Note: `VFC` (VoidFunctionComponent) was deprecated in React 18 and removed in React 19.

## Basic prop types

```ts
type AppProps = {
  message: string
  count: number
  disabled: boolean
  names: string[]
  status: 'waiting' | 'success' | 'error'
  /** Object with specific shape */
  user: {
    id: string
    name: string
  }
  /** Array of objects */
  items: {
    id: string
    title: string
  }[]
  /** Record type for dictionaries */
  scores: Record<string, number>
  /** Function that returns nothing */
  onClick: () => void
  /** Function with parameters */
  onChange: (value: string) => void
  /** Optional prop */
  optional?: string
}
```

## Event handling

```tsx
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  console.log(event.currentTarget)
}

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log(event.target.value)
}

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
}

const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (event.key === 'Enter') {
    // ...
  }
}
```

## Common prop patterns

```tsx
import type { ReactNode, CSSProperties, ComponentPropsWithoutRef } from 'react'

interface Props {
  /** Anything React can render */
  children: ReactNode
  /** Style object */
  style?: CSSProperties
  /** Class name */
  className?: string
}
```

### Extending HTML elements

```tsx
import type { ComponentPropsWithoutRef } from 'react'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant: 'primary' | 'secondary'
}

const Button = ({ variant, children, ...rest }: ButtonProps) => (
  <button className={`btn-${variant}`} {...rest}>
    {children}
  </button>
)
```

### With ref forwarding

```tsx
import { forwardRef, type ComponentPropsWithRef } from 'react'

interface InputProps extends ComponentPropsWithRef<'input'> {
  label: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...rest }, ref) => (
    <label>
      {label}
      <input ref={ref} {...rest} />
    </label>
  )
)
```

## Hooks

### useState

```tsx
// Type is inferred
const [count, setCount] = useState(0)

// Explicit type for complex state
const [user, setUser] = useState<User | null>(null)

// Union types
const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
```

### useRef

```tsx
// DOM element ref
const inputRef = useRef<HTMLInputElement>(null)

// Mutable ref (no null)
const intervalRef = useRef<number | undefined>(undefined)
```

### useReducer

```tsx
type State = { count: number }
type Action = { type: 'increment' } | { type: 'decrement' } | { type: 'reset'; payload: number }

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

const [state, dispatch] = useReducer(reducer, { count: 0 })
```

### useContext

```tsx
interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
```

## Generic components

```tsx
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => ReactNode
}

const List = <T,>({ items, renderItem }: ListProps<T>) => (
  <ul>
    {items.map((item, index) => (
      <li key={index}>{renderItem(item)}</li>
    ))}
  </ul>
)

// Usage
<List items={users} renderItem={(user) => <span>{user.name}</span>} />
```

## Discriminated unions for props

```tsx
type ButtonProps =
  | { variant: 'link'; href: string }
  | { variant: 'button'; onClick: () => void }

const Button = (props: ButtonProps) => {
  if (props.variant === 'link') {
    return <a href={props.href}>Click me</a>
  }
  return <button onClick={props.onClick}>Click me</button>
}
```
