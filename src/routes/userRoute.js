const express = require('express')
const userRoute = express.Router()

const { get } = require('../controllers/userController')

userRoute.get('/', get)

module.exports = userRoute