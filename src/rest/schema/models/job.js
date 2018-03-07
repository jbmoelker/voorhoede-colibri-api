const bodyItem = require('./body-item')
const navItem = require('./nav-item')

module.exports = {
  type: 'object',
  properties: {
    body: { type: 'string' },
    bodyItems: { type: 'array', items: bodyItem },
    description: { type: 'string' },
    keywords: { type: 'string' },
    navItems: { type: 'array', items: navItem },
    order: { type: 'number' },
    published: { type: 'boolean' },
    slug: { type: 'string' },
    teaser: { type: 'string' },
    title: { type: 'string' },
    url: { type: 'string' },
  }
}
