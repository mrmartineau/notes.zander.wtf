---
title: Eleventy
link: https://www.11ty.dev/docs/
tags:
  - 11ty
date: git Last Modified
emoji: ⓫
---

## Eleventy config

### Add a filter

```js
eleventyConfig.addFilter('readableDate', (dateObj) => {
  return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('dd LLL, yyyy')
})
```

Usage:

```liquid
{{ page.date | readableDate }}
```

## Nunjucks

### Active class on links

```liquid
<a
  class="{{ 'active' if '/' === page.url }}"
  href="{{ '/' | url }}"
>
  Home
</a>

<!-- or to set an active link for all items in a subdirectory -->

{{ 'active' if '/blog' in page.url }}
```

More examples: https://bryanlrobinson.com/blog/using-nunjucks-if-expressions-to-create-an-active-navigation-state-in-11ty/
