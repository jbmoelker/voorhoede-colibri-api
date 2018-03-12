require('dotenv').config()
const express = require('express')
const models = require('../models')
const pick = require('lodash/pick')
const restVersion = require('./version')
const renderer = require('../renderer')
const schema = require('./schema')

const router = express.Router()

class NotFoundError extends Error {}

/**
 * API Explorer UI
 */
router.get('/', (req, res) => res.send(renderer.render(`rest/index.html`, { page: 'rest', restVersion })))
router.use('/swagger-ui', express.static(require('swagger-ui-dist').absolutePath()))
router.get('/swagger.json', async (req, res) => res.json(schema))

/**
 * API routes
 */
router.use(parseQueryParams())
router.get('/blog', routePage(models.Blog))
router.get('/contact', routePage(models.Contact))
router.get('/event-overview', routePage(models.EventOverview))
router.get('/events', routeCollection(models.Event))
router.get('/home', routePage(models.Home))
router.get('/jobs', routeCollection(models.Job))
router.get('/jobs/:slug', routeItem(models.Job))
router.get('/projects', routeCollection(models.Project))
router.get('/projects/:slug', routeItem(models.Project))
router.get('/posts', routeCollection(models.Post))
router.get('/posts/:slug', routeItem(models.Post))
router.get('/team', routePage(models.Team))
router.get('/work', routePage(models.Work))
router.use(handleErrors())


function handleErrors () {
  return (error, req, res, next) => {
    if (error instanceof NotFoundError) {
      res.status(404).json({
        code: 'NOT_FOUND',
        message: error.message
      })
    }
  }
}

function parseQueryParams () {
  return function (req, res, next) {
    req.query.limit = toInt(req.query.limit)
    req.query.offset = toInt(req.query.offset)
    req.query.fields = fieldsToArray(req.query.fields)
    next()
  }
}

function routeCollection (Model) {
  return async function (req, res) {
    const { fields, language, limit, offset } = req.query
    const items = await Model.find({ language, limit, offset })
    res.json( items.map(item => pick(item, fields)) )
  }
}

function routeItem (Model) {
  return async function (req, res, next) {
    const { fields, language } = req.query
    const { slug } = req.params
    const item = await Model.findOne({ language, slug })
    if (!item) {
      return next(new NotFoundError(`No ${Model.name} found with slug '${slug}'`))
    }
    res.json(pick(item, fields))
  }
}

function routePage (Model) {
  return async function (req, res) {
    const { language } = req.query
    const page = await Model.findOne({ language })
    const fields = Object.keys(schema.definitions[Model.name].properties)
    res.json(pick(page, fields))
  }
}

function fieldsToArray (fields) {
  if (Array.isArray(fields)) {
    return fields
  } else if (typeof fields === 'string') {
    return fields.split(',').map(field => field.trim())
  } else {
    return []
  }
}

function toInt (value) {
  return isNaN(parseInt(value, 10)) ? undefined : parseInt(value, 10)
}

module.exports = router
