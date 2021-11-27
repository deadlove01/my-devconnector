const express = require('express')
const profileRoute = express.Router()

const profileController = require('../controllers/profileController')

profileRoute.get('/', profileController.get)

module.exports = profileRoute