---
title: font-weight
tags:
  - css
emoji: 🏋️‍♂️
date: git Last Modified
link: https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
---

## Font weights

```css
/* Keyword values */
font-weight: normal;
font-weight: bold;

/* Keyword values relative to the parent */
font-weight: lighter;
font-weight: bolder;

/* Numeric keyword values */
font-weight: 100;
font-weight: 200;
font-weight: 300;
font-weight: 400; /* normal */
font-weight: 500;
font-weight: 600;
font-weight: 700; /* bold */
font-weight: 800;
font-weight: 900;

/* Global values */
font-weight: inherit;
font-weight: initial;
font-weight: revert;
font-weight: revert-layer;
font-weight: unset;
```

### Common weight name mapping

| Value | Common weight name        |
| ----- | ------------------------- |
| 100   | Thin (Hairline)           |
| 200   | Extra Light (Ultra Light) |
| 300   | Light                     |
| 400   | Normal (Regular)          |
| 500   | Medium                    |
| 600   | Semi Bold (Demi Bold)     |
| 700   | Bold                      |
| 800   | Extra Bold (Ultra Bold)   |
| 900   | Black (Heavy)             |
| 950   | Extra Black (Ultra Black) |

### Meaning of relative weights

When `lighter` or `bolder` is specified, the below chart shows how the absolute font weight of the element is determined.

| Inherited value | bolder | lighter |
| --------------- | ------ | ------- |
| 100             | 400    | 100     |
| 200             | 400    | 100     |
| 300             | 400    | 100     |
| 400             | 700    | 100     |
| 500             | 700    | 100     |
| 600             | 900    | 400     |
| 700             | 900    | 400     |
| 800             | 900    | 700     |
| 900             | 900    | 700     |

## Variable font weights

```css
font-variation-settings: 'wght' 900, 'wdth' 75, 'ital' 0;
```

[More info](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide)
