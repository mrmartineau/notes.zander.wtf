---
title: vh, svh, lvh, and dvh
tags:
  - css
date: git Last Modified
---

Using the viewport unit `vh` in desktop browsers is usually straight-forward, `100vh` matches the height of the viewport. On mobile that's different because the viewport height changes depending on whether or not certain user interface elements are visible, `100vh` doesn't always match the height of the viewport.

The problem with `100vh` on mobile is that it doesn’t respect whether user interface elements are expanded or not. It usually always matches the large viewport. CSS introduces new viewport units to address that issue.

## `dvh`

`dvh` is a dynamic value that matches the viewport height dynamically. Use this if you want to match the height of the viewport regardless of whether or not user interface elements are expanded or not.

```css
div {
  height: 100dvh;
}
```

You can also use `svh` for the small viewport and `lvh` for the large viewport.

```css
div {
  height: 100svh;
}
```

```css
div {
  height: 100lvh;
}
```

## Further reading

- https://caniuse.com/viewport-unit-variants
- https://browser-units.web.app/
