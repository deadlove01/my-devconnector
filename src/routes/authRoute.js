const express = require('express')
const authMiddleware = require("../middleware/authMiddleware")
const authRoute = express.Router()
const authValidator = require("../validators/authValidator")

const authController = require('../controllers/authController')

authRoute.get('/', authMiddleware, authController.get)
authRoute.post('/', authValidator.validateLoginUser(), authController.post)

module.exports = authRoute