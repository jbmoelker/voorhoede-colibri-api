const dataLoader = require('../data-loader')

const name = 'Team'

async function findOne ({ language }) {
  const pageI18n = await dataLoader.load('team')
  const page = pageI18n[language]
  return page
}

module.exports = {
  findOne,
  name,
}
