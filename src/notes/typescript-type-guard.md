---
title: TypeScript type guard
tags:
  - typescript
date: git Last Modified
link: https://camchenry.com/blog/typescript-type-guards
---

Type guards are conditional checks that allow types to be narrowed from general types to more specific ones. With type guards, we do run-time type checking and ensure that code is safe.

## What is narrowing?

In TypeScript, narrowing is the process of refining broad types into more narrow types. Narrowing is useful because it allows code to be liberal in the types that it accepts. Then, we can use type guards to narrow the type down to something more useful.

These are some common examples of narrowing:

- `unknown` or `any` to `string`
- `string | object | number` to `string`
- `number | null | undefined` to `number`
- `string` to a custom type like `NonEmptyString`

These are all examples of type guards:

- `typeof value === 'string'`
- `'name' in data`
- `value instanceof MouseEvent`
- `!value`

A type guard is a special kind of expression that changes the type of a variable. We will look at more examples of type guards in practice later.

## Custom type guards

### String

```ts
const isString = (value: unknown): value is string => {
  return typeof value === 'string'
}
```

### Number

This will guard against `null`, `undefined`

```ts
export const isFiniteNumber = (value: unknown): value is number => {
  return Number.isFinite(value) && typeof value === 'number'
}
```

#### `isFiniteNumber` usage

```ts
isFiniteNumber(10) // true
```

#### `isFiniteNumber` tests

```ts
describe('isFiniteNumber', () => {
  it('should return true', () => {
    expect(isFiniteNumber(-1000)).toBe(true)
    expect(isFiniteNumber(0)).toBe(true)
    expect(isFiniteNumber(10)).toBe(true)
    expect(isFiniteNumber(Number.MAX_VALUE)).toBe(true)
  })
  it('should return false', () => {
    expect(isFiniteNumber(Infinity)).toBe(false)
    expect(isFiniteNumber(undefined)).toBe(false)
    expect(isFiniteNumber(null)).toBe(false)
    expect(isFiniteNumber('Some value')).toBe(false)
    expect(isFiniteNumber({ some: 'value' })).toBe(false)
    expect(isFiniteNumber(() => 20)).toBe(false)
  })
})
```

### `isDefined`

```ts
const isDefined = <Value>(value: Value | undefined | null): value is Value => {
  return value !== null && value !== undefined
}
```

The strengths of each type guard, here is a summary table.

| Type guard                 | Usage                                                           |
| -------------------------- | --------------------------------------------------------------- |
| Boolean / truthiness       | Rule out falsy values like `null`, `undefined`, `''`, `0`, etc. |
| Equality                   | Narrow multiple possible types down to a single type            |
| `typeof`                   | Narrow a type to a primitive type (like string or number)       |
| `instanceof`               | Check if a value is an instance of a specific class             |
| `in`                       | Check if a property can be accessed                             |
| Assertion function         | Assert invariants that should always be true                    |
| Custom type guard function | Check that a type meets some arbitrary conditions               |
