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

#### Single elements

- `getBy...`: Returns the matching node for a query, and throw a descriptive error if no elements match or if more than one match is found (use `getAllBy` instead if more than one element is expected).
- `queryBy...`: Returns the matching node for a query, and return `null` if no elements match. This is useful for asserting an element that is not present. Throws an error if more than one match is found (use `queryAllBy` instead if this is OK).
- `findBy...`: Returns a Promise which resolves when an element is found which matches the given query. The promise is rejected if no element is found or if more than one element is found after a default timeout of 1000ms. If you need to find more than one element, use `findAllBy`.

#### Multiple Elements

- `getAllBy...`: Returns an array of all matching nodes for a query, and throws an error if no elements match.
- `queryAllBy...`: Returns an array of all matching nodes for a query, and return an empty array ([]) if no elements match.
- `findAllBy...`: Returns a promise which resolves to an array of elements when any elements are found which match the given query. The promise is rejected if no elements are found after a default timeout of 1000ms.
  - `findBy` methods are a combination of `getBy*` queries and [`waitFor`](https://testing-library.com/docs/dom-testing-library/api-async#waitfor). They accept the `waitFor` options as the last argument (i.e. `await screen.findByText('text', queryOptions, waitForOptions)`)

## Frameworks

### [React](https://testing-library.com/docs/react-testing-library/intro)

```sh
npm install --save-dev @testing-library/react
```

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Fetch from './fetch'

test('loads and displays greeting', async () => {
  // Setup userEvent instance (recommended over calling methods directly)
  const user = userEvent.setup()

  // ARRANGE
  render(<Fetch url="/greeting" />)

  // ACT
  await user.click(screen.getByText('Load Greeting'))
  await screen.findByRole('heading')

  // ASSERT
  expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  expect(screen.getByRole('button')).toBeDisabled()
})
```

### Common userEvent actions

```tsx
const user = userEvent.setup()

await user.click(element)
await user.dblClick(element)
await user.type(input, 'Hello World')
await user.clear(input)
await user.selectOptions(select, ['option1', 'option2'])
await user.keyboard('{Enter}')
await user.tab()
await user.hover(element)
await user.unhover(element)
```

### [Cypress](https://testing-library.com/docs/cypress-testing-library/intro)

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
