---
title: Content flow spacing
tags:
  - css
  - html
date: git Last Modified
---

This is used to space content items out

```css
:root {
  --flow-space: 1.4rem;
}

.flow {
  & > * {
    max-width: 65ch; /* Optional max line-width */
  }

  & > * + * {
    margin-block-start: var(--flow-space, 1em);
  }

  :is(h1, h2, h3, blockquote) {
    --flow-space: 2rem;
  }

  :is(h1, h2, h3) + * {
    --flow-space: 1rem;
  }
}
```

```html
<section class="flow">
  <h1>Content flow spacing</h1>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, odit rem
    natus modi eos molestias sed delectus quos tempora. Architecto ipsum ex vel
    et minus itaque deserunt sequi unde consectetur?
  </p>
  <h2>h2. heading</h2>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad iusto eligendi
    provident amet. Ab ullam dolores, veritatis nemo atque consectetur quae
    numquam commodi amet veniam totam eligendi placeat ratione velit?
  </p>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, odit rem
    natus modi eos molestias sed delectus quos tempora. Architecto ipsum ex vel
    et minus itaque deserunt sequi unde consectetur?
  </p>
  <h3>h3. heading</h3>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad iusto eligendi
    provident amet. Ab ullam dolores, veritatis nemo atque consectetur quae
    numquam commodi amet veniam totam eligendi placeat ratione velit?
  </p>
  <p>
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

<iframe height="300" style="width: 100%;" scrolling="no" title="Flexible content without wrapper divs" src="https://codepen.io/mrmartineau/embed/MWLrrXa?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/mrmartineau/pen/MWLrrXa">
  Flexible content without wrapper divs</a> by Zander Martineau (<a href="https://codepen.io/mrmartineau">@mrmartineau</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
