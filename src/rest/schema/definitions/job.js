const BodyItem = require('./body-item')
const NavItem = require('./nav-item')
const SlugI18n = require('./slug-i18n')

module.exports = {
  type: 'object',
  properties: {
    body: { type: 'string' },
    bodyItems: { type: 'array', items: BodyItem },
    description: { type: 'string' },
    keywords: { type: 'string' },
    navItems: { type: 'array', items: NavItem },
    order: { type: 'number' },
    published: { type: 'boolean' },
    slug: { type: 'string' },
    slugI18n: SlugI18n,
    teaser: { type: 'string' },
    title: { type: 'string' },
    url: { type: 'string' },
  }
}
