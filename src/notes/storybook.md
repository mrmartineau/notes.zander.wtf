---
title: Storybook
tags:
  - testing
  - storybook
emoji: 📖
link: https://storybook.js.org
date: 2021-01-16
---

## Stories

This is a good starter that includes most things you'll need when creating stories. This uses CS3.

```tsx
// MyComponent.story.ts|tsx

import type { Meta, StoryObj } from '@storybook/react'

import { MyComponent } from './MyComponent'

const meta: Meta<typeof MyComponent> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Path/To/MyComponent',
  component: MyComponent,
}

export default meta
type Story = StoryObj<typeof MyComponent>

export const Basic: Story = {
  args: {
    prop1: 'Something',
    prop2: true,
  },
}

// https://storybook.js.org/docs/react/api/csf#spreadable-story-objects
export const BasicOnDark: Story = {
  ...Basic,
  parameters: { background: { default: 'dark' } },
}
```

### Custom render function

```tsx
// This story uses a render function to fully control how the component renders.
export const Example: Story = {
  render: () => (
    <div style={{ maxWidth: '300px' }}>
      <MyComponent prop1="Something" prop2={false} />
    </div>
  ),
}
```

### Play function

Storybook's play functions are small snippets of code executed when the story renders in the UI. They are convenient helper methods to help you test use cases that otherwise weren't possible or required user intervention.

```tsx
// LoginForm.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react'

import { within, userEvent } from '@storybook/testing-library'

import { expect } from '@storybook/jest'

import { LoginForm } from './LoginForm'

const meta: Meta<typeof LoginForm> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Form',
  component: LoginForm,
}

export default meta
type Story = StoryObj<typeof LoginForm>

export const EmptyForm: Story = {}

/*
 * See https://storybook.js.org/docs/react/writing-stories/play-function#working-with-the-canvas
 * to learn more about using the canvasElement to query the DOM
 */
export const FilledForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // 👇 Simulate interactions with the component
    await userEvent.type(canvas.getByTestId('email'), 'email@provider.com')

    await userEvent.type(canvas.getByTestId('password'), 'a-random-password')

    // See https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
    await userEvent.click(canvas.getByRole('button'))

    // 👇 Assert DOM structure
    await expect(
      canvas.getByText(
        'Everything is perfect. Your account is ready and we should probably get you started!'
      )
    ).toBeInTheDocument()
  },
}
```

### Non-story exports

[More info](https://storybook.js.org/docs/react/api/csf#non-story-exports)

```tsx
// MyComponent.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react'

import { MyComponent } from './MyComponent'

import someData from './data.json'

const meta: Meta<typeof MyComponent> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'MyComponent',
  component: MyComponent,
  includeStories: ['SimpleStory'], // 👈 Storybook loads these stories
  excludeStories: /.*Data$/, // 👈 Storybook ignores anything that contains Data
}

export default meta
type Story = StoryObj<typeof MyComponent>

export const simpleData = { foo: 1, bar: 'baz' }
export const complexData = { foo: 1, foobar: { bar: 'baz', baz: someData } }

export const SimpleStory: Story = {
  args: {
    data: simpleData,
  },
}
```

### CS2 format example

```tsx
import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { MyComponent, MyComponentProps } from './myComponent'
// import docs from './myComponent.docs.mdx'

export default {
  title: 'Components/MyComponent',
  component: MyComponent,
  parameters: {
    // docs: { page: docs },
    // paddings: [],
    /* backgrounds: {
      default: 'white',
    },*/
  },
  /* argTypes: {
    // Select element
    variant: {
      name: 'Variant',
      defaultValue: 'large',
      control: {
        type: 'select',
        options: ['large', 'small']
      },
    },
    // Radio
    variant: {
      name: 'Variant',
      defaultValue: 'large',
      control: {
        type: 'radio',
        options: ['large', 'small']
      },
    },
  }, */
} as Meta

const Template: Story<MyComponentProps> = (args) => <Zander {...args} />

export const Standard = Template.bind({})
Standard.args = {}

/* Standard.decorators = [
  (Story) => (
    <Box sx={{ color: 'bright' }}>
      <Story />
    </Box>
  ),
]*/
/* Standard.parameters = {
  backgrounds: {
    default: 'blue',
  },
}*/
```

### MDX

    import { Meta, Story, Preview, Anchor } from '@storybook/addon-docs/blocks'

    <Meta title="Theme UI|Components" />

    ---

    <Anchor storyId="the-title--example" />

    # Title

    ## Example code

    ```jsx
    some code
    ```

#### Story inside MDX

```jsx
<Preview>
  <Story name="Example"></Story>
</Preview>
```

## Config

[Declarative Storybook configuration](https://medium.com/storybookjs/declarative-storybook-configuration-49912f77b78)

```js
// main.js
const path = require('path')
const SRC_PATH = path.join(__dirname, '../src')

module.exports = {
  stories: [
    '../docs/**/*.stories.mdx',
    '../src/**/*.stories.mdx',
    '../**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-paddings',
    'storybook-addon-color-mode',
    '@storybook/addon-a11y',
  ],
  webpackFinal: async (config) => {
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]
    config.module.rules[0].use[0].options.plugins.push(
      require.resolve('babel-plugin-remove-graphql-queries')
    )
    config.resolve.modules.push(SRC_PATH)
    config.module.rules[0].use[0].options.presets = [
      require.resolve('@babel/preset-react'),
      require.resolve('@babel/preset-env'),
    ]
    return config
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'none',
  },
}
```

```js
// preview.js
import React from 'react'
import { withPaddings } from 'storybook-addon-paddings'
import { ThemeProvider } from 'theme-ui'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import theme from '../src/theme/index.js'

export const parameters = {
  layout: 'fullscreen',
  actions: { argTypesRegex: '^on[A-Z].*' },
  // Set some different background colours
  backgrounds: {
    default: 'white',
    values: [
      { name: 'white', value: '#fff' },
      { name: 'peach', value: 'hsla(36, 100%, 92%, 1)' },
      { name: 'pink', value: 'hsla(0, 69%, 91%, 1)' },
      { name: 'green', value: 'hsla(114, 70%, 93%, 1)' },
      { name: 'light blue', value: 'hsla(199, 100%, 93%, 1)' },
      { name: 'blue', value: 'hsl(240, 100%, 22%)' },
      { name: 'dark', value: 'hsl(109, 0%, 16%)' },
    ],
  },
  viewport: {
    viewports: {
      // A few custom viewports
      iphoneSe: {
        name: 'iPhone SE',
        styles: {
          height: '667px',
          width: '375px',
        },
        type: 'mobile',
      },
      iphone12Mini: {
        name: 'iPhone 12 Mini',
        styles: {
          height: '812px',
          width: '375px',
        },
        type: 'mobile',
      },
      // the default viewports from Storybook
      ...INITIAL_VIEWPORTS,
    },

    // storybook-addon-paddings
    paddings: [
      { name: 'Small', value: '16px' },
      { name: 'Medium', value: '32px', default: true },
      { name: 'Large', value: '64px' },
    ],

    // storybook-addon-color-mode
    colorMode: {
      defaultMode: 'default',
      modes: {
        light: {
          name: 'Light',
        },
      },
    },
  },
  options: {
    // custom sidebar sorting
    storySort: {
      order: [
        'Introduction',
        ['Welcome', 'Getting Started'],
        'Docs',
        'Advanced',
        'Typography',
        'Layout',
        'Design System',
        'Page sections',
        'Atoms',
        'Components',
      ],
    },
  },
}

export const decorators = [
  withPaddings,
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
]

// Gatsby's Link overrides:
// Gatsby Link calls the `enqueue` & `hovering` methods on the global variable ___loader.
// This global object isn't set in storybook context, requiring you to override it to empty functions (no-op),
// so Gatsby Link doesn't throw any errors.
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}
// This global variable is prevents the "__BASE_PATH__ is not defined" error inside Storybook.
global.__BASE_PATH__ = '/'
// Navigating through a gatsby app using gatsby-link or any other gatsby component will use the `___navigate` method.
// In Storybook it makes more sense to log an action than doing an actual navigate. Checkout the actions addon docs for more info: https://github.com/storybookjs/storybook/tree/master/addons/actions.
window.___navigate = (pathname) => {
  action('NavigateTo:')(pathname)
}
```

### Useful addons

- [storybook-addon-paddings](https://github.com/rbardini/storybook-addon-paddings)
- [story-description-loader](https://github.com/izhan/storybook-description-loader)
- [storybook-addon-color-mode](https://gitlab.com/joshrasmussen/storybook-addons/-/tree/next/packages%2Fcolor-mode)

```sh
yarn add --dev @storybook/preset-typescript @storybook/addon-docs/preset @storybook/addon-links/register @storybook/addon-actions/register @storybook/addon-backgrounds/register @storybook/addon-a11y/register @storybook/addon-knobs/register @storybook/addon-viewport/register storybook-addon-color-mode/register storybook-addon-paddings story-description-loader
```

With Gatsby: https://www.gatsbyjs.org/docs/visual-testing-with-storybook/
