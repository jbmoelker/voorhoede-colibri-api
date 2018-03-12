const dataLoader = require('../data-loader')

const name = 'Post'

const sortByPublishDate = (a, b) => new Date(b.publishDate) - new Date(a.publishDate)

async function find ({ offset = 0, limit }) {
  const items = await dataLoader.load('posts')
  const realLimit = (isNaN(limit) ? items.length : limit) + offset
  return items
    .sort(sortByPublishDate)
    .slice(offset, realLimit)
}

async function findOne ({ slug }) {
  const items = await dataLoader.load('posts')
  return items
    .find(item => item.slug === slug)
}

module.exports = {
  find,
  findOne,
  name,
}
