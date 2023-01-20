---
title: Postman.io
tags:
  - javascript
emoji: 📨
date: git Last Modified
---

## Save an env var

```js
var jsonData = JSON.parse(responseBody)
pm.environment.set('ref', jsonData.refs[0].ref)
```
