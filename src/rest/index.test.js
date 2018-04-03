// using ava endpoint-testing recipe: https://github.com/avajs/ava/blob/master/docs/recipes/endpoint-testing.md
const { test } = require('ava')
const express = require('express')
const restRouter = require('./')
const request = require('supertest')
const { URL } = require('url')

function makeApp () {
  const app = express()
  app.use(restRouter)
  return app
}

function getRequest(url) {
  const app = makeApp()
  return request(app).get(url)
}

function isValidUrl(url) {
  try {
    new URL(url)
    return true
  } catch (err) {
    return false
  }
}

test('Invalid endpoint returns ROUTE_NOT_FOUND error', async t => {
  const res = await getRequest('/invalid')
  const { error } = res.body
  t.is(res.status, 404)
  t.is(error.code, 'ROUTE_NOT_FOUND')
  t.is(error.route, '/invalid')
  t.is(typeof error.message, 'string')
})

test('Missing language parameter returns MISSING_PARAMETER error', async t => {
  const res = await getRequest('/projects')
  const { error } = res.body
  t.is(res.status, 400)
  t.is(error.code, 'MISSING_PARAMETER')
  t.is(typeof error.parameter, 'string')
  t.is(typeof error.message, 'string')
})

test('Invalid language parameter returns INVALID_PARAMETER error', async t => {
  const res = await getRequest('/projects?language=alien')
  const { error } = res.body
  t.is(res.status, 400)
  t.is(error.code, 'INVALID_PARAMETER')
  t.is(error.parameter, 'language')
  t.is(typeof error.message, 'string')
})

test('Invalid fields parameter returns INVALID_PARAMETER error', async t => {
  const res = await getRequest('/projects?language=en&fields=invalid1,invalid2')
  const { error } = res.body
  t.is(res.status, 400)
  t.is(error.code, 'INVALID_PARAMETER')
  t.is(error.parameter, 'fields')
  t.is(typeof error.message, 'string')
})

test('Invalid limit parameter returns INVALID_PARAMETER error', async t => {
  const res = await getRequest('/projects?language=en&fields=title&limit=a')
  const { error } = res.body
  t.is(res.status, 400)
  t.is(error.code, 'INVALID_PARAMETER')
  t.is(error.parameter, 'limit')
  t.is(typeof error.message, 'string')
})

test('Invalid offset parameter returns INVALID_PARAMETER error', async t => {
  const res = await getRequest('/projects?language=en&fields=title&limit=1&offset=a')
  const { error } = res.body
  t.is(res.status, 400)
  t.is(error.code, 'INVALID_PARAMETER')
  t.is(error.parameter, 'offset')
  t.is(typeof error.message, 'string')
})

test('Returns list of projects', async t => {
  const res = await getRequest('/projects?language=en')
  t.is(res.status, 200)
  t.true(Array.isArray(res.body.items))
  t.falsy(res.body.error)
})

test('Includes meta properties if `meta` parameter is true', async t => {
  const res = await getRequest('/projects?language=en&meta=true')
  const { items, meta } = res.body
  t.is(res.status, 200)
  t.is(meta.type, 'ProjectCollection')
  t.true(isValidUrl(meta.self))
  t.is(items[0].meta.type, 'Project')
  t.true(isValidUrl(items[0].meta.self))
})

test('Includes no meta properties if `meta` parameter is falsy', async t => {
  const res = await getRequest('/projects?language=en')
  t.is(res.status, 200)
  t.is(res.body.meta, undefined)
  t.is(res.body.items[0].meta, undefined)
})

test('Returns a paginated list of projects', async t => {
  const res = await getRequest('/projects?language=en&limit=3')
  const { items } = res.body
  t.is(res.status, 200)
  t.true(Array.isArray(items))
  t.is(items.length, 3)
  t.falsy(res.body.error)
  const resOffset = await getRequest('/projects?language=en&limit=3&offset=2')
  t.deepEqual(items[2], resOffset.body.items[0])
})

test('Returns a single project', async t => {
  const resAll = await getRequest('/projects?language=en&limit=1&fields=slug,title')
  const { items } = resAll.body
  const resOne = await getRequest(`/projects/${items[0].slug}?language=en&fields=slug,title`)
  const item = resOne.body
  t.is(resOne.status, 200)
  t.is(typeof item.title, 'string')
  t.is(typeof item.slug, 'string')
  t.is(item.title, items[0].title)
})
