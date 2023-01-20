---
title: Shiki Twoslash
date: git Last Modified
link: https://shikijs.github.io/twoslash/
---

```ts twoslash
// Removes 'readonly' attributes from a type's properties
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property]
}

type LockedAccount = {
  readonly id: string
  readonly name: string
}

type UnlockedAccount = CreateMutable<LockedAccount>
```

```ts twoslash
// @module: esnext
// @filename: maths.ts
export function absolute(num: number) {
  if (num < 0) return num * -1
  return num
}
// @filename: index.ts
import { absolute } from './maths'
const value = absolute(-1)
```

```ts twoslash
// @module: esnext
// @filename: maths.ts
export function absolute(num: number) {
  if (num < 0) return num * -1
  return num
}
// @filename: index.ts
import { absolute } from './maths'
const value = absolute(-1)
//    ^?
```

```ts twoslash
// @module: esnext
// @filename: maths.ts
export function absolute(num: number) {
  if (num < 0) return num * -1
  return num
}
// @filename: index.ts
// ---cut---
import { absolute } from './maths'
const value = absolute(-1)
//    ^?
```

```ts twoslash {1, 3-4}
function greet(person: string) {
  console.log(`Hello ${person},`)
  console.log(`How do?`)
}
greet('Maddison')
```
