---
title: tmux
tags:
  - terminal
date: git Last Modified
link: https://github.com/tmux/tmux/wiki
---

| Command                       | Description                                 |
| ----------------------------- | ------------------------------------------- |
| `tmux`                        | Start a new session                         |
| `tmux new -s <name>`          | Start a new session with a name             |
| `tmux ls`                     | List all sessions                           |
| `tmux attach -t <name>`       | Attach to a named session                   |
| `tmux kill-session -t <name>` | Kill a named session                        |
| `tmux kill-session -a`        | Kill all sessions except current            |
| `tmux kill-server`            | Kill the tmux server and all sessions       |

## Key Bindings (prefix: `Ctrl+b`)

### Sessions

| Key | Description                        |
| --- | ---------------------------------- |
| `d` | Detach from session                |
| `$` | Rename current session             |
| `s` | List/switch sessions interactively |
| `(` | Move to previous session           |
| `)` | Move to next session               |

### Windows

| Key | Description                 |
| --- | --------------------------- |
| `c` | Create a new window         |
| `n` | Move to next window         |
| `p` | Move to previous window     |
| `w` | List windows                |
| `f` | Find window by name         |
| `,` | Rename current window       |
| `&` | Kill current window         |
| `0-9` | Switch to window by number |

### Panes

| Key           | Description                              |
| ------------- | ---------------------------------------- |
| `%`           | Split pane vertically                    |
| `"`           | Split pane horizontally                  |
| `o`           | Move to next pane                        |
| `q`           | Show pane numbers (type number to jump)  |
| `x`           | Kill current pane                        |
| `z`           | Toggle pane zoom (fullscreen)            |
| `!`           | Convert pane to window                   |
| `{`           | Move pane left                           |
| `}`           | Move pane right                          |
| `Space`       | Cycle through pane layouts               |
| `Ctrl+↑/↓/←/→` | Resize pane in direction                |

### Copy Mode

| Key           | Description                              |
| ------------- | ---------------------------------------- |
| `[`           | Enter copy mode (scroll/search)          |
| `]`           | Paste buffer                             |
| `/`           | Search forward (in copy mode)            |
| `?`           | Search backward (in copy mode)           |

### Misc

| Key | Description          |
| --- | -------------------- |
| `?` | List all key bindings |
| `t` | Show clock           |
| `:` | Enter command mode   |

## Useful Commands

| Command                        | Description                                |
| ------------------------------ | ------------------------------------------ |
| `:setw synchronize-panes`      | Toggle sending input to all panes          |
| `:resize-pane -D 10`           | Resize pane down by 10 cells               |
| `:source-file ~/.tmux.conf`    | Reload tmux config                         |

## Config Snippets (`~/.tmux.conf`)

```bash
# Enable mouse support
set -g mouse on

# 256 color support
set -g default-terminal "screen-256color"

# Reload config with prefix + r
bind r source-file ~/.tmux.conf \; display "Reloaded!"

# Vi mode for copy
setw -g mode-keys vi
```
