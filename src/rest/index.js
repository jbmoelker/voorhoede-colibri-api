require('dotenv').config()
const dataLoader = require('../data-loader')
const express = require('express')
const pick = require('lodash/pick')
const schema = require('./schema')
const swaggerAssetDir = require('swagger-ui-dist').absolutePath()

const router = express.Router()

const sortByPublishDate = (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
const fieldsToArray = (fields) => {
  if (Array.isArray(fields)) {
    return fields
  } else if (typeof fields === 'string') {
    return fields.split(',').map(field => field.trim())
  } else {
    return []
  }
}

router.get('/', express.static(`${__dirname}/index.html`))
router.use('/swagger-ui', express.static(swaggerAssetDir))

router.get('/swagger.json', async (req, res) => {
  res.json(schema)
})

router.get('/home', async (req, res) => {
  const { language } = req.query
  const page = await dataLoader.load('home')
  res.json( page[language] )
})

router.get('/portfolio', async (req, res) => {
  const { language } = req.query
  const page = await dataLoader.load('work')
  res.json( page[language] )
})

router.get('/projects', async (req, res) => {
  const { language } = req.query
  const fields = fieldsToArray(req.query.fields)
  const itemsI18n = await dataLoader.load('projects')
  const items = itemsI18n[language].map(item => pick(item, fields))
  res.json(items)
})

router.get('/projects/:slug', async (req, res) => {
  const { language } = req.query
  const fields = fieldsToArray(req.query.fields)
  const { slug } = req.params
  const itemsI18n = await dataLoader.load('projects')
  const item = pick(itemsI18n[language].find(item => item.slug === slug), fields)
  res.json(item)
})

router.get('/blog', async (req, res) => {
  const page = await dataLoader.load('blog')
  const fields = Object.keys(schema.definitions.Blog.properties)
  res.json(pick(page, fields))
})

router.get('/posts', async (req, res) => {
  const fields = fieldsToArray(req.query.fields)
  const limit = parseInt(req.query.limit)
  const items = await dataLoader.load('posts')
  const realLimit = isNaN(limit) ? items.length : limit
  const tailoredItems = items
    .sort(sortByPublishDate)
    .slice(0, realLimit)
    .map(item => pick(item, fields))
  res.json(tailoredItems)
})

router.get('/posts/:slug', async (req, res) => {
  const { slug } = req.params
  const fields = fieldsToArray(req.query.fields)
  const items = await dataLoader.load('posts')
  const item = pick(items.find(item => item.slug === slug), fields)
  res.json(item)
})

router.get('/team', async (req, res) => {
  const { language } = req.query
  const page = await dataLoader.load('team')
  res.json( page[language] )
})

router.get('/contact', async (req, res) => {
  const { language } = req.query
  const page = await dataLoader.load('contact')
  const fields = Object.keys(schema.definitions.Contact.properties)
  res.json( pick(page[language], fields) )
})

router.get('/:model', async (req, res) => {
  const { model } = req.params
  const data = await dataLoader.load(model)
  res.json(data)
})

router.get('/:model/:slug', async (req, res) => {
  const { model, slug } = req.params
  const items = await dataLoader.load(model)
  const item = items.find(item => item.slug === slug)
  res.json(item)
})

module.exports = router
