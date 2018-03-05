require('dotenv').config()
const dataLoader = require('./data-loader')
const express = require('express')

const reloadToken = process.env.RELOAD_TOKEN
const router = express.Router()

router.post('/:token', (req, res) => {
  if (reloadToken && reloadToken === req.params.token) {
    dataLoader.reload()
    .then(newData => {
      res.json({ status: 'Data reloaded.' })
      console.log('Data reloaded.')
    })
    .catch(error => {
      res.status(500).json({ status: 'Error loading data.', error: error.message })
      console.error('Error reloading data', error)
    })
  } else {
    res.status(401).json({ status: 'Invalid token.' })
  }
})

module.exports = router
