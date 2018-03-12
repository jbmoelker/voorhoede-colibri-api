const dataLoader = require('../data-loader')

const name = 'Blog'

async function findOne () {
  const page = await dataLoader.load('blog')
  return page
}

module.exports = {
  findOne,
  name,
}
