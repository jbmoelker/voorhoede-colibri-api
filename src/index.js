require('dotenv').config()
const compression = require('compression')
const cors = require('cors');
const express = require('express')
const helmet = require('helmet')
const graphqlRouter = require('./graphql')
const reloadRouter = require('./reload')
const renderer = require('./renderer')
const restRouter = require('./rest')
const restVersion = require('./rest/version')

const { BASE_URL, PORT = 2473 } = process.env

const app = express()

app.use(helmet())
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,OPTIONS,POST,PUT',
  allowedHeaders: 'Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers'
}))
app.use(compression())

app.get('/', (req, res) => {
  const baseUrl = BASE_URL ? BASE_URL : `${req.protocol}://${req.get('host')}`
  res.send(renderer.render(`index.html`, { baseUrl, page: 'info', restVersion }))
})
app.use('/assets/', express.static(`${__dirname}/assets/`))
app.use('/favicon.ico', express.static(`${__dirname}/assets/images/favicon.ico`))
app.get('/api/', (req, res) => res.redirect(`/api/${restVersion}`))
app.use(`/api/${restVersion}/`, restRouter)
app.use('/graphql/', graphqlRouter)
app.use('/reload-data/', reloadRouter)

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`)
})
