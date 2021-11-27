const express = require('express')
const authRoute = express.Router()

const authController = require('../controllers/authController')

authRoute.get('/', authController.get)

module.exports = authRoute