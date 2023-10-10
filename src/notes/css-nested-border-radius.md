---
title: Nested border radius
tags:
  - css
link: https://codepen.io/jh3y/pen/KKrYaxx?editors=1100
date: git Last Modified
---

```css
.panel {
  --radius: 28px;
  --padding: 8px;
  --nested-radius: calc(var(--radius) - var(--padding);
}
.content {
  border-radius: var(--nested-radius);
}
```
