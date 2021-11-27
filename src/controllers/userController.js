const userService = require('../services/userService')
const {validationResult} = require("express-validator")


const userController = {
    get: async (req, res) => {

        const {errorDetails, user} = await userService.getUser()
        if (errorDetails.hasErrors())
        {
            return res.status(400).send({errors: errorDetails.errors})
        }
        res.status(200).send({user})

    },
    post: async (req, res) =>{
        const errors = validationResult(req)
        if(!errors.isEmpty())
        {
            return res.status(400).send({errors: errors.array()})
        }

        const {errorDetails, token} = await userService.registerUser(req.body)
        if (errorDetails.hasErrors())
        {
            return res.status(400).send({errors: errorDetails.errors})
        }
        res.status(200).send({token})
    }
}






module.exports = userController