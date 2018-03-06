const image = require('./image')

module.exports = {
  type: 'object',
  properties: {
    image: image,
    slug: { type: 'string' },
    lastName: { type: 'string' },
    name: { type: 'string' },
  }
}
