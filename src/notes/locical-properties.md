---
title: CSS logical properties and values
tags:
  - css
date: git Last Modified
---

If you’re creating a website in multiple languages, logical properties and values are incredibly useful. Even if you’re not, there are still some convenient new shorthands it’s worth knowing about.

## Physical properties

We're used to working with physical properties like `margin-right`, `top`, or `border-left`.

```css
ul {
  display: flex;
  list-style: none;
  padding: 0.5rem 0;
}

li {
  background-color: #6befef;
  margin-right: 2rem;
}
```

## Logical properties

<iframe height="300" style="width: 100%;" scrolling="no" title="Logical Properties Mapping" src="https://codepen.io/aardrian/embed/bGGxrvM?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/aardrian/pen/bGGxrvM">
  Logical Properties Mapping</a> by Adrian Roselli (<a href="https://codepen.io/aardrian">@aardrian</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### Sizing

| Physical property | Logical property |
| ----------------- | ---------------- |
| width             | inline-size      |
| max-width         | max-inline-size  |
| min-width         | min-inline-size  |
| height            | block-size       |
| max-height        | max-block-size   |
| min-height        | min-block-size   |

### Borders

| Physical property | Logical property    |
| ----------------- | ------------------- |
| border-top        | border-block-start  |
| border-bottom     | border-block-end    |
| border-left       | border-inline-start |
| border-right      | border-inline-end   |

#### Shorthands

| Physical property              | Logical property |
| ------------------------------ | ---------------- |
| padding-top and padding-bottom | padding-block    |
| padding-left and padding-right | padding-inline   |

### Margin

| Physical property | Logical property    |
| ----------------- | ------------------- |
| margin-top        | margin-block-start  |
| margin-bottom     | margin-block-end    |
| margin-left       | margin-inline-start |
| margin-right      | margin-inline-end   |

#### Shorthands

| Physical property            | Logical property |
| ---------------------------- | ---------------- |
| margin-top and margin-bottom | margin-block     |
| margin-left and margin-right | margin-inline    |

### Padding

| Physical property | Logical property     |
| ----------------- | -------------------- |
| padding-top       | padding-block-start  |
| padding-bottom    | padding-block-end    |
| padding-left      | padding-inline-start |
| padding-right     | padding-inline-end   |

#### Shorthands

| Physical property              | Logical property |
| ------------------------------ | ---------------- |
| padding-top and padding-bottom | padding-block    |
| padding-left and padding-right | padding-inline   |

### Positioning

| Physical property | Logical property   |
| ----------------- | ------------------ |
| top               | inset-block-start  |
| bottom            | inset-block-end    |
| left              | inset-inline-start |
| right             | inset-inline-end   |
| top and           | bottom inset-block |
| left and          | right inset-inline |

### Border radius

| Physical property          | Logical property          |
| -------------------------- | ------------------------- |
| border-top-left-radius     | border-start-start-radius |
| border-top-right-radius    | border-start-end-radius   |
| border-bottom-left-radius  | border-end-start-radius   |
| border-bottom-right-radius | border-end-end-radius     |

## Logical values

### Floats

| Physical value | Logical value       |
| -------------- | ------------------- |
| float: left    | float: inline-start |
| float: right   | float: inline-end   |
| clear: left    | clear: inline-start |
| clear: right   | clear: inline-end   |

### Text alignment

| Physical value    | Writing mode | Logical value     |
| ----------------- | ------------ | ----------------- |
| text-align: left  | LTR          | text-align: start |
| text-align: right | RTL          | text-align: start |
| text-align: left  | RTL          | text-align: end   |
| text-align: right | LTR          | text-align: end   |

## Further reading

- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties
- https://web.dev/learn/css/logical-properties/
- https://www.matuzo.at/blog/2022/100daysof-day2/
- https://www.matuzo.at/blog/2022/100daysof-day3/
