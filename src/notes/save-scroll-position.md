---
title: Save scroll position
tags:
  - javascript
link: https://twitter.com/hakimel/status/1262337514741706752
date: git Last Modified
---

```ts
let element = document.querySelector('.element')

let top = sessionStorage.getItem('element-scroll')

if (top !== null) {
  element.scrollTop = parseInt(top, 10)
}

window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('element-scroll', element.scrollTop)
})
```
