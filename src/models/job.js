const dataLoader = require('../data-loader')

const name = 'Job'

async function find ({ language = 'en' }) {
  const itemsI18n = await dataLoader.load('jobs')
  const items = itemsI18n[language]
  return items
}

async function findOne ({ language, slug }) {
  const items = await find({ language })
  return items
    .find(item => item.slug === slug)
}

module.exports = {
  find,
  findOne,
  name,
}
