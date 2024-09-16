---
title: JSDoc
tags:
  - javascript
date: git Last Modified
link: https://jsdoc.app/
emoji: 📑
plugin-prettier: "false"
---

### Functions

```js
/**
 * This is a function.
 *
 * @param {string} n - A string param
 * @param {string} [o] - A optional string param
 * @param {string} [d=DefaultValue] - A optional string param
 * @return {string} A good string
 *
 * @example
 *
 *     foo('hello')
 */

function foo(n, o, d) {
  return n
}
```

## Types

| Annotation                      | Note                                  |
| ------------------------------- | ------------------------------------- |
| `@param {string=} n`            | Optional                              |
| `@param {string} [n]`           | Optional                              |
| `@param {(string\|number)} n`   | Multiple types                        |
| `@param {*} n`                  | Any type                              |
| `@param {...string} n`          | Repeatable arguments                  |
| `@param {string} [n="hi"]`      | Optional with default                 |
| `@param {string[]} n`           | Array of strings                      |
| `@return {Promise<string[]>} n` | Promise fulfilled by array of strings |

## Variables

```js
/**
 * @type {number}
 */
var FOO = 1
```

```js
/**
 * @const {number}
 */
const FOO = 1
```
## Typedef

```js
/**
 * A song
 * @typedef {Object} Song
 * @property {string} title - The title
 * @property {string} artist - The artist
 * @property {number} year - The year
 */
```

```js
/**
 * Plays a song
 * @param {Song} song - The {@link Song} to be played
 */

function play(song) {}
```

### Shorthand

```js
/**
 * A song
 * @typedef {{title: string, artist: string, year: number}} Song
 */
```

```js
/**
 * Plays a song
 * @param {Song} song - The {@link Song} to be played
 */

function play(song) {}
```

## Other keywords

```js
/**
 * @throws {FooException}
 * @async
 * @private
 * @deprecated
 * @see
 *
 * @function
 * @class
 */
```

## Importing types

```js
/**
 * @typedef {import('./Foo').default} Bar
 */

// or

/** @import { Bar } from "./Foo.js" */

/**
 * @param {Bar} x
 */

function test(x) {}
```
