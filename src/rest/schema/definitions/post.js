const BodyItem = require('./body-item')
const Image = require('./image')
const NavItem = require('./nav-item')
const Person = require('./person')
const Social = require('./social')

module.exports = {
  type: 'object',
  properties: {
    authors: { type: 'array', items: Person },
    body: { type: 'string' },
    bodyItems: { type: 'array', items: BodyItem },
    images: { type: 'array', items: Image },
    navItems: { type: 'array', items: NavItem },
    publishDate: { type: 'string' },
    published: { type: 'boolean' },
    slug: { type: 'string' },
    social: Social,
    teaser: { type: 'string' },
    title: { type: 'string' },
  }
}
