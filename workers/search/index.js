import algoliasearch from 'algoliasearch/lite'

// Color hash implementation (simplified version of color-hash)
function hashCode(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
    hash = hash & hash
  }
  return Math.abs(hash)
}

function getColourFromString(item) {
  const hash = hashCode(item)
  const h = hash % 360
  const s = 40
  const l = 60
  return `hsla(${h},${s}%,${l}%,0.6)`
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function formatDate(dateString) {
  const date = new Date(dateString)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const day = date.getUTCDate().toString().padStart(2, '0')
  const month = months[date.getUTCMonth()]
  const year = date.getUTCFullYear()
  return `${day} ${month}, ${year}`
}

function renderTagBadge(tag) {
  if (!tag) return ''
  const tagName = slugify(tag)
  const tagColor = getColourFromString(tagName)
  return `<span class="badge" style="background-color: ${tagColor};">${tag}</span>`
}

function renderTagDot(tag) {
  if (!tag) {
    return `<span class="tagDot" style="background-color: #ddd;"></span>`
  }
  const tagName = slugify(tag)
  const tagColor = getColourFromString(tagName)
  return `<span class="tagDot" style="background-color: ${tagColor};"></span>`
}

function renderSearchResults(results) {
  if (!results || results.length === 0) {
    return '<p>No results found.</p>'
  }

  return `<div>
    ${results.map(note => `
      <a href="${note.url}" class="noteListItem">
        <div class="noteListItem-title flex gap-3 items-center">
          ${note.emoji ? `<span>${note.emoji}</span>` : ''}
          ${note.title}
        </div>
        <div class="flex gap-2 items-center">
          ${note.tags && note.tags.length ? `
            <div class="noteListItem-tags">
              ${note.tags.map(tag => renderTagBadge(tag)).join(' ')}
            </div>
          ` : ''}
          ${note.date ? `
            <div class="noteListItem-date">
              ${formatDate(note.date)}
            </div>
          ` : ''}
        </div>
      </a>
    `).join('')}
  </div>`
}

function renderSidebar(tagList) {
  const currentYear = new Date().getFullYear()

  return `
    <aside class="cn-sidebar">
      <div class="cn-sidebar-contentWrapper">
        <div class="cn-sidebar-top">
          <div class="cn-sidebar-wrapper">
            <div class="prose prose-zinc dark:prose-invert">
              <div class="cn-siteDescription">
                TILs, snippets—my digital code garden 🌱. By Zander Martineau
              </div>
            </div>

            <nav>
              <a class="cn-sidebar-link uppercase" href="/">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon" width="16">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                All notes
              </a>
              ${tagList
                .filter(tag => tag.name !== 'untagged')
                .map(tag => `
                  <a class="cn-sidebar-link" href="/tags/${slugify(tag.path)}">
                    ${renderTagDot(tag.name)}
                    ${tag.name} (${tag.count})
                  </a>
                `).join('')}
              ${tagList
                .filter(tag => tag.name === 'untagged')
                .map(tag => `
                  <a class="cn-sidebar-link" href="/tags/${slugify(tag.path)}">
                    ${renderTagDot(tag.name)}
                    ${tag.name} (${tag.count})
                  </a>
                `).join('')}
            </nav>
          </div>
        </div>

        <footer class="cn-sidebar-bottom cn-sidebar-wrapper text-sm">
          <div>
            &copy; ${currentYear} • Made by
            <a href="https://zander.wtf">Zander</a> • <a href="/colophon">Colophon</a> •
            <a href="/feed.xml">RSS</a>
          </div>
        </footer>
      </div>
    </aside>
  `
}

function renderPage(query, results, tagList) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Search Page | Zander's Code Notes</title>
    <meta name="description" content="TILs, snippets—my digital code garden 🌱. By Zander Martineau" />
    <link rel="shortcut icon" href="/public/favicon-32x32.png" type="image/png" />
    <link rel="stylesheet" href="/css/index.css" media="all" />
    <link rel="alternate" type="application/rss+xml" title="RSS" href="/feed.xml" />
  </head>
  <body>
    <div class="cn-layoutWrapper">
      ${renderSidebar(tagList)}

      <main id="main" class="cn-main">
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center gap-6 mb-10">
            <button class="cn-nav">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon" width="20">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <form class="grow" action="/search/">
              <label class="visually-hidden">Search notes</label>
              <input
                type="search"
                name="query"
                placeholder="Search notes"
                value="${query || ''}"
                class="searchInput"
              />
              <button class="visually-hidden">Search</button>
            </form>
          </div>
          <div class="container">
            <div class="prose prose-zinc dark:prose-invert mb-4">
              <h2 class="mb-3">
                You searched for: "${query || ''}"
              </h2>
            </div>
            ${renderSearchResults(results)}
          </div>
        </div>
      </main>
    </div>

    <script>
      const burger = document.querySelector('.cn-nav')
      const mainEl = document.querySelector('.cn-main')
      burger.addEventListener('click', () => {
        mainEl.toggleAttribute('open')
      })

      function isFormField(element) {
        if (!(element instanceof HTMLElement)) {
          return false
        }

        const name = element.nodeName.toLowerCase()
        const type = (element.getAttribute('type') || '').toLowerCase()
        return (
          name === 'select' ||
          name === 'textarea' ||
          (name === 'input' && type !== 'submit' && type !== 'reset') ||
          element.isContentEditable
        )
      }

      const inputEl = document.querySelector('.searchInput')
      document.addEventListener('keydown', (event) => {
        if (!(event instanceof KeyboardEvent)) {
          return
        }
        if (event.target instanceof Node && isFormField(event.target)) {
          return
        }
        if (event.isComposing || event.key === '/') {
          event.preventDefault()
          inputEl.focus()
        }
      })
    </script>
  </body>
</html>`
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const query = url.searchParams.get('query') || ''

    let results = []
    let tagList = []

    try {
      // Initialize Algolia client
      const client = algoliasearch(env.ALGOLIA_APP, env.ALGOLIA_SEARCH_KEY)
      const index = client.initIndex(env.ALGOLIA_INDEX)

      // Fetch tag list from static JSON (built at deploy time)
      try {
        const tagListResponse = await fetch(`${url.origin}/api/taglist.json`)
        if (tagListResponse.ok) {
          tagList = await tagListResponse.json()
        }
      } catch (e) {
        console.error('Failed to fetch tag list:', e)
      }

      // Search Algolia if query provided
      if (query) {
        const searchResults = await index.search(query, {
          attributesToRetrieve: ['title', 'url', 'date', 'tags', 'emoji'],
          attributesToHighlight: [],
        })
        results = searchResults.hits || []
      }
    } catch (error) {
      console.error('Search error:', error)
    }

    const html = renderPage(query, results, tagList)

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=UTF-8',
        'Cache-Control': 'no-cache',
      },
    })
  },
}

