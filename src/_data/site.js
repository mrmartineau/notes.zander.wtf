module.exports = {
  meta: {
    title: 'Code Notes',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    lang: 'en',
    siteUrl: 'https://notes-v2.zander.wtf/',
  },
  feed: {
    // used in feed.xml.njk
    subtitle: 'Lorem ipsum dolor sit amet consecuteor',
    filename: 'atom.xml',
    path: '/atom.xml',
    id: 'https://example.com/',
    authorName: 'John Doe',
    authorEmail: 'johndoe@example.com',
  },
  hero: {
    // used in hero section of main page ie. index.html.njk
    title: 'Welcome to my Code Notes',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores accusantium deserunt odio esse.',
  },
}
