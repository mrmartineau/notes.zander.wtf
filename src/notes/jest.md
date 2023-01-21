---
title: Jest
tags:
  - javascript
  - react
  - testing
emoji: 🧪
date: 2022-06-10
---

## Basic test skeleton

```js
describe('Given a xxx', () => {
  describe('when it is rendered', () => {
    test('it should ', () => {
      // Arrange

      // Act

      // Assert
      expect(true).toBe(true)
    })
  })
})
```

### Use Jest globals

```js
import { expect, test } from '@jest/globals'

test('two plus two is four', () => {
  expect(2 + 2).toBe(4)
})
```

### Throw

```js
import { formatDate } from './formatDate'

test('it should throw', () => {
  expect(() => formatDate('197901180')).toThrow(
    'Date string wrong format/length'
  )
  expect(() => formatDate('abcdefgh')).toThrow(
    'Date string must be only digits'
  )
})
```
