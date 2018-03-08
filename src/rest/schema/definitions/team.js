const BodyItem = require('./body-item')
const NavItem = require('./nav-item')
const Social = require('./social')

module.exports = {
  type: 'object',
  properties: {
    body: { type: 'string' },
    bodyItems: { type: 'array', items: BodyItem },
    keywords: { type: 'string' },
    navItems: { type: 'array', items: NavItem },
    social: Social,
    subtitle: { type: 'string' },
    teamGrid: { type: 'array', items: { type: 'object'} },
    title: { type: 'string' },
  }
}
