---
title: Get last array item
tags:
  - javascript
emoji: ❌
date: git Last Modified
link: https://stackoverflow.com/a/70716304/91359
---

```js
const arr = [1, 2, 3, 4]
const last = arr[arr.length - 1]
console.log(last) // 4
```

```js
const arr = [1, 2, 3, 4]
const last = arr.at(-1)
console.log(last) // 4
```

```js
const arr = [1, 2, 3, 4]
const last = arr.findLast((x) => true)
console.log(last) // 4
```

```js
const arr = [1, 2, 3, 4]
const last = arr.slice(-1)[0]
console.log(last) // 4
```
