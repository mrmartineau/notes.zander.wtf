---
title: Storybook
tags:
  - testing
  - storybook
emoji: 📖
link: https://storybook.js.org
date: git Last Modified
---

## Stories (CSF3)

This is a good starter that includes most things you'll need when creating stories.

```tsx
// MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { MyComponent } from './MyComponent'

const meta = {
  title: 'Components/MyComponent',
  component: MyComponent,
  // Autodocs
  tags: ['autodocs'],
  // Default args for all stories
  args: {
    prop1: 'Default value',
  },
} satisfies Meta<typeof MyComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    prop1: 'Something',
    prop2: true,
  },
}

export const OnDark: Story = {
  ...Default,
  parameters: {
    backgrounds: { default: 'dark' },
  },
}
```

### Custom render function

```tsx
export const WithWrapper: Story = {
  render: (args) => (
    <div style={{ maxWidth: '300px' }}>
      <MyComponent {...args} />
    </div>
  ),
}
```

### Play function (interaction testing)

Play functions let you simulate user interactions for testing.

```tsx
// LoginForm.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, expect } from '@storybook/test'
import { LoginForm } from './LoginForm'

const meta = {
  title: 'Forms/LoginForm',
  component: LoginForm,
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const FilledForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.type(
      canvas.getByLabelText('Email'),
      'email@provider.com'
    )
    await userEvent.type(
      canvas.getByLabelText('Password'),
      'a-random-password'
    )
    await userEvent.click(canvas.getByRole('button', { name: 'Sign in' }))

    await expect(canvas.getByText('Welcome back!')).toBeInTheDocument()
  },
}
```

### Args and argTypes

```tsx
const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>
```

### Decorators

```tsx
const meta = {
  title: 'Components/Card',
  component: Card,
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>
```

### Non-story exports

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { MyComponent } from './MyComponent'

const meta = {
  title: 'MyComponent',
  component: MyComponent,
  // Only include these as stories
  includeStories: ['Default', 'WithData'],
  // Or exclude anything matching pattern
  excludeStories: /.*Data$/,
} satisfies Meta<typeof MyComponent>

export default meta
type Story = StoryObj<typeof meta>

// This won't be a story (excluded by pattern)
export const mockData = { foo: 1, bar: 'baz' }

export const Default: Story = {}

export const WithData: Story = {
  args: { data: mockData },
}
```

## Config

### `main.ts`

```ts
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
}

export default config
```

### `preview.ts`

```ts
// .storybook/preview.ts
import type { Preview } from '@storybook/react'
import '../src/styles/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ fontFamily: 'system-ui, sans-serif' }}>
        <Story />
      </div>
    ),
  ],
}

export default preview
```

## Useful addons

- [@storybook/addon-a11y](https://storybook.js.org/addons/@storybook/addon-a11y) - Accessibility testing
- [@storybook/addon-interactions](https://storybook.js.org/addons/@storybook/addon-interactions) - Debug play functions
- [storybook-addon-paddings](https://github.com/rbardini/storybook-addon-paddings) - Add padding around stories
- [@storybook/addon-themes](https://storybook.js.org/addons/@storybook/addon-themes) - Theme switching

## Testing with Storybook

Stories can be reused in unit tests using `composeStories`:

```tsx
// MyComponent.test.tsx
import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import * as stories from './MyComponent.stories'

const { Default, WithData } = composeStories(stories)

test('renders default state', () => {
  render(<Default />)
  expect(screen.getByText('Hello')).toBeInTheDocument()
})

test('renders with data', () => {
  render(<WithData />)
  expect(screen.getByText('Data loaded')).toBeInTheDocument()
})
```
