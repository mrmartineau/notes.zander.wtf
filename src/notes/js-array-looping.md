---
title: JS array looping
tags:
  - javascript
emoji: 🤷‍♂️
date: git Last Modified
link: https://www.measurethat.net/Benchmarks/Show/18189/0/for-vs-foreach-vs-forin-vs-forof
---

There are a few different ways to loop over an array:

## for

```js
for (var i = 0; i < array.length; i++) {
  array[i]
}
```

## forEach

```js
array.forEach(function (i) {
  array[i]
})
```

## for in

```js
for (var i in array) {
  array[i]
}
```

## for..of

```js
for (var i of array) {
  array[i]
}
```

## Test results

| Test case name | Result                                               |
| -------------- | ---------------------------------------------------- |
| for            | for x 4,680,671 ops/sec ±0.42% (68 runs sampled)     |
| forEach        | forEach x 5,043,765 ops/sec ±0.60% (67 runs sampled) |
| for in         | for in x 9,155,750 ops/sec ±0.50% (68 runs sampled)  |
| for..of        | for..of x 1,339,234 ops/sec ±0.42% (68 runs sampled) |

`for...of` uses `@iterator`s internally which has aren't as efficient
