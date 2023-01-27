---
title: Testing library
tags:
  - testing
  - react
  - cypress
emoji: 🧪
link: https://testing-library.com
date: git Last Modified
---

### Types of queries ([docs](https://testing-library.com/docs/queries/about/#types-of-queries))

https://testing-library.com/docs/dom-testing-library/api-queries

#### Single elements

##### getBy

`getBy...`: Returns the matching node for a query, and throw a descriptive error if no elements match or if more than one match is found (use `getAllBy` instead if more than one element is expected).

##### queryBy

`queryBy...`: Returns the matching node for a query, and return `null` if no elements match. This is useful for asserting an element that is not present. Throws an error if more than one match is found (use `queryAllBy` instead if this is OK).

##### findBy

`findBy...`: Returns a Promise which resolves when an element is found which matches the given query. The promise is rejected if no element is found or if more than one element is found after a default timeout of 1000ms. If you need to find more than one element, use `findAllBy`.

### Multiple Elements

- `getAllBy...`: Returns an array of all matching nodes for a query, and throws an error if no elements match.
- `queryAllBy...`: Returns an array of all matching nodes for a query, and return an empty array ([]) if no elements match.
- `findAllBy...`: Returns a promise which resolves to an array of elements when any elements are found which match the given query. The promise is rejected if no elements are found after a default timeout of 1000ms.
  - `findBy` methods are a combination of `getBy*` queries and [`waitFor`](https://testing-library.com/docs/dom-testing-library/api-async#waitfor). They accept the z options as the last argument (i.e. await `screen.findByText('text', queryOptions, waitForOptions)`)

## React

https://testing-library.com/docs/react-testing-library/intro

```js
import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { Button } from './Button'

describe('Given a Button component', () => {
  describe('when it is rendered', () => {
    test('should have the text `This is a button`', () => {
      // Arrange
      const { getByText } = render(<Button>This is a button</Button>)

      // Act
      fireEvent.click(getByText('This is a button'))

      // Assert
      expect(getByText('This is a button')).toHaveTextContent(
        'This is a button'
      )
    })
  })
})
```

## Frameworks

### React testing library ([docs](https://testing-library.com/docs/react-testing-library/intro))

```sh
npm install --save-dev @testing-library/react
```

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Fetch from './fetch'

test('loads and displays greeting', async () => {
  // ARRANGE
  render(<Fetch url="/greeting" />)

  // ACT
  await userEvent.click(screen.getByText('Load Greeting'))
  await screen.findByRole('heading')

  // ASSERT
  expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  expect(screen.getByRole('button')).toBeDisabled()
})
```

### Cypress testing library ([docs](https://testing-library.com/docs/cypress-testing-library/intro))

#### Install

```sh
npm install --save-dev @testing-library/cypress
```

Add this line to your project's cypress/support/commands.js:

```ts
import '@testing-library/cypress/add-commands'
```

```js
cy.findAllByText('Jackie Chan').click()
cy.findByText('Button Text').should('exist')
cy.findByText('Non-existing Button Text').should('not.exist')
cy.findByLabelText('Label text', { timeout: 7000 }).should('exist')

// findAllByText _inside_ a form element
cy.get('form').findByText('Button Text').should('exist')
cy.get('form').then((subject) => {
  cy.findByText('Button Text', { container: subject }).should('exist')
})
```
