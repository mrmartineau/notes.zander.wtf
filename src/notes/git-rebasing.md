---
title: Idiot-proof Git Rebasing
tags:
  - cheatsheet
  - git
date: git Last Modified
link: https://softwaredoug.com/blog/2022/11/09/idiot-proof-git-aliases.html
---

By adding these aliases to your git config, you will be able to simplify rebasing.

```sh
[alias]
  # *********************
  # Rebase workflow
    mainbranch = "!git remote show origin | sed -n '/HEAD branch/s/.*: //p'"
    sync = "!git pull origin $(git mainbranch) --rebase"
    update = "!git pull origin $(git rev-parse --abbrev-ref HEAD) --rebase"
    squash = "!git rebase -v -i $(git mainbranch)"
    publish = push origin HEAD --force-with-lease
    pub = publish
```

## Sync your branch with `main`

The `sync` command will get your local branch up to date with your main branch (main or master) at origin (ie Github).

```sh
git sync
```

## Publish your branch’s changes to the world

The publish (abbrev `pub`) command publishes your changes to your remote branch. If other changes have been posted by another user to the remote, then changes will be rejected. You should update first to incorporate their changes and resolve any conflicts.

```sh
git publish
git pub
```

## Update your branch with Github’s copy of your branch

If your local branch gets out of date with origin’s version of your branch, then do an update. This would happen if you’re collaborating on the branch with a colleague and need to get up to date.

```sh
git update
```

## Squash commits

Prior to merging, you likely want to shrink your branch’s many noisy commits to one or two meaningful ones. That’s what squash command does, giving you a chance to rewrite the branch’s history.

```sh
git squash
```
