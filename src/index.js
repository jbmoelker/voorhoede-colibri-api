require('dotenv').config()
const express = require('express')
const fs = require('fs')
const graphqlRouter = require('./graphql')
const reloadRouter = require('./reload')
const restRouter = require('./rest')

const { PORT = 2473 } = process.env

const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
  next()
})

app.get('/', (req, res) => fs.createReadStream(`${__dirname}/index.html`).pipe(res))
app.use('/assets/', express.static(`${__dirname}/assets/`))
app.use('/favicon.ico', express.static(`${__dirname}/assets/images/favicon.ico`))
app.get('/api/', (req, res) => res.redirect('/api/v1'))
app.use('/api/v1/', restRouter)
app.use('/graphql/', graphqlRouter)
app.use('/reload-data/', reloadRouter)

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`)
})
