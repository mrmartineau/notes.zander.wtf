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
