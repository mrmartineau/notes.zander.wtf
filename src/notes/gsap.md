---
title: GSAP
tags:
  - animation
  - react
  - javascript
link: https://greensock.com/docs/v3/GSAP
date: git Last Modified
---

## GSAP

- Docs: https://greensock.com/docs/v3/GSAP
- Cheatsheet: https://greensock.com/cheatsheet/

## Eases

https://greensock.com/docs/v3/Eases

## ScrollTrigger

- Docs: https://greensock.com/docs/v3/Plugins/ScrollTrigger
- Demos: https://greensock.com/st-demos/

```js
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
```

### With React (useGSAP hook)

For React 18+, GSAP provides the `@gsap/react` package with a `useGSAP` hook that handles cleanup automatically.

```bash
npm install @gsap/react
```

```tsx
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const MyComponent = () => {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // All GSAP animations in here are scoped to the container
      // and automatically cleaned up when the component unmounts
      gsap.to('.box', { x: 100, duration: 1 })
    },
    { scope: container }
  )

  return (
    <div ref={container}>
      <div className="box">Animated</div>
    </div>
  )
}
```

### With dependencies

```tsx
useGSAP(
  () => {
    gsap.to('.box', { x: isActive ? 200 : 0 })
  },
  { scope: container, dependencies: [isActive] }
)
```

### With ScrollTrigger

```tsx
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const ScrollAnimation = () => {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to('.box', {
        y: 100,
        scrollTrigger: {
          trigger: '.box',
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      })
    },
    { scope: container }
  )

  return (
    <div ref={container}>
      <div className="box">Scroll-driven</div>
    </div>
  )
}
```

### Context-safe callbacks

For event handlers or callbacks, use `contextSafe`:

```tsx
const { contextSafe } = useGSAP({ scope: container })

const handleClick = contextSafe(() => {
  gsap.to('.box', { rotation: 360 })
})

return <button onClick={handleClick}>Rotate</button>
```

### Legacy approach (manual cleanup)

If you can't use `@gsap/react`, handle cleanup manually:

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to('.box', { x: 100 })
  }, container)

  return () => ctx.revert()
}, [])
```

## ScrollTo

- Docs: https://greensock.com/docs/v3/Plugins/ScrollToPlugin
- Demos: https://greensock.com/st-demos/

```js
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin)
```

## Useful links:

- https://css-tricks.com/writing-smarter-animation-code/
- https://css-tricks.com/tips-for-writing-animation-code-efficiently/
