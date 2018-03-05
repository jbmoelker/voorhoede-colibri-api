const bodyItem = require('./body-item')
const image = require('./image')
const navItem = require('./nav-item')
const person = require('./person')
const social = require('./social')

module.exports = {
  type: 'object',
  properties: {
    body: { type: 'string' },
    bodyItems: { type: 'array', items: bodyItem },
    contact: person,
    excerpt: { type: 'string' },
    images: { type: 'array', items: image },
    isExternalLink: { type: 'boolean' },
    keywords: { type: 'string' },
    linkText: { type: 'string' },
    linkUrl: { type: 'string' },
    navItems: { type: 'array', items: navItem },
    published: { type: 'boolean' },
    service : { type: 'object' },
    social: social,
    slug: { type: 'string' },
    subtitle: { type: 'string' },
    summary: { type: 'string' },
    techniques: { type: 'string' },
    title: { type: 'string' },
  }
}
