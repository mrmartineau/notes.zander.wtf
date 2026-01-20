---
title: React Error Boundary
link: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
tags:
  - react
emoji: ⚛
date: git Last Modified
---

Error boundaries catch JavaScript errors in their child component tree, log those errors, and display a fallback UI instead of crashing the whole app.

## Using `react-error-boundary`

The [`react-error-boundary`](https://github.com/bvaughn/react-error-boundary) package provides a ready-to-use solution that's easier than writing your own class component.

```bash
npm install react-error-boundary
```

### Basic usage

```tsx
import { ErrorBoundary } from 'react-error-boundary'

const App = () => (
  <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <MyComponent />
  </ErrorBoundary>
)
```

### With fallback component

```tsx
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
)

const App = () => (
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => {
      // Reset app state here
    }}
    onError={(error, info) => {
      // Log to error reporting service
      console.error(error, info.componentStack)
    }}
  >
    <MyComponent />
  </ErrorBoundary>
)
```

### Reset on navigation or prop change

```tsx
<ErrorBoundary
  FallbackComponent={ErrorFallback}
  resetKeys={[pathname, userId]}
>
  <MyComponent />
</ErrorBoundary>
```

### useErrorBoundary hook

Trigger error boundary from event handlers or effects:

```tsx
import { useErrorBoundary } from 'react-error-boundary'

const MyComponent = () => {
  const { showBoundary } = useErrorBoundary()

  const handleClick = async () => {
    try {
      await riskyOperation()
    } catch (error) {
      showBoundary(error)
    }
  }

  return <button onClick={handleClick}>Do something risky</button>
}
```

## With Suspense

Error boundaries pair nicely with Suspense for data fetching:

```tsx
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const App = () => (
  <ErrorBoundary fallback={<div>Failed to load</div>}>
    <Suspense fallback={<div>Loading...</div>}>
      <DataComponent />
    </Suspense>
  </ErrorBoundary>
)
```

## Custom class-based error boundary

If you prefer not to use a library:

```tsx
import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught:', error, errorInfo.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <div>Something went wrong</div>
    }
    return this.props.children
  }
}
```

## What error boundaries don't catch

- Event handlers (use try/catch)
- Async code (use try/catch or `.catch()`)
- Server-side rendering
- Errors in the error boundary itself
