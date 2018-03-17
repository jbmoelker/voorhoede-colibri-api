// using ava endpoint-testing recipe
const { test } = require('ava')
const express = require('express')
const restRouter = require('./')
const request = require('supertest')

function makeApp () {
  const app = express()
  app.use(restRouter)
  return app
}

function getRequest(url) {
  const app = makeApp()
  return request(app).get(url)
}

test('Invalid endpoint returns ROUTE_NOT_FOUND error', async t => {
  const res = await getRequest('/invalid')
  const { error } = res.body
  t.is(res.status, 404)
  t.is(error.code, 'ROUTE_NOT_FOUND')
  t.is(error.route, '/invalid')
  t.is(typeof error.message, 'string')
})

test('Missing parameter returns MISSING_PARAMETER error', async t => {
  const res = await getRequest('/projects')
  const { error } = res.body
  t.is(res.status, 400)
  t.is(error.code, 'MISSING_PARAMETER')
  t.is(typeof error.parameter, 'string')
  t.is(typeof error.message, 'string')
})

test('Invalid parameter returns INVALID_PARAMETER error', async t => {
  const res = await getRequest('/projects?language=alien')
  const { error } = res.body
  t.is(res.status, 400)
  t.is(error.code, 'INVALID_PARAMETER')
  t.is(error.parameter, 'language')
  t.is(typeof error.message, 'string')
})

test('Returns list of projects', async t => {
  const res = await getRequest('/projects?language=en')
  t.is(res.status, 200)
  t.true(Array.isArray(res.body))
  t.falsy(res.body.error)
})

test('Returns a single project', async t => {
  const resAll = await getRequest('/projects?language=en&limit=1&fields=slug,title')
  const items = resAll.body
  const resOne = await getRequest(`/projects/${items[0].slug}?language=en&fields=slug,title`)
  const item = resOne.body
  t.is(resOne.status, 200)
  t.is(typeof item.title, 'string')
  t.is(typeof item.slug, 'string')
  t.is(item.title, items[0].title)
})
