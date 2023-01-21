---
title: Keycode
tags:
  - javascript
emoji: 🔑
link: https://omatsuri.app/events-keycode
date: git Last Modified
---

```ts
document.addEventListener('keydown', (event: Event) => {
  if (!(event instanceof KeyboardEvent)) {
    return
  }
  if (event.target instanceof Node && isFormField(event.target)) {
    return
  }
  if (event.isComposing || event.keyCode === 229) {
    // do something
  }
})
```

Alt link: http://keycode.info/

## `isFormField()` util

```ts
export function isFormField(element: Node): boolean {
  if (!(element instanceof HTMLElement)) {
    return false
  }

  const name = element.nodeName.toLowerCase()
  const type = (element.getAttribute('type') || '').toLowerCase()
  return (
    name === 'select' ||
    name === 'textarea' ||
    (name === 'input' && type !== 'submit' && type !== 'reset') ||
    element.isContentEditable
  )
}
```
