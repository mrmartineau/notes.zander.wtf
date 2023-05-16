---
title: Svelte
tags:
  - svelte
date: git Last Modified
---

## How to extend prop types from HTML elements

For everyone who wants to create a wrapper component around a certain HTML element and wants a way to type "this component accepts all properties of X", here's how you do it as of Svelte version 3.55:

```html
<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  interface $$Props extends HTMLButtonAttributes {
    error: boolean // your own additional typings
  }

  export let error: boolean
  // ...
</script>

<!-- ... -->
<button>
  <slot />
</button>
```

[Link](https://github.com/sveltejs/language-tools/issues/442#issuecomment-1359423782)
