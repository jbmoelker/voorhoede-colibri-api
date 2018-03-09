require('dotenv').config()
const express = require('express')
const graphqlRouter = require('./graphql')
const nunjucks = require('nunjucks')
const reloadRouter = require('./reload')
const restRouter = require('./rest')
const restVersion = require('./rest/version')

const { PORT = 2473 } = process.env

const app = express()
const nunjucksEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader(__dirname, { noCache: true }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
  next()
})

app.get('/', (req, res) => res.send(nunjucksEnv.render(`index.html`, { page: 'info', restVersion })))
app.use('/assets/', express.static(`${__dirname}/assets/`))
app.use('/favicon.ico', express.static(`${__dirname}/assets/images/favicon.ico`))
app.get('/api/', (req, res) => res.redirect(`/api/${restVersion}`))
app.use(`/api/${restVersion}/`, restRouter)
app.use('/graphql/', graphqlRouter)
app.use('/reload-data/', reloadRouter)

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`)
})
