---
title: Postman.io
tags:
  - javascript
emoji: 📨
date: 2020-03-26
---

## Save an env var

```js
var jsonData = JSON.parse(responseBody)
pm.environment.set('ref', jsonData.refs[0].ref)
```
