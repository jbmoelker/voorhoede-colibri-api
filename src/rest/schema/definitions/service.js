const BodyItem = require('./body-item')
const Image = require('./image')
const Social = require('./social')

module.exports = {
  type: 'object',
  properties: {
    itemType: { type: 'string' },
    images: { type: 'array', items: Image },
    actionText: { type:  'string' },
    summary: { type:  'string' },
    body: { type:  'string' },
    bodyItems: { type: 'array', items: BodyItem },
    teaser: { type:  'string' },
    tagline: { type:  'string' },
    title: { type:  'string' },
    subtitle: { type:  'string' },
    icon: { type:  'string' },
    keywords: { type:  'string' },
    social: Social,
    slug: { type:  'string' },
  }
}
