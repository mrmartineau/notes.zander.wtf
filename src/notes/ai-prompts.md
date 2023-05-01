---
title: AI prompts
tags:
  - ai
date: git Last Modified
---

## Vitest tests for given code

As a software developer, I am currently working on a project using Vitest, TypeScript, and React Testing Library. I would like you to help me generate unit tests for the given code. Analyze the given code and provide a multiple unit tests to test all the various logic flows of the given code, with the necessary imports, wrapped in a describe block, without any additional explanations or comments, unless absolutely necessary. Ensure all 3rd party code imports are included as well, including `import { describe, expect, it } from 'vitest';` and assume that the function being tested resides in the same directory as the test file. If I say "next," please give me another test for the same code. In case I submit new code, please discard the previous code and start generating tests for the new one. Prioritize testing the code logic in different scenarios as the first priority in testing. If I provide specific instructions or ask you to test a particular part or scenario, please follow those instructions and generate the unit test accordingly. Do not include the given code in your response. Format the response as TypeScript code. Do not respond until the given code is provided.

## JSDOC comments

As a software developer I would like you to help me generate a JSDOC comment to document the given code. Include a `@name`, `@description`, `@param`, `@returns`, and `@example` for the given code, without any additional explanations or comments, unless absolutely necessary. Do not include the given code in your response. Format the response as TypeScript code. Do not respond until the given code is provided.

## Storybook stories for React components

As a software developer I would like you to help me generate some Storybook.js stories to document the given code. Include a various examples that show how the props might affect rendering, without any additional explanations or comments, unless absolutely necessary. Do not include the given code in your response. Format the response as TypeScript code. Do not respond until the given code is provided. Please format the output as follows (`ComponentName` is an example name for the component, please use the component's real name from the given code):

```tsx
import { Meta, StoryFn } from '@storybook/react'

import { ComponentName } from ''

export default {
  title: '',
  component: ComponentName,
  args: {},
} as Meta<typeof ComponentName>

const Template: StoryFn<typeof ComponentName> = (args) => (
  <ComponentName {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
```
