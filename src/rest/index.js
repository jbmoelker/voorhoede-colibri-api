require('dotenv').config()
const dataLoader = require('../data-loader')
const express = require('express')
const models = require('../models')
const nunjucks = require('nunjucks')
const path = require('path')
const pick = require('lodash/pick')
const restVersion = require('./version')
const schema = require('./schema')
const swaggerAssetDir = require('swagger-ui-dist').absolutePath()

const nunjucksEnv = new nunjucks.Environment(
  new nunjucks.FileSystemLoader(path.join(__dirname, '..'), { noCache: true })
)
const router = express.Router()

const fieldsToArray = (fields) => {
  if (Array.isArray(fields)) {
    return fields
  } else if (typeof fields === 'string') {
    return fields.split(',').map(field => field.trim())
  } else {
    return []
  }
}
const toInt = (value) => isNaN(parseInt(value, 10)) ? undefined : parseInt(value, 10)

router.get('/', (req, res) => res.send(nunjucksEnv.render(`rest/index.html`, { page: 'rest', restVersion })))
router.use('/swagger-ui', express.static(swaggerAssetDir))
router.get('/swagger.json', async (req, res) => res.json(schema))

router.use((req, res, next) => {
  req.query.limit = toInt(req.query.limit)
  req.query.offset = toInt(req.query.offset)
  req.query.fields = fieldsToArray(req.query.fields)
  next()
})

router.get('/home', async (req, res) => {
  const { language } = req.query
  const page = await dataLoader.load('home')
  const fields = Object.keys(schema.definitions.Home.properties)
  res.json( pick(page[language], fields) )
})

router.get('/event-overview', async (req, res) => {
  const { language } = req.query
  const page = await dataLoader.load('event-overview')
  const fields = Object.keys(schema.definitions.EventOverview.properties)
  res.json( pick(page[language], fields) )
})

router.get('/events', async (req, res) => {
  const { fields, language } = req.query
  const itemsI18n = await dataLoader.load('events')
  const items = itemsI18n[language].map(item => pick(item, fields))
  res.json(items)
})

router.get('/jobs', async (req, res) => {
  const { fields, language } = req.query
  const items = await models.Job.find({ language })
  res.json(items.map(item => pick(item, fields)))
})

router.get('/jobs/:slug', async (req, res) => {
  const { fields, language } = req.query
  const { slug } = req.params
  const item = await models.Job.findOne({ language, slug })
  res.json( pick(item, fields) )
})

router.get('/work', async (req, res) => {
  const { language } = req.query
  const page = await dataLoader.load('work')
  res.json( page[language] )
})

router.get('/projects', async (req, res) => {
  const { fields, language, limit, offset } = req.query
  const items = await models.Project.find({ language, limit, offset })
  res.json(items.map(item => pick(item, fields)))
})

router.get('/projects/:slug', async (req, res) => {
  const { fields, language } = req.query
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
  const { fields, limit, offset } =  req.query
  const items = await models.Post.find({ limit, offset })
  res.json(items.map(item => pick(item, fields)))
})

router.get('/posts/:slug', async (req, res) => {
  const { fields } = req.query
  const { slug } = req.params
  const item = await models.Post.findOne({ slug })
  res.json( pick(item, fields) )
})

router.get('/team', async (req, res) => {
  const { language } = req.query
  const page = await dataLoader.load('team')
  const fields = Object.keys(schema.definitions.Team.properties)
  res.json( pick(page[language], fields) )
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
