---
title: Native image lazy loading
emoji: 🖼
tags:
  - html
date: git Last Modified
---

```html
<img src="image.jpg" alt="Description" loading="lazy" width="800" height="600" />
```

Always include `width` and `height` attributes to prevent layout shift while the image loads.

## Values

- `lazy`: Defer loading until it reaches a calculated distance from viewport
- `eager`: Load the resource immediately
- `auto`: Browser default (typically eager)

## When to use

- ✅ Images below the fold (not immediately visible)
- ✅ Images in long lists or feeds
- ❌ Hero images or LCP (Largest Contentful Paint) images - use `eager` or omit the attribute
- ❌ Images already in the viewport on load

## With iframes

```html
<iframe src="video-player.html" loading="lazy"></iframe>
```

## `fetchpriority` for important images

For above-the-fold images, use `fetchpriority` to load them faster:

```html
<img src="hero.jpg" alt="Hero" fetchpriority="high" />
```

## References

- [web.dev: Browser-level image lazy loading](https://web.dev/browser-level-image-lazy-loading/)
- [MDN: loading attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#loading)
