---
title: useRef
tags:
  - react
emoji: 🎣
date: git Last Modified
link: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks/#useref
---

- Docs: https://beta.reactjs.org/reference/react/useRef

## TypeScript

When using useRef, you have two options when creating a ref container that does not have an initial value:

```ts
const ref1 = useRef<HTMLElement>(null)

// Or, if you are sure that ref2.current will never be `null`, it is also possible to use the non-null assertion operator !
const ref2 = useRef<HTMLElement>(null!)
```

The first option will make `ref1.current` read-only, and is intended to be passed in to built-in ref attributes that React will manage (because React handles setting the current value for you).

The second option will make `ref2.current` mutable, and is intended for "instance variables" that you manage yourself.

## Example

```tsx
function Foo() {
  // - If possible, prefer as specific as possible. For example, HTMLDivElement
  //   is better than HTMLElement and way better than Element.
  // - Technical-wise, this returns RefObject<HTMLDivElement>
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Note that ref.current may be null. This is expected, because you may
    // conditionally render the ref-ed element, or you may forgot to assign it
    if (!divRef.current) throw Error('divRef is not assigned')

    // Now divRef.current is sure to be HTMLDivElement
    doSomethingWith(divRef.current)
  })

  // Give the ref to an element so React can manage it for you
  return <div ref={divRef}>etc</div>
}
```
