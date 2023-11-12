---
title: oEmbed
tags:
  - javascript
  - html
link: https://oembed.com/
date: git Last Modified
---

Default providers list: https://oembed.com/providers.json

Example provider scheme:

```json
{
  "provider_name": "Twitter",
  "provider_url": "http:\/\/www.twitter.com\/",
  "endpoints": [
    {
      "schemes": [
        "https:\/\/twitter.com\/*\/status\/*",
        "https:\/\/*.twitter.com\/*\/status\/*"
      ],
      "url": "https:\/\/publish.twitter.com\/oembed"
    }
  ]
},
```

### Reddit

```json
// https://www.reddit.com/oembed?url=https://www.reddit.com/r/Showerthoughts/comments/2safxv/we_should_start_keeping_giraffes_a_secret_from/cno7zic
{
  "author_name": "Venus_11",
  "html": "\u003cblockquote class=\"reddit-embed-bq\" style=\"height:500px\" \u003e\n\u003ca href=\"https://www.reddit.com/r/OldSchoolCool/comments/17q1xwu/for_the_few_italians_herethis_is_our_old_school/\"\u003eFor the few italians here…this is our old school cool (1990s)\u003c/a\u003e\u003cbr\u003e by\n\u003ca href=\"https://www.reddit.com/user/Venus_11/\"\u003eu/Venus_11\u003c/a\u003e in\n\u003ca href=\"https://www.reddit.com/r/OldSchoolCool/\"\u003eOldSchoolCool\u003c/a\u003e\n\u003c/blockquote\u003e\n\u003cscript async src=\"https://embed.reddit.com/widgets.js\" charset=\"UTF-8\"\u003e\u003c/script\u003e",
  "provider_name": "reddit",
  "provider_url": "https://www.reddit.com",
  "title": "For the few italians here…this is our old school cool (1990s)",
  "type": "rich",
  "height": 500
}
```

### Twitter

```json
// https://publish.twitter.com/oembed?url=https://twitter.com/rowancheung/status/1721939337409888732
{
  "url": "https://twitter.com/rowancheung/status/1721939337409888732",
  "author_name": "Rowan Cheung",
  "author_url": "https://twitter.com/rowancheung",
  "html": "\u003Cblockquote class=\"twitter-tweet\"\u003E\u003Cp lang=\"en\" dir=\"ltr\"\u003EIt&#39;s officially been 24 hours since the OpenAI DevDay announcements. \u003Cbr\u003E\u003Cbr\u003EThe leaks were true. The way we use ChatGPT is about to completely change.\u003Cbr\u003E\u003Cbr\u003EHere are 12 shocking things people have already built (early access): \u003Ca href=\"https://t.co/tCyCncfaZu\"\u003Epic.twitter.com/tCyCncfaZu\u003C/a\u003E\u003C/p\u003E&mdash; Rowan Cheung (@rowancheung) \u003Ca href=\"https://twitter.com/rowancheung/status/1721939337409888732?ref_src=twsrc%5Etfw\"\u003ENovember 7, 2023\u003C/a\u003E\u003C/blockquote\u003E\n\u003Cscript async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"\u003E\u003C/script\u003E\n",
  "width": 550,
  "height": null,
  "type": "rich",
  "cache_age": "3153600000",
  "provider_name": "Twitter",
  "provider_url": "https://twitter.com",
  "version": "1.0"
}
```

### Mastodon

```json
// https://mastodon.social/api/oembed?url=https://mastodon.social/@davatron5000/111364411004016868
{
  "type": "rich",
  "version": "1.0",
  "author_name": "Dave Rupert",
  "author_url": "https://mastodon.social/@davatron5000",
  "provider_name": "mastodon.social",
  "provider_url": "https://mastodon.social/",
  "cache_age": 86400,
  "html": "\u003ciframe src=\"https://mastodon.social/@davatron5000/111364411004016868/embed\" class=\"mastodon-embed\" style=\"max-width: 100%; border: 0\" width=\"400\" allowfullscreen=\"allowfullscreen\"\u003e\u003c/iframe\u003e\u003cscript src=\"https://mastodon.social/embed.js\" async=\"async\"\u003e\u003c/script\u003e",
  "width": 400,
  "height": null
}
```
