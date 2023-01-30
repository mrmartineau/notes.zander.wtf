<div align="center">
  <img src="https://raw.githubusercontent.com/mrmartineau/11ty-notes/main/logo.png" width="140">
  <h1>
    Code Notes
  </h1>

> This is a new version of my notes site ([notes.zander.wtf](https://notes.zander.wtf)) built with [Eleventy](https://www.11ty.dev/). Soon, the old one will be archived and the domain transferred to this one.

</div>

This site is built wit [11ty](https://www.11ty.dev/).

## Search

Search for this site is powered by [Algolia](https://www.algolia.com/). The search index is built when the site is built, find the `_site/algolia.json` file for the data.

To enable search for yourself, you will need to setup your own Algolia account, and then the following environment variables:

```
# The app id
ALGOLIA_APP = ""
# The search-only API key
ALGOLIA_SEARCH_KEY = ""
# The index name
ALGOLIA_INDEX = ""
```

---

## License

[MIT](https://choosealicense.com/licenses/mit/) © [Zander Martineau](https://zander.wtf)

> Made by [Zander ⚡](https://github.com/mrmartineau/)
