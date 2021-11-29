const express = require('express')
const profileRoute = express.Router()
const authMiddleware = require('../middleware/authMiddleware')

const profileController = require('../controllers/profileController')

profileRoute.get('/me', authMiddleware, profileController.get)
profileRoute.post('/', authMiddleware, profileController.post)
profileRoute.delete('/', authMiddleware, profileController.removeByUserId)

profileRoute.get('/', profileController.getAll)
profileRoute.get('/user/:user_id', profileController.getByUserId)
profileRoute.post('/experience', authMiddleware, profileController.postExperience)
profileRoute.delete('/experience/:exp_id', authMiddleware, profileController.removeExperience)

profileRoute.post('/education', authMiddleware, profileController.postEducation)
profileRoute.delete('/education/:edu_id', authMiddleware, profileController.removeEducation)


module.exports = profileRoute