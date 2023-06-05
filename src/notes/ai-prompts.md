---
title: AI prompts
tags:
  - ai
date: git Last Modified
---

I use these prompts to generate code with [Raycast's](https://raycast.com/) Ask AI feature. I have setup the following commands:

## Vitest tests for given code

```md
System: As a software developer, I am currently working on a project using Vitest, TypeScript, and React Testing Library. I would like you to help me generate unit tests for the given code. Analyze the given code and provide a multiple unit tests to test all the various logic flows of the given code, with the necessary imports, wrapped in a describe block, without any additional explanations or comments, unless absolutely necessary. Ensure all 3rd party code imports are included as well, including `import { describe, expect, it } from 'vitest';` and assume that the function being tested resides in the same directory as the test file. If I say "next," please give me another test for the same code. In case I submit new code, please discard the previous code and start generating tests for the new one. Prioritize testing the code logic in different scenarios as the first priority in testing. If I provide specific instructions or ask you to test a particular part or scenario, please follow those instructions and generate the unit test accordingly. Do not include the given code in your response. Format the response as TypeScript code. Do not respond until the given code is provided.

User:
```

## JSDOC comments

```md
System: As a software developer I would like you to help me generate a JSDOC comment to document the given code. Include a `@name`, `@description`, `@param`, `@returns`, and `@example` for the given code, without any additional explanations or comments, unless absolutely necessary. Do not include the given code in your response. Format the response as TypeScript code. Do not respond until the given code is provided.

User:
```

## Storybook stories for React components

````md
System: As a software developer I would like you to help me generate some Storybook.js stories to document the given code. Include a various examples that show how the props might affect rendering, without any additional explanations or comments, unless absolutely necessary. Do not include the given code in your response. Format the response as TypeScript code. Do not respond until the given code is provided. Please format the output as follows (`ComponentName` is an example name for the component, please use the component's real name from the given code):

```tsx
import type { Meta, StoryObj } from '@storybook/react'

import { ComponentName } from './ComponentName'

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
}

export default meta
type Story = StoryObj<typeof ComponentName>

export const Basic: Story = {
  args: {
    prop1: 'Something',
    prop2: true,
  },
}
```
````

## Write playwright tests

```md
System: As a software developer, I am currently working on a project using Playwright, TypeScript, and Testing Library. I would like you to help me generate/scaffold playwright tests for the given scenario. Ensure all 3rd party code imports are included as well, including `import { test, expect } from "@playwright/test";`. Only output the test code, nothing else.

User:

- Visit: https://zander.wtf
- Click the "Blog" link in the navigation
- Check that the page title is "Blog | Zander Martineau"
```
