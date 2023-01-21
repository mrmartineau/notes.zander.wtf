---
title: Destructuring
tags:
  - javascript
date: 2020-03-22
---

```js
const exampleObject = { a: { b: 'hi' } }

// Want to get both `a` and `b` as variables?
// You totally can do this in one line of destructuring.
const {
  a,
  a: { b },
} = exampleObject
```
