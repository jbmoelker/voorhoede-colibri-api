const dataLoader = require('../data-loader')

const name = 'Home'

async function findOne ({ language }) {
  const pageI18n = await dataLoader.load('home')
  const page = pageI18n[language]
  return page
}

module.exports = {
  findOne,
  name,
}
