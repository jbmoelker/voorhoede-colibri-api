const dataLoader = require('../data-loader')

const name = 'EventOverview'

async function findOne ({ language = 'en' }) {
  const pageI18n = await dataLoader.load('event-overview')
  const page = pageI18n[language]
  return page
}

module.exports = {
  findOne,
  name,
}
