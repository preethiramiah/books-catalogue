const express = require('express')
const router = express.Router()

const { renderBooksList } = require('../controllers/books')

router.get('/', renderBooksList)

module.exports = router
