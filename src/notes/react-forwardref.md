---
title: React.forwardRef
tags:
  - react
  - typescript
emoji: ⚛
date: git Last Modified
link: https://beta.reactjs.org/reference/react/forwardRef
---

Example of a component that uses `forwardRef`:

```ts
import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { clsx } from 'clsx'
import './Button.css'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, isLoading, ...rest }, forwardedRef) => {
    const buttonClass = clsx(className, 'button', {
      'button--loading': isLoading,
    })

    return (
      <button className={buttonClass} {...rest} ref={forwardedRef}>
        {children}
      </button>
    )
  }
)
```

React TypeScript docs: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forward_and_create_ref/

## Fixed forwardRef

```tsx
import React, { forwardRef } from 'react'
// Declare a type that works with generic components
type FixedForwardRef = <T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactElement
) => (props: P & React.RefAttributes<T>) => React.ReactElement

// Cast the old `forwardRef` to the new one
export const fixedForwardRef = forwardRef as FixedForwardRef
```
