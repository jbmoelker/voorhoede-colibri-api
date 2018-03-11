const dataLoader = require('../data-loader')

async function find ({ language = 'en', offset = 0, limit }) {
  const itemsI18n = await dataLoader.load('projects')
  const items = itemsI18n[language]
  const realLimit = (isNaN(limit) ? items.length : limit) + offset
  return items
    .slice(offset, realLimit)
}

async function findOne ({ language, slug }) {
  const items = await find({ language })
  return items
    .find(item => item.slug === slug)
}

module.exports = {
  find,
  findOne,
}
