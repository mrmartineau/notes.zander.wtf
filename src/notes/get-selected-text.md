---
title: Get selected text
tags:
  - javascript
date: 2020-08-04
---

```js
document.onselectionchange = () => {
  const text = document.getSelection().toString()
  console.log(text)
}
```
