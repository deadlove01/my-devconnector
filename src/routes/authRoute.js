const express = require('express')
const authRoute = express.Router()

const { get } = require('../controllers/authController')

authRoute.get('/', get)

module.exports = authRoute