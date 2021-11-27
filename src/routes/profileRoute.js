const express = require('express')
const profileRoute = express.Router()

const { get } = require('../controllers/profileController')

profileRoute.get('/', get)

module.exports = profileRoute