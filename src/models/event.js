const dataLoader = require('../data-loader')

const sortByDate = (a, b) => new Date(b.date) - new Date(a.date)

async function find ({ language = 'en', limit, offset = 0 }) {
  const itemsI18n = await dataLoader.load('events')
  const items = itemsI18n[language]
  const realLimit = (isNaN(limit) ? items.length : limit) + offset
  return items
    .sort(sortByDate)
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
