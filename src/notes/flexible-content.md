---
title: Flexible content without wrapper divs
tags:
  - css
  - html
date: git Last Modified
emoji: 𝌞
---

Based on [this article](https://ryanmulligan.dev/blog/x-scrolling-centered-max-width-container/) by Ryan Mulligan

```css
.content {
  --content-max-width: 900px;
  --content-breakout-width: 2rem;
  display: grid;
  grid-template-columns:
    /* prettier-ignore */
    [full-start] 1fr
    [breakout-start] var(--content-breakout-width)
    [content-start] minmax(min-content, var(--content-max-width))
    [content-end] var(--content-breakout-width)
    [breakout-end] 1fr [full-end];

  > * {
    grid-column: content;
  }

  .content-breakout {
    grid-column: breakout;
  }

  .content-full {
    grid-column: full;
  }

  .content-callout {
    padding: 1rem;
    background-color: #ddd;
  }
}
```

```html
<section class="content">
  <h1>Flexible content without wrapper divs</h1>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad iusto eligendi
    provident amet. Ab ullam dolores, veritatis nemo atque consectetur quae
    numquam commodi amet veniam totam eligendi placeat ratione velit?
  </p>
  <p class="content-breakout content-callout">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, odit rem
    natus modi eos molestias sed delectus quos tempora. Architecto ipsum ex vel
    et minus itaque deserunt sequi unde consectetur?
  </p>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad iusto eligendi
    provident amet. Ab ullam dolores, veritatis nemo atque consectetur quae
    numquam commodi amet veniam totam eligendi placeat ratione velit?
  </p>
  <img
    src="https://images.unsplash.com/photo-1682687220211-c471118c9e92?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    class="content-full"
  />
  <p class="content-callout">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, odit rem
    natus modi eos molestias sed delectus quos tempora. Architecto ipsum ex vel
    et minus itaque deserunt sequi unde consectetur?
  </p>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad iusto eligendi
    provident amet. Ab ullam dolores, veritatis nemo atque consectetur quae
    numquam commodi amet veniam totam eligendi placeat ratione velit?
  </p>
</section>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="Flexible content without wrapper divs" src="https://codepen.io/mrmartineau/embed/XWOVNra?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/mrmartineau/pen/XWOVNra">
  Flexible content without wrapper divs</a> by Zander Martineau (<a href="https://codepen.io/mrmartineau">@mrmartineau</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## Alternate solution for full-bleed content

From [this article](https://archive.hankchizljaw.com/wrote/creating-a-full-bleed-css-utility/) by Andy Bell

```css
.full-bleed {
  width: 100vw;
  margin-left: calc(50% - 50vw);
}
```

<iframe
  height="265"
  style="width: 100%;"
  scrolling="no"
  title="Piccalilli Demo - Full Bleed Utility"
  src="https://codepen.io/andybelldesign/embed/vYOJjNw?height=265&theme-id=light&default-tab=result"
  frameborder="no"
  allowtransparency="true"
  allowfullscreen="true"
>
  See the Pen{' '}
  <a href="https://codepen.io/andybelldesign/pen/vYOJjNw">
    Piccalilli Demo - Full Bleed Utility
  </a>{' '}
  by Andy Bell (<a href="https://codepen.io/andybelldesign">@andybelldesign</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
