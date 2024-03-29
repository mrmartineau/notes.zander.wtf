---
title: Ignoring code
tags:
  - css
  - html
  - javascript
  - typescript
emoji: 🙅‍♀️
date: 2020-09-21
---

## ESlint

[https://eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-comments](https://eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-comments)

```js
/* eslint-disable */
alert('foo')
/* eslint-enable */

/* eslint-disable no-alert, no-console */
alert('foo')
console.log('bar')
/* eslint-enable no-alert, no-console */

alert('foo') // eslint-disable-line

alert('foo') // eslint-disable-line no-alert
```

## Prettier

[https://prettier.io/docs/en/ignore.html](https://prettier.io/docs/en/ignore.html)

### JavaScript

A JavaScript comment of `// prettier-ignore` will exclude the next node in the abstract syntax tree from formatting.

```js
// prettier-ignore
matrix(
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
)
```

### HTML

```html
<!-- prettier-ignore -->
<div         class="x"       >hello world</div            >

<!-- prettier-ignore-attribute -->
<div
  (mousedown)="       onStart    (    )         "
  (mouseup)="         onEnd      (    )         "
></div>

<!-- prettier-ignore-attribute (mouseup) -->
<div
  (mousedown)="onStart()"
  (mouseup)="         onEnd      (    )         "
></div>
```

### JSX

```jsx
<div>
  {/* prettier-ignore */}
  <span     ugly  format=''   />
</div>
```

### CSS

```css
/* prettier-ignore */
.my    ugly rule
{

}
```

### Markdown

```md
<!-- prettier-ignore -->
Do   not    format   this
```

This type of ignore is only allowed to be used in top-level and aimed to disable formatting for auto-generated content, e.g. all-contributors, markdown-toc, etc.

```md
<!-- prettier-ignore-start -->
<!-- SOMETHING AUTO-GENERATED BY TOOLS - START -->

| MY | AWESOME | AUTO-GENERATED | TABLE |
|-|-|-|-|
| a | b | c | d |

<!-- SOMETHING AUTO-GENERATED BY TOOLS - END -->
<!-- prettier-ignore-end -->
```

### YAML

```yaml
# prettier-ignore
key  : value
hello: world
```

### GraphQL

```graphql
{
  # prettier-ignore
  addReaction(input:{superLongInputFieldName:"MDU6SXNzdWUyMzEzOTE1NTE=",content:HOORAY}) {
    reaction {content}
  }
}
```

## TypeScript

```ts
// @ts-ignore
```

### TSLint

```ts
/* tslint:disable no-console */
console.log()
/* tslint:disable no-console */

/* tslint:disable */
/* tslint:enable */

/* tslint:disable:rule */
/* tslint:enable:rule */

/* tslint:disable-next-line */
/* tslint:disable-line */
/* tslint:disable-next-line:rule */
```

## Stylelint

```js
/* stylelint-disable */
const Container = styled.div``
/* stylelint-enable */
```
