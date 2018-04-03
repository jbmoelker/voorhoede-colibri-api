const BodyItem = require('./body-item')
const Image = require('./image')
const NavItem = require('./nav-item')
const Person = require('./person')
const SlugI18n = require('./slug-i18n')
const Social = require('./social')

module.exports = {
  type: 'object',
  properties: {
    body: { type: 'string' },
    bodyItems: { type: 'array', items: BodyItem },
    contact: Person,
    excerpt: { type: 'string' },
    images: { type: 'array', items: Image },
    isExternalLink: { type: 'boolean' },
    keywords: { type: 'string' },
    linkText: { type: 'string' },
    linkUrl: { type: 'string' },
    navItems: { type: 'array', items: NavItem },
    published: { type: 'boolean' },
    service : { type: 'object' },
    social: Social,
    slug: { type: 'string' },
    slugI18n: SlugI18n,
    subtitle: { type: 'string' },
    summary: { type: 'string' },
    techniques: { type: 'string' },
    title: { type: 'string' },
  }
}
