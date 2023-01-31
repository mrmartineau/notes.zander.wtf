---
title: :focus-visible
tags:
  - css
link: https://blog.mayank.co/focus-visible
date: git Last Modified
---

`:focus-visible` allows you to get rid of the annoying focus outline on mouse clicks, while letting you specify the focus styling only for keyboard users (as well as other "tabbing" devices like joysticks)

```css
button:focus-visible {
  outline: 2px solid rebeccapurple;
}
@supports not selector(:focus-visible) {
  button:focus {
    outline: 2px solid rebeccapurple;
  }
}
```

```scss
button {
  &:focus-visible {
    outline: 2px solid rebeccapurple;
  }
  @supports not selector(:focus-visible) {
    &:focus {
      outline: 2px solid rebeccapurple;
    }
  }
}
```

```js
{
  '&:focus-visible' {
    outline: '2px solid rebeccapurple';
  },
  '@supports not selector(:focus-visible)' {
    '&:focus' {
      outline: '2px solid rebeccapurple';
    }
  }
}
```
