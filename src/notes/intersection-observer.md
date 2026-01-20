---
title: IntersectionObserver
tags:
  - javascript
emoji: 🚸
date: git Last Modified
---

## Basic usage

```js
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log('Element is visible')
        // entry.target - the observed element
        // entry.intersectionRatio - how much is visible (0-1)
        // entry.boundingClientRect - element's bounding box
      }
    })
  },
  {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.5, // trigger at 50% visibility
  }
)

observer.observe(document.querySelector('.element'))

// Clean up when done
observer.disconnect()
```

### Multiple thresholds

```js
const observer = new IntersectionObserver(callback, {
  threshold: [0, 0.25, 0.5, 0.75, 1], // trigger at these visibility percentages
})
```

### Observe once (lazy loading pattern)

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadImage(entry.target)
      observer.unobserve(entry.target) // stop observing after first trigger
    }
  })
})
```

## With React

### Using a ref

```tsx
import { useEffect, useRef } from 'react'

const LazySection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log('Section is visible')
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return <div ref={ref}>{children}</div>
}
```

### Custom hook

```tsx
import { useEffect, useRef, useState } from 'react'

const useIntersectionObserver = (options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    observer.observe(element)

    return () => observer.disconnect()
  }, [options])

  return { ref, isIntersecting }
}

// Usage
const MyComponent = () => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.5 })

  return (
    <div ref={ref}>
      {isIntersecting ? 'Visible!' : 'Not visible'}
    </div>
  )
}
```

### Trigger once

```tsx
const useIntersectionOnce = (options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLElement>(null)
  const [hasIntersected, setHasIntersected] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || hasIntersected) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasIntersected(true)
        observer.disconnect()
      }
    }, options)

    observer.observe(element)

    return () => observer.disconnect()
  }, [options, hasIntersected])

  return { ref, hasIntersected }
}
```

## References

- [MDN: IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [CSS-Tricks: Using IntersectionObserver](https://css-tricks.com/using-intersectionobserver-to-check-if-page-scrolled-past-certain-point/)
