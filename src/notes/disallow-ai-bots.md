---
title: Disallow AI bots
emoji: 🤖
date: git Last Modified
---

Add this to your robots.txt file to disallow AI bots from crawling your site:

```
User-agent: CCBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Omgilibot
Disallow: /

User-Agent: FacebookBot
Disallow: /
```
