const express = require('express')
const postRoute = express.Router()

const postController = require('../controllers/postController')

postRoute.get('/', postController.get)

module.exports = postRoute