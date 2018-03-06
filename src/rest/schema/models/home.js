const bodyItem = require('./body-item')
const navItem = require('./nav-item')
const project = require('./project')
const service = require('./service')
const social = require('./social')

module.exports = {
  type: 'object',
  properties: {
    body: { type: 'string' },
    bodyItems: { type: 'array', items: bodyItem },
    headerTitle: { type: 'string' },
    highlights: { type: 'array', items: project },
    keywords: { type: 'string' },
    navItems: { type: 'array', items: navItem },
    services: { type: 'array', items: service },
    servicesDescription: { type: 'string' },
    servicesHeader: { type: 'string' },
    social: social,
    subtitle: { type: 'string' },
    title: { type: 'string' },
    usps: { type: 'string' },
  }
}
