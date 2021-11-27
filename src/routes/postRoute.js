const express = require('express')
const postRoute = express.Router()

const { get } = require('../controllers/postController')

postRoute.get('/', get)

module.exports = postRoute