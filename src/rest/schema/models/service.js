const bodyItem = require('./body-item')
const image = require('./image')
const social = require('./social')

module.exports = {
  type: 'object',
  properties: {
    itemType: { type: 'string' },
    images: { type: 'array', items: image },
    actionText: { type:  'string' },
    summary: { type:  'string' },
    body: { type:  'string' },
    bodyItems: { type: 'array', items: bodyItem },
    teaser: { type:  'string' },
    tagline: { type:  'string' },
    title: { type:  'string' },
    subtitle: { type:  'string' },
    icon: { type:  'string' },
    keywords: { type:  'string' },
    social: social,
    slug: { type:  'string' },
  }
}
