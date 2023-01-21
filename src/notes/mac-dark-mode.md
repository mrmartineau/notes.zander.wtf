---
title: Disable dark mode for specific Mac apps
date: git Last Modified
---

First, get the bundle identifier for the app that you want to turn off dark mode.

```sh
osascript -e 'id of app "{app name}"'

# e.g.
osascript -e 'id of app "Dash"' # com.kapeli.dashdoc
osascript -e 'id of app "Chrome"' # com.google.Chrome
```

Then run

```sh
defaults write {package.name} NSRequiresAquaSystemAppearance -bool Yes

# e.g.
defaults write com.kapeli.dashdoc NSRequiresAquaSystemAppearance -bool Yes
defaults write com.google.Chrome NSRequiresAquaSystemAppearance -bool Yes
```

If you wish to restore the app’s theme to its default configuration then run the below command. Doing so will re-enable the dark mode for the particular app.

```sh
defaults write {package.name} NSRequiresAquaSystemAppearance -bool no

# e.g.
defaults write com.kapeli.dashdoc NSRequiresAquaSystemAppearance -bool no
defaults write com.google.Chrome NSRequiresAquaSystemAppearance -bool no

# or
defaults delete com.google.Chrome NSRequiresAquaSystemAppearance
```

Alternatively, use the [Nightowl](https://nightowlapp.co/) app to have this control in an easier way
