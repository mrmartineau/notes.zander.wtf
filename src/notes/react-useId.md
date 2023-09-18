---
title: useId
tags:
  - react
emoji: 🎣
date: git Last Modified
link: https://react.dev/reference/react/useId
---

`useId` is a React Hook for generating unique IDs that can be passed to accessibility attributes.

```tsx
import { useId } from 'react';

const PasswordField = () =>  {
  const passwordHintId = useId();
  return (
    <>
      <input type="password" aria-describedby={passwordHintId} />
      <p id={passwordHintId}>
    </>
  )
}
```

`useId` does not create an ID that is safe to use in CSS selectors, if you need that you must escape it first:

```ts
const originalId = useId()
const id = useMemo(() => CSS.escape(originalId), [originalId])

// this also works
const id = useMemo(() => originalId.replaceAll(':', '-'), [originalId])
```
