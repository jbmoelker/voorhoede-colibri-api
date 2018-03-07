const bodyItem = require('./body-item')
const navItem = require('./nav-item')
const social = require('./social')

module.exports = {
  type: 'object',
  properties: {
    body: { type: 'string' },
    bodyItems: { type: 'array', items: bodyItem },
    keywords: { type: 'string' },
    navItems: { type: 'array', items: navItem },
    social: social,
    subtitle: { type: 'string' },
    teamGrid: { type: 'array', items: { type: 'object'} },
    title: { type: 'string' },
  }
}
