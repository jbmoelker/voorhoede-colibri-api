require('dotenv').config()
const express = require('express')
const graphqlRouter = require('./graphql')
const reloadRouter = require('./reload')
const restRouter = require('./rest')

const { PORT = 2473 } = process.env

const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})

app.use('/api/', restRouter)
app.use('/graphql/', graphqlRouter)
app.use('/reload-data/', reloadRouter)

app.get('/', (req, res) => res.send(`
  <h1>Voorhoede Colibri API</h1>
  <ul>
    <li><a href="/api">REST</a></li>
    <li><a href="/graphql/">GraphQL</a></li>
  </ul>
`))

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`)
})
