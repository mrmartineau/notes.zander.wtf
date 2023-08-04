---
title: '@font-face'
tags:
  - css
emoji: 📰
date: git Last Modified
---

## Modern browsers

```css
@font-face {
  font-family: 'MyWebFont';
  src: url('myfont.woff2') format('woff2');
  font-display: 'swap';
}
```

### Using variable fonts with @font-face

If you’ve used variable fonts on the web before you’re probably familiar with this syntax, using the string ` "woff2-variations"` in the `format()` function:

```css
@font-face {
  font-family: 'source sans';
  src: url('SourceSansVariable.woff2') format('woff2-variations');
  font-display: 'swap';
}
```

That syntax has now been deprecated (but does still work). The new syntax looks like this:

```css
@font-face {
  font-family: 'source sans';
  src: url('SourceSansVariable.woff2') format(woff2) tech(variations);
  font-display: 'swap';
}
```

More info [here](https://web.dev/variable-fonts/).

Variable font example using [Mona Sans](https://github.com/mona-sans):

```css
@font-face {
  font-family: 'Mona Sans';
  src: url('/fonts/Mona-Sans.woff2') format('woff2 supports variations'), url('/fonts/Mona-Sans.woff2')
      format('woff2-variations');
  font-weight: 200 900;
  font-stretch: 75% 125%;
  font-feature-settings: 'calt' 1, 'liga' 1, 'rlig' 1, 'rvrn' 1, 'kern' 1, 'rclt'
      1;
}
```

## Every browser

```css
/* prettier-ignore */
@font-face {
  font-family: 'MyWebFont';
  src: url('webfont.eot'); /* IE9 Compat Modes */
  src: url('webfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('webfont.woff2') format('woff2'), /* Super Modern Browsers */
       url('webfont.woff') format('woff'), /* Pretty Modern Browsers */
       url('webfont.ttf') format('truetype'), /* Safari, Android, iOS */
       url('webfont.svg#svgFontName') format('svg'); /* Legacy iOS */
  font-display: 'swap';
}
```
