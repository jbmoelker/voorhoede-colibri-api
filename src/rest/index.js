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
router.get('/blog', validateFields(models.Blog), routePage(models.Blog))
router.get('/contact', validateLanguage(), validateFields(models.Contact), routePage(models.Contact))
router.get('/event-overview', validateLanguage(), validateFields(models.EventOverview), routePage(models.EventOverview))
router.get('/events', validateLanguage(), validateFields(models.Event), routeCollection(models.Event))
router.get('/home', validateLanguage(), validateFields(models.Home), routePage(models.Home))
router.get('/jobs', validateLanguage(), validateFields(models.Job), routeCollection(models.Job))
router.get('/jobs/:slug', validateLanguage(), validateFields(models.Job), routeItem(models.Job))
router.get('/projects', validateLanguage(), validateFields(models.Project), validatePagination(), routeCollection(models.Project))
router.get('/projects/:slug', validateLanguage(), validateFields(models.Project), routeItem(models.Project))
router.get('/posts', validateFields(models.Post), validatePagination(), routeCollection(models.Post))
router.get('/posts/:slug', validateFields(models.Post), routeItem(models.Post))
router.get('/team', validateLanguage(), validateFields(models.Team), routePage(models.Team))
router.get('/work', validateLanguage(), validateFields(models.Work), routePage(models.Work))
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
  const path = req.route.path.replace(/\//g,'_').replace(':slug', '_slug_')
  return `${baseUrl}/api/${restVersion}#/default/${method}${path}`
}

function getCollectionItemMeta ({ item, Model, req }) {
  const useMeta = req.query.meta
  if (!useMeta) {
    return undefined
  }
  const { fields, language, meta } = req.query
  const queryParams = [
    language ? `language=${language}` : undefined,
    Array.isArray(fields) ? `fields=${fields.join(',')}` : undefined,
    'meta=true'
  ].filter(Boolean)
  const url = `${getBaseUrl(req)}/api/${restVersion}${req.route.path}/${item.slug}?${queryParams.join('&')}`
  return {
    kind: Model.name,
    self: item.slug ? url : undefined
  }
}

function handleErrors () {
  return (error, req, res, next) => {
    const { data, message, statusCode } = error
    if (statusCode && data) {
      res.status(statusCode).json({ error: { ...data, message } })
    } else {
      res.status(500).json({ error: {
        code: 'INTERNAL_ERROR',
        message: 'An internal server error occurred.',
      } })
    }
  }
}

function routeCollection (Model) {
  return async function (req, res, next) {
    const { fields, language, limit, offset } = req.query
    const useMeta = req.query.meta
    const meta = useMeta ? {
      kind: `${Model.name}Collection`,
      self: `${getBaseUrl(req)}${req.originalUrl}`
    } : undefined
    const items = (await Model.find({ language, limit, offset }))
      .map(item => ({ ...item, meta: getCollectionItemMeta({ item, Model, req }) }))
    if (Array.isArray(fields)) {
      return res.json({ meta, items: items.map(item => pick(item, ['meta', ...fields])) })
    }
    res.json({ meta, items })
  }
}

function routeItem (Model) {
  return async function (req, res, next) {
    const { fields, language } = req.query
    const { slug } = req.params
    const useMeta = req.query.meta
    const item = await Model.findOne({ language, slug })
    if (!item) {
      return next(new NotFoundError(`No ${Model.name} found with slug '${slug}'`))
    }
    const meta = useMeta ? {
      kind: Model.name,
      self: `${getBaseUrl(req)}${req.originalUrl}`
    } : undefined
    if (Array.isArray(fields)) {
      res.json({ meta, ...pick(item, fields) })
    } else {
      res.json({ meta, ...item })
    }
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
    const defaultFields = Object.keys(schema.definitions[Model.name].properties)
    const { language, fields = defaultFields } = req.query
    const useMeta = req.query.meta
    const meta = useMeta ? {
      kind: Model.name,
      self: `${getBaseUrl(req)}${req.originalUrl}`
    } : undefined
    const page = await Model.findOne({ language })
    res.json({ meta, ...pick(page, fields) })
  }
}

function fieldsToArray (fields) {
  if (Array.isArray(fields)) {
    return fields
  } else if (typeof fields === 'string') {
    return fields.split(',').map(field => field.trim())
  } else {
    return undefined
  }
}

function isValidInt (value) {
  return !isNaN(parseInt(value, 10))
}

function toInt (value) {
  return isNaN(parseInt(value, 10)) ? undefined : parseInt(value, 10)
}

function validateFields (Model) {
  return function (req, res, next) {
    const fields = fieldsToArray(req.query.fields)
    if (!Array.isArray(fields)) return next()
    const availableFields = Object.keys(schema.definitions[Model.name].properties)
    const invalidFields = fields.filter(field => !availableFields.includes(field))
    if (invalidFields.length) {
      return next(new InvalidParameterError({
        message: `${invalidFields.map(field => `"${field}"`).join(', ')} ${invalidFields.length === 1 ? 'is' : 'are'} not a valid \`fields\` parameter value. See docs for available \`fields\`.`,
        parameter: 'fields',
        docs: getDocsUrl(req),
      }))
    }
    req.query.fields = fields
    next()
  }
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

function validatePagination () {
  const parameters = ['limit', 'offset']
  return function (req, res, next) {

    parameters.forEach(parameter => {
      const value = req.query[parameter]
      if (value && !isValidInt(value)) {
        return next(new InvalidParameterError({
          message: `"${value}" is not a valid \`${parameter}\` parameter value. \`${parameter}\` must be a number.`,
          parameter,
          docs: getDocsUrl(req),
        }))
      }
    })

    req.query.limit = toInt(req.query.limit)
    req.query.offset = toInt(req.query.offset)

    next()
  }
}

module.exports = router
