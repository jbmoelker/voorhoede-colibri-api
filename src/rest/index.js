require('dotenv').config()
const express = require('express')
const models = require('../models')
const pick = require('lodash/pick')
const restVersion = require('./version')
const renderer = require('../renderer')
const schema = require('./schema')
const URL = require('url')

const router = express.Router()

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
router.get('/contact', validateLanguage(), routePage(models.Contact))
router.get('/event-overview', validateLanguage(), routePage(models.EventOverview))
router.get('/events', validateLanguage(), routeCollection(models.Event))
router.get('/home', validateLanguage(), routePage(models.Home))
router.get('/jobs', validateLanguage(), routeCollection(models.Job))
router.get('/jobs/:slug', validateLanguage(), routeItem(models.Job))
router.get('/projects', validateLanguage(), routeCollection(models.Project))
router.get('/projects/:slug', validateLanguage(), routeItem(models.Project))
router.get('/posts', routeCollection(models.Post))
router.get('/posts/:slug', routeItem(models.Post))
router.get('/team', validateLanguage(), routePage(models.Team))
router.get('/work', validateLanguage(), routePage(models.Work))
router.use('/*', routeMissing())
router.use(handleErrors())


class InvalidParameterError extends Error {
  constructor ({ message, parameter, docs }, ...params) {
    super(message, ...params)
    this.statusCode = 400
    this.data = { code: 'INVALID_PARAMETER', parameter, docs }
    Error.captureStackTrace(this, InvalidParameterError) // maintain proper stack trace
  }
}

class MissingParameterError extends Error {
  constructor ({ parameter, docs }, ...params) {
    const message = `Query parameter \`${parameter}\` is required.`
    super(message, ...params)
    this.statusCode = 400
    this.data = { code: 'MISSING_PARAMETER', parameter, docs }
    Error.captureStackTrace(this, MissingParameterError) // maintain proper stack trace
  }
}

class NotFoundError extends Error {
  constructor (...params) {
    super(...params)
    this.statusCode = 404
    this.data = { code: 'NOT_FOUND' }
    Error.captureStackTrace(this, NotFoundError) // maintain proper stack trace
  }
}

class RouteNotFoundError extends Error {
  constructor ({ message, route, docs }, ...params) {
    super(message, ...params)
    this.statusCode = 404
    this.data = { code: 'ROUTE_NOT_FOUND', route, docs }
    Error.captureStackTrace(this, RouteNotFoundError) // maintain proper stack trace
  }
}

function getBaseUrl (req) {
  const { BASE_URL } = process.env
  return BASE_URL ? BASE_URL : `${req.protocol}://${req.get('host')}`
}

function getDocsUrl (req) {
  const baseUrl = getBaseUrl(req)
  const method = req.method.toLowerCase()
  const path = req.route.path.replace('/','_')
  return `${baseUrl}/api/${restVersion}#/default/${method}${path}`
}

function handleErrors () {
  return (error, req, res, next) => {
    const { data, message, statusCode } = error
    if (statusCode && data) {
      res.status(statusCode).json({ error: { ...data, message } })
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

function routeMissing () {
  return function (req, res, next) {
    const route = URL.parse(req.originalUrl).pathname
    next(new RouteNotFoundError({
      message: `No route matching '${route}'. See docs for available routes.`,
      docs: `${getBaseUrl(req)}/api/${restVersion}`,
      route
    }))
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

function validateLanguage () {
  const validLanguages = ['en', 'nl']
  return function (req, res, next) {
    const { language } = req.query
    if (!language) {
      return next (new MissingParameterError({
        parameter: 'language',
        docs: getDocsUrl(req),
      }))
    }
    if (!validLanguages.includes(language)) {
      return next(new InvalidParameterError({
        message: `"${language}" is not a valid \`language\` parameter value. Use ${validLanguages.map(text => `"${text}"`).join(' or ')}.`,
        parameter: 'language',
        docs: getDocsUrl(req),
      }))
    }
    next()
  }
}

module.exports = router
