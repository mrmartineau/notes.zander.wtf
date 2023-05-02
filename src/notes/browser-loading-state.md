---
title: Native browser loading state
tags:
  - javascript
link: https://twitter.com/_developit/status/1625612424576376840
date: git Last Modified
---

With the new [Navigation API](http://developer.mozilla.org/en-US/docs/Web/API/Navigation), you can now show the native spinner + stop button for any asynchronous operation - all you need is a Promise.

```js
function showLoading(promise) {
  navigation.addEventListener(
    'navigate',
    (event) => {
      event.intercept({
        scroll: 'manual',
        handler: () => promise,
      })
    },
    { once: true }
  )
  return navigation.navigate(location.href).finished
}

// show browser loading UI
showLoading(new Promise((r) => setTimeout(r, 1500)))
```

### Further reading

- https://developer.chrome.com/docs/web-platform/navigation-api/#intercepting
