---
title: Jest global mocks
tags:
  - javascript
  - testing
emoji: 🧪
date: 2020-03-26
---

## Some useful mocks

```js
/**
 * Mocks that could be used by any jest test
 */

/**
 * Contract + integration tests will use node env, not jsdom;
 * window doesn't exist in node and will make jest fail.
 * Put any mocks referencing 'window' in this 'if' block.
 */
if (typeof window != 'undefined') {
  window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }
  })
}

jest.mock('next/link', () => {
  return ({ children }) => {
    return children
  }
})

jest.mock('next/router', () => {
  return {
    push: () => {},
    replace: () => {},
    prefetch: () => {},
  }
})

jest.mock('../utils/getConfig')

// Mock the publicRuntimeConfig
import config from 'config'
const mockPublicConfigData = {
  env: config.get('env'),
  base: config.get('base'),
  client: config.get('client'),
}

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: mockPublicConfigData,
}))

global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
}
```
