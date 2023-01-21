---
title: React compound components
tags:
  - react
  - js
link: https://jjenzz.com/compound-components
date: 2021-04-22
---

```tsx
import React, { useContext } from 'react'

const Context = React.createContext()

const List = ({ isSmall = false, children, ...props }) => (
  <ul {...props} style={{ padding: isSmall ? '5px' : '10px' }}>
    <Context.Provider value={isSmall}>{children}</Context.Provider>
  </ul>
)

const ListItem = ({ children, ...props }) => {
  const isSmall = useContext(Context)

  return (
    <li {...props} style={{ padding: isSmall ? '5px' : '10px' }}>
      {children}
    </li>
  )
}

export { List, ListItem }
```

```tsx
<List isSmall>
  <ListItem>Cat</ListItem>
  <ListItem>Dog</ListItem>
</List>
```

Another example: https://egghead.io/lessons/react-write-compound-components
