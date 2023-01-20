---
title: RenderIfRole
tags:
  - react
emoji: ⚛
date: git Last Modified
---

```tsx
import { ReactNode } from 'react'
import { useUserContext } from '../../providers'

export enum Roles {
  none = 'none',
  admin = 'admin',
  superadmin = 'superadmin',
  user = 'user',
  readonly = 'readonly',
}

export interface RenderIfRoleProps {
  roles: Roles[]
  children: ReactNode
}

export const RenderIfRole = ({
  roles,
  children,
}: RenderIfRoleProps): ReactNode | null => {
  const { role } = useUserContext() // get user's current role, could also be passed as a prop
  const providedRolesMatchUserRole = role && roles.includes(Roles[role])

  if (providedRolesMatchUserRole) {
    return children
  }
  return null
}
```

## Usage

This component is used to conditionally show content based on a user's role.

This link will only be shown if the current user's role matches `Roles.admin`

```tsx
<RenderIfRole roles={[Roles.admin]}>
  <Link to={INVITE_PAGE_PATH}>Invite</Link>
</RenderIfRole>
```

Multiple roles can be passed in to the `roles` prop, like so:

```tsx
<RenderIfRole roles={[Roles.client, Roles.trainee]}>Some content</RenderIfRole>
```
