const BodyItem = require('./body-item')
const NavItem = require('./nav-item')
const Project = require('./project')
const Service = require('./service')
const Social = require('./social')

module.exports = {
  type: 'object',
  properties: {
    body: { type: 'string' },
    bodyItems: { type: 'array', items: BodyItem },
    headerTitle: { type: 'string' },
    highlights: { type: 'array', items: Project },
    keywords: { type: 'string' },
    navItems: { type: 'array', items: NavItem },
    services: { type: 'array', items: Service },
    servicesDescription: { type: 'string' },
    servicesHeader: { type: 'string' },
    social: Social,
    subtitle: { type: 'string' },
    title: { type: 'string' },
    usps: { type: 'string' },
  }
}
