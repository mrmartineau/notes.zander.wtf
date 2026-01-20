---
title: Web performance tips
emoji: 🏎
date: git Last Modified
tags:
  - performance
  - css
---

## Reduce Cumulative Layout Shift (CLS)

### Always show scrollbar

```css
html {
  overflow-y: scroll;
}
```

### Reserve space for images

Always include `width` and `height` on images:

```html
<img src="photo.jpg" alt="" width="800" height="600" />
```

Or use `aspect-ratio` in CSS:

```css
img {
  aspect-ratio: 16 / 9;
  width: 100%;
  height: auto;
}
```

### Reserve space for dynamic content

```css
.ad-container {
  min-height: 250px; /* Reserve space for ad */
}
```

## Improve Largest Contentful Paint (LCP)

### Preload critical assets

```html
<link rel="preload" href="hero.jpg" as="image" />
<link rel="preload" href="critical.woff2" as="font" type="font/woff2" crossorigin />
```

### Prioritize LCP image

```html
<img src="hero.jpg" alt="" fetchpriority="high" />
```

## Performance API

```js
// Mark points in time
performance.mark('start')
// ... code to measure ...
performance.mark('end')

// Measure between marks
performance.measure('My operation', 'start', 'end')

// Get the measurement
const measures = performance.getEntriesByName('My operation')
console.log(measures[0].duration) // time in ms
```

## Quick wins

- Use `loading="lazy"` on below-fold images
- Use `decoding="async"` on images
- Compress images with modern formats (WebP, AVIF)
- Use a CDN with proper caching headers
- Minimize main thread work (defer non-critical JS)
