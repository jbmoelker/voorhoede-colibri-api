const express = require('express')
const graphqlHTTP = require('express-graphql')
const renderer = require('../renderer')
const schema = require('./schema')

const router = express.Router()

router.get('/', renderGraphiQL())
router.use(graphqlHTTP({ schema }))

function renderGraphiQL() {
  return function (req, res, next) {
    if (!req.accepts('text/html')) return next()
    res.send(renderer.render(`graphql/index.html`, {
      page: 'graphql',
      GRAPHIQL_VERSION: '0.11.11',
      // queryString: undefined,
      // resultString: undefined,
      // variablesString: undefined,
      // operationName: undefined,
    }))
  }
}

module.exports = router
