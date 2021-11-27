const express = require('express')
const userRoute = express.Router()
const userValidator = require('../validators/userValidator')


const userController = require('../controllers/userController')

userRoute.get('/', userController.get)
userRoute.post("/", userValidator.validateUserRegister(), userController.post)

module.exports = userRoute