const dataLoader = require('../data-loader')

const name = 'Work'

async function findOne ({ language = 'en' }) {
  const pageI18n = await dataLoader.load('work')
  const page = pageI18n[language]
  return page
}

module.exports = {
  findOne,
  name,
}
