---
title: Async load CSS
tags:
  - css
emoji: 🥱
link: https://www.filamentgroup.com/lab/load-css-simpler
date: git Last Modified
---

```html
<link rel="preload" href="/path/to/my.css" as="style" />
<link
  rel="stylesheet"
  href="/path/to/my.css"
  media="print"
  onload="this.media='all'"
/>
```
