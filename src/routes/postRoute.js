const express = require('express')
const postRoute = express.Router()

const postController = require('../controllers/postController')

postRoute.get('/', postControllerget)

module.exports = postRoute