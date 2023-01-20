---
title: Get selected text
tags:
  - javascript
date: git Last Modified
---

```js
document.onselectionchange = () => {
  const text = document.getSelection().toString()
  console.log(text)
}
```
