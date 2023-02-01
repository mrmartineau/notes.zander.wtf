---
title: Fluid typography
tags:
  - css
date: git Last Modified
emoji: 💦
---

```css
html {
  font-size: 16px;
}
@media screen and (min-width: 320px) {
  html {
    font-size: calc(16px + 6 * ((100vw - 320px) / 680));
  }
}

@media screen and (min-width: 1000px) {
  html {
    font-size: 22px;
  }
}
```

Calculate your own: https://websemantics.uk/tools/responsive-font-calculator/

Or use this if you only need to support Safari (11.1+) and Chrome (79+)

```css
html {
  font-size: min(max(16px, 4vw), 22px);
}
```

Or even this if you only support Chrome (79+)

```css
body {
  font-size: clamp(16px, 4vw, 22px);
}
```

Source: https://css-tricks.com/simplified-fluid-typography/

## [Utopia](https://utopia.fyi)

Here's an example from Utopia.fyi for fluid typography

```css
/* @link https://utopia.fyi/type/calculator?c=320,17,1.2,1240,20,1.25,10,3,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l&g=s,l,xl,12 */
:root {
  --step--3: clamp(0.62rem, calc(0.61rem + 0.04vw), 0.64rem);
  --step--2: clamp(0.74rem, calc(0.72rem + 0.11vw), 0.8rem);
  --step--1: clamp(0.89rem, calc(0.85rem + 0.2vw), 1rem);
  --step-0: clamp(1.06rem, calc(1rem + 0.33vw), 1.25rem);
  --step-1: clamp(1.28rem, calc(1.18rem + 0.5vw), 1.56rem);
  --step-2: clamp(1.53rem, calc(1.38rem + 0.74vw), 1.95rem);
  --step-3: clamp(1.84rem, calc(1.63rem + 1.05vw), 2.44rem);
  --step-4: clamp(2.2rem, calc(1.91rem + 1.48vw), 3.05rem);
  --step-5: clamp(2.64rem, calc(2.24rem + 2.04vw), 3.82rem);
  --step-6: clamp(3.17rem, calc(2.62rem + 2.78vw), 4.77rem);
  --step-7: clamp(3.81rem, calc(3.06rem + 3.75vw), 5.96rem);
  --step-8: clamp(4.57rem, calc(3.57rem + 5.01vw), 7.45rem);
  --step-9: clamp(5.48rem, calc(4.15rem + 6.66vw), 9.31rem);
  --step-10: clamp(6.58rem, calc(4.82rem + 8.8vw), 11.64rem);
}
```
