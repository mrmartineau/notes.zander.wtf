---
title: Check if value is array in JavaScript
tags:
  - javascript
date: 2022-01-13
---

### `instanceof Array`

```js
;[] instanceof Array // true
'test' instanceof Array // false
```

### `Array.isArray`

As of ES5 there is now also:

```js
Array.isArray([]) // true
Array.isArray('test') // false
Array.isArray({}) // false
```

### `.constructor === Array`

```js
;[].constructor === Array // true
'foo'.constructor === Array // false
```

From [Stack Overflow](https://stackoverflow.com/questions/767486/how-do-you-check-if-a-variable-is-an-array-in-javascript)
