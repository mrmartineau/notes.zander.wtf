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

If the element has a border as well:

```css
.panel {
  --border-width: 5px;
  --outer-radius: calc(var(--radius) * var(--unit));
  --outer-padding: calc(var(--padding) * var(--unit));
  --inner-radius: calc(
    (var(--outer-radius) - var(--outer-padding)) - var(--border-width)
  );
  border-radius: var(--nested-radius);
}
```
