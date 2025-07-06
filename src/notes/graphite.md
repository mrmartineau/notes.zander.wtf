---
title: Graphite CLI
tags:
  - git
date: git Last Modified
link: https://graphite.dev/docs/command-reference
---

| Command                                               | Alias                        | Description                                                                                                                             |
| ----------------------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `gt log short`                                        | `gt ls`                      | Run any time branches are created/manipulated/changed                                                                                   |
| `gt create --all --message <COMMIT_MESSAGE>`          | `gt c -am <COMMIT_MESSAGE>`  | Create changes, stage the changes, create a new branch and commit the changes to the new branch all at once                             |
| `gt submit --stack`                                   | `gt ss`                      | Submit your changes across all PRs on a stack                                                                                           |
| `gt submit --stack --update-only`                     | `gt ss -u`                   | Update all PRs for branches in your stack that already have PRs, but do not create new ones                                             |
| `gt modify`                                           | `gt m -a`                    | Update an existing branch with all new changes by amending the existing commit on that branch                                           |
| `gt modify --all --commit --message <COMMIT_MESSAGE>` | `gt m -cam <COMMIT_MESSAGE>` | Update an existing branch with all new changes by creating an entirely new commit on that branch                                        |
| `gt sync --force`                                     | `gt sync -f`                 | Pull your trunk branch, automatically clean up any branches corresponding to merged PRs, and restack any branches that do not conflict. |
