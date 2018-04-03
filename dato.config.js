const bodyToItems = require('./lib/body-to-items')
const listHeadings = require('./lib/list-headings')
const markdownToHtml = require('./lib/markdown-to-html')

const languages = ['nl', 'en']

module.exports = (dato, root, i18n) => {
  root.createDataFile('data/blog.json', 'json', itemToJson(dato.blog))
  root.createDataFile('data/contact.json', 'json', itemToJsonI18n(dato.contact, i18n))
  root.createDataFile('data/event-overview.json', 'json', itemToJsonI18n(dato.eventOverview, i18n))
  root.createDataFile('data/events.json', 'json', itemsToJsonI18n(dato.events, i18n))
  root.createDataFile('data/home.json', 'json', itemToJsonI18n(dato.home, i18n))
  root.createDataFile('data/jobs.json', 'json', itemsToJsonI18n(dato.jobs, i18n))
  root.createDataFile('data/posts.json', 'json', itemsToJson(dato.blogPosts))
  root.createDataFile('data/projects.json', 'json', itemsToJsonI18n(dato.projects, i18n))
  root.createDataFile('data/team.json', 'json', itemToJsonI18n(dato.team, i18n))
  root.createDataFile('data/work.json', 'json', itemToJsonI18n(dato.work, i18n))
}

function itemsToJsonI18n (items, i18n) {
  return languages.reduce((itemsI18n, language) => {
    i18n.locale = language
    itemsI18n[language] = itemsToJson(items, i18n)
    return itemsI18n
  }, {})
}

function itemsToJson (items, i18n) {
  return items
    .filter(item => item.hasOwnProperty('published') ? item.published : true)
    .map(item => itemToJson(item, i18n))
}

function itemToJsonI18n (item, i18n) {
  return languages.reduce((itemI18n, language) => {
    i18n.locale = language
    itemI18n[language] = itemToJson(item)
    return itemI18n
  }, {})
}

function itemToJson (item, i18n) {
  const itemJson = item.toMap()
  const body = markdownToHtml(item.body)
  itemJson.body = body
  itemJson.bodyItems = bodyToItems(body, { images: itemJson.images })
  itemJson.navItems = listHeadings(body)
  itemJson.slugI18n = getSlugI18n(item, i18n)
  return removePrivateProperties(removeSeoMetaTags(itemJson))
}

function getSlugI18n (item, i18n) {
  if (!i18n) return
  return languages.reduce((slugI18n, language) => {
    i18n.withLocale(language, () => {
      slugI18n[language] = item.slug
    })
    return slugI18n
  }, {})
}

function removePrivateProperties (item) {
  const privateProperties = ['id', 'updatedAt', 'createdAt']
  if (typeof item === 'object') {
    privateProperties.forEach(key => delete item[key])
    Object.keys(item).forEach(key => {
      if (Array.isArray(item[key])) {
        item[key].forEach(removePrivateProperties)
      } else if (item[key] && typeof item[key] === 'object') {
        removePrivateProperties(item[key])
      }
    })
  }
  return item
}

function removeSeoMetaTags (item) {
  if (item && item.seoMetaTags) {
    delete item.seoMetaTags
  }
  if (typeof item === 'object') {
    Object.keys(item).forEach(key => {
      if (Array.isArray(item[key])) {
        item[key].forEach(removeSeoMetaTags)
      } else if (item[key] && typeof item[key] === 'object') {
        removeSeoMetaTags(item[key])
      }
    })
  }
  return item
}
