---
title: Web Share
tags:
  - javascript
emoji: "\U0001F4E4"
date: git Last Modified
link: https://web.dev/web-share/
---

```js
const shareData = {
  title: 'My Page',
  text: 'Check out this page.',
  url: 'https://example.com/',
}

// Check if sharing is supported
if (navigator.canShare?.(shareData)) {
  try {
    await navigator.share(shareData)
    console.log('Shared successfully')
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('Error sharing:', err)
    }
  }
}
```

Legacy check (for older browsers):

```js
if (navigator.share) {
  navigator
    .share(shareData)
    .then(() => console.log('Successful share'))
    .catch((error) => console.log('Error sharing', error))
}
```

If your page has a canonical url:

```js
let url = document.location.href
const canonicalElement = document.querySelector('link[rel=canonical]')
if (canonicalElement !== null) {
  url = canonicalElement.href
}
navigator.share({ url: url })
```

## Code snippets

```html
<h1>This is a demo of the web share button</h1>

<p>
  Here is an image that you can
  <a class="web-share" href="https://placekitten.com/200/287">share the URL</a>:
</p>
<p>
  <img src="http://placekitten.com/200/287" alt="Place holder image" />
</p>
```

```js
let shareButtons = document.querySelectorAll('a.web-share')
for (button of shareButtons) {
  button.addEventListener('click', function (e) {
    let href = this.getAttribute('href')
    let alt = this.getAttribute('alt')
    if (navigator.share) {
      navigator.share({
        title: alt,
        url: href,
      })
      e.preventDefault()
    }
  })
}
```

## Demo

<iframe height="574" style="width: 100%;" scrolling="no" title="Demo of Web Share button" src="https://codepen.io/makzan/embed/gJRvzR?height=574&theme-id=light&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/makzan/pen/gJRvzR'>Demo of Web Share button</a> by Thomas Seng Hin Mak
  (<a href='https://codepen.io/makzan'>@makzan</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## References

- [https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share)
