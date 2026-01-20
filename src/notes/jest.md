---
title: Jest
tags:
  - javascript
  - react
  - testing
emoji: 🧪
date: git Last Modified
---

> For new projects, consider using [Vitest](/notes/vitest) instead. It's faster, has better ESM support, and is compatible with most Jest APIs.

## Basic test skeleton

```js
describe('MyFunction', () => {
  it('should do something', () => {
    // Arrange
    const input = 'test'

    // Act
    const result = myFunction(input)

    // Assert
    expect(result).toBe('expected')
  })
})
```

## Use Jest globals

```js
import { expect, test, describe, beforeEach, jest } from '@jest/globals'

test('two plus two is four', () => {
  expect(2 + 2).toBe(4)
})
```

## Mocking

### Mock a function

```js
const mockFn = jest.fn()
mockFn.mockReturnValue('mocked value')
mockFn.mockResolvedValue('async mocked value')

// Check calls
expect(mockFn).toHaveBeenCalled()
expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2')
expect(mockFn).toHaveBeenCalledTimes(2)
```

### Mock a module

```js
jest.mock('./myModule', () => ({
  myFunction: jest.fn(() => 'mocked'),
}))
```

### Spy on a method

```js
const spy = jest.spyOn(object, 'method')
expect(spy).toHaveBeenCalled()
spy.mockRestore()
```

## Async testing

```js
test('async function', async () => {
  const result = await fetchData()
  expect(result).toEqual({ data: 'value' })
})

test('resolves correctly', async () => {
  await expect(fetchData()).resolves.toEqual({ data: 'value' })
})

test('rejects with error', async () => {
  await expect(failingFetch()).rejects.toThrow('Network error')
})
```

## Testing throws

```js
test('throws on invalid input', () => {
  expect(() => formatDate('invalid')).toThrow('Date string wrong format')
  expect(() => formatDate('invalid')).toThrow(Error)
  expect(() => formatDate('invalid')).toThrowErrorMatchingInlineSnapshot(
    `"Date string wrong format"`
  )
})
```

## Matchers cheatsheet

```js
// Equality
expect(value).toBe(exact)           // strict equality (===)
expect(value).toEqual(obj)          // deep equality
expect(value).toStrictEqual(obj)    // deep equality + undefined props

// Truthiness
expect(value).toBeTruthy()
expect(value).toBeFalsy()
expect(value).toBeNull()
expect(value).toBeUndefined()
expect(value).toBeDefined()

// Numbers
expect(value).toBeGreaterThan(3)
expect(value).toBeLessThan(5)
expect(value).toBeCloseTo(0.3, 5)   // for floats

// Strings
expect(string).toMatch(/pattern/)
expect(string).toContain('substring')

// Arrays
expect(array).toContain(item)
expect(array).toHaveLength(3)
expect(array).toContainEqual({ id: 1 })

// Objects
expect(object).toHaveProperty('key')
expect(object).toHaveProperty('key', 'value')
expect(object).toMatchObject({ subset: true })
```
