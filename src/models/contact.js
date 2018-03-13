const dataLoader = require('../data-loader')

const name = 'Contact'

async function findOne ({ language = 'en' }) {
  const pageI18n = await dataLoader.load('contact')
  const page = pageI18n[language]
  return page
}

module.exports = {
  findOne,
  name,
}
