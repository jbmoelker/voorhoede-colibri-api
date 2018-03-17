const { test } = require('ava')
const express = require('express')
const graphqlRouter = require('./')
const request = require('supertest')

function makeApp () {
  const app = express()
  app.use(graphqlRouter)
  return app
}

function graphqlRequest(query) {
  const app = makeApp()
  return request(app)
    .post('/')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({ query })
}

test('Returns data for given query', async t => {
  const res = await graphqlRequest(`
    query {
      blog { title }
    }
  `)
  t.is(res.status, 200)
  t.is(typeof res.body.data.blog.title, 'string')
})
