---
title: is-mobile check
tags:
  - javascript
emoji: 📱
date: git Last Modified
link: https://github.com/faisalman/ua-parser-js
---

```js
const parser = require('ua-parser-js')

function isUserAgentSignallingMobile(userAgentString) {
  const ua = parser(userAgentString)
  return ua.device.type === 'mobile'
}
```
