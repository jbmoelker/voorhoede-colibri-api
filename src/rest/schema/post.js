const bodyItem = require('./body-item')
const image = require('./image')
const navItem = require('./nav-item')
const person = require('./person')
const social = require('./social')

module.exports = {
  type: 'object',
  properties: {
    authors: { type: 'array', items: person },
    body: { type: 'string' },
    bodyItems: { type: 'array', items: bodyItem },
    images: { type: 'array', items: image },
    navItems: { type: 'array', items: navItem },
    publishDate: { type: 'string' },
    published: { type: 'boolean' },
    slug: { type: 'string' },
    social: social,
    teaser: { type: 'string' },
    title: { type: 'string' },
  }
}
