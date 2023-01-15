module.exports = {
  meta: {
    title: 'Code Notes',
    description: 'My digital garden of code notes',
    lang: 'en',
    siteUrl: 'https://notes-v2.zander.wtf/',
  },
  feed: {
    // used in feed.xml.njk
    subtitle: 'My digital garden of code notes',
    filename: 'atom.xml',
    path: '/atom.xml',
    id: 'https://example.com/',
    authorName: 'John Doe',
    authorEmail: 'johndoe@example.com',
  },
  hero: {
    // used in hero section of main page ie. index.html.njk
    title: 'Welcome to my Code Notes',
    description: 'My digital garden of code notes',
  },
}
