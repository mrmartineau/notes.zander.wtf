---
title: Vitest
tags:
  - testing
date: git Last Modified
link: https://vitest.dev
emoji: ⚡
---

## `vitest.config.ts`

Vitest can share your Vite config, or you can create a dedicated config.

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'happy-dom', // or 'jsdom'
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
})
```

## `vitest.setup.ts`

### With `@testing-library/jest-dom`

The modern way to set up jest-dom matchers:

```ts
import '@testing-library/jest-dom/vitest'
```

That's it! The package auto-extends Vitest's `expect` when you import it.

### Additional setup

```ts
import '@testing-library/jest-dom/vitest'

// Mock matchMedia if needed
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
```

## Writing tests

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('MyFunction', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should do something', () => {
    expect(myFunction()).toBe(expected)
  })
})
```

## Mocking

### Mock a module

```ts
import { vi } from 'vitest'

vi.mock('./myModule', () => ({
  myFunction: vi.fn(() => 'mocked value'),
}))
```

### Spy on a function

```ts
const spy = vi.spyOn(object, 'method')
expect(spy).toHaveBeenCalledWith('arg')
```

### Mock timers

```ts
beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

it('handles timeout', () => {
  const callback = vi.fn()
  setTimeout(callback, 1000)

  vi.advanceTimersByTime(1000)
  expect(callback).toHaveBeenCalled()
})
```

## Testing React components

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
  it('handles click', async () => {
    const user = userEvent.setup()
    render(<MyComponent />)

    await user.click(screen.getByRole('button'))

    expect(screen.getByText('Clicked!')).toBeInTheDocument()
  })
})
```

## Inline snapshots

```ts
expect(result).toMatchInlineSnapshot(`
  {
    "id": 1,
    "name": "Test",
  }
`)
```

## Running tests

```bash
vitest          # Watch mode
vitest run      # Single run
vitest --ui     # UI mode
vitest --coverage # With coverage
```
