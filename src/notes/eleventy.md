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

```njk
{{ page.date | readableDate }}
```

## Nunjucks

- Built-in filters: https://mozilla.github.io/nunjucks/templating.html#builtin-filters

### Tags

#### If

```njk
{% if variable %}
  It is true
{% endif %}
```

#### For

```njk
<ul>
{% for item in items %}
  <li>{{ item.title }}</li>
{% else %}
  <li>This would display if the 'item' collection were empty</li>
{% endfor %}
</ul>
```

### Debugging

There are two useful ways to debug data in Nunjucks templates.

#### `dump` filter

Prints the data to the page

```njk
{{ data | dump }}
```

#### `log` filter

Logs the data to your terminal

```njk
{{ data | log }}
```

They can be used together:

```njk
{{ data | dump | log }}
```

### Active class on links

```njk
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
