---
title: VS Code Snippets
tags:
  - vscode
  - react
emoji: ✂️
date: git Last Modified
---

These snippets make use of the [EasySnippet extension](https://marketplace.visualstudio.com/items?itemName=inu1255.easy-snippet).

## typescriptreact

### A simple component scaffold

```tsx
// @prefix component-react
// @description Basic React component scaffold

import { ReactNode, ComponentPropsWithoutRef } from 'react'
import { clsx } from 'clsx'
import '$2.styles.css'

interface $2Props extends  ComponentPropsWithoutRef<'$1'> {
  children?: ReactNode
}

export const ${2:Button} = ({ className, children, ...rest }: $2Props) => {
  const ${2/(.*)/${1:/downcase}/}Class = clsx(className, '${2/(.*)/${1:/downcase}/}')

  return (
    <${1:div} className={${2/(.*)/${1:/downcase}/}Class} {...rest}>
      {children}$0
    </$1>
  )
}
```

### Conditional rendering using a ternary operator

```tsx
// @prefix better JSX Conditional
// @description {x ? ( ... ) : null}

{
  $1 ? $0 : null
}
```

[More info](https://kentcdodds.com/blog/use-ternaries-rather-than-and-and-in-jsx)

### useState hook

```tsx
// @prefix useState
// @description useState hook

const [$1, set${1/(.*)/${1:/capitalize}/}}] = useState<$2>($0)
```

### Debugger

Creates a `<pre>` tag with the JSON stringified version of the variable.

```tsx
// @prefix pre
// @description React debugger

<pre>{JSON.stringify(someData, null, 2)}</pre>
```
