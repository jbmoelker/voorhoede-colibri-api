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

/**
 *
 */
router.get('/', (req, res) => res.send(nunjucksEnv.render(`rest/index.html`, { page: 'rest', restVersion })))
router.use('/swagger-ui', express.static(swaggerAssetDir))
router.get('/swagger.json', async (req, res) => res.json(schema))

/**
 *
 */
router.use((req, res, next) => {
  req.query.limit = toInt(req.query.limit)
  req.query.offset = toInt(req.query.offset)
  req.query.fields = fieldsToArray(req.query.fields)
  next()
})

router.get('/events', routeCollection(models.Event))
router.get('/jobs', routeCollection(models.Job))
router.get('/jobs/:slug', routeItem(models.Job))
router.get('/projects', routeCollection(models.Project))
router.get('/projects/:slug', routeItem(models.Project))
router.get('/posts', routeCollection(models.Post))
router.get('/posts/:slug', routeItem(models.Post))


router.get('/home', async (req, res) => {
  const { language } = req.query
  const page = await dataLoader.load('home')
  const fields = Object.keys(schema.definitions.Home.properties)
  res.json( pick(page[language], fields) )
})

router.get('/blog', async (req, res) => {
  const page = await dataLoader.load('blog')
  const fields = Object.keys(schema.definitions.Blog.properties)
  res.json(pick(page, fields))
})

router.get('/contact', async (req, res) => {
  const { language } = req.query
  const page = await dataLoader.load('contact')
  const fields = Object.keys(schema.definitions.Contact.properties)
  res.json( pick(page[language], fields) )
})

router.get('/event-overview', async (req, res) => {
  const { language } = req.query
  const page = await dataLoader.load('event-overview')
  const fields = Object.keys(schema.definitions.EventOverview.properties)
  res.json( pick(page[language], fields) )
})

router.get('/team', async (req, res) => {
  const { language } = req.query
  const page = await dataLoader.load('team')
  const fields = Object.keys(schema.definitions.Team.properties)
  res.json( pick(page[language], fields) )
})

router.get('/work', async (req, res) => {
  const { language } = req.query
  const page = await dataLoader.load('work')
  const fields = Object.keys(schema.definitions.Work.properties)
  res.json( pick(page[language], fields) )
})


function routeCollection (Model) {
  return async function (req, res) {
    const { fields, language, limit, offset } = req.query
    const items = await Model.find({ language, limit, offset })
    res.json( items.map(item => pick(item, fields)) )
  }
}

function routeItem (Model) {
  return async function (req, res) {
    const { fields, language } = req.query
    const { slug } = req.params
    const item = await Model.findOne({ language, slug })
    res.json(pick(item, fields))
  }
}

module.exports = router
