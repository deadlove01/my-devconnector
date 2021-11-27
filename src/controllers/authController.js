const userService = require("../services/userService")
const authService = require("../services/authService")
const {validationResult} = require("express-validator")

const authController = {
    get: async (req, res) => {
        const {errorDetails, user} = await userService.getOneUser({id: req.user.id})
        if (errorDetails.hasErrors())
        {
            return res.status(400).send({errors: errorDetails.errors})
        }
        res.status(200).send({user})
    },
    post: async(req, res) =>{
        const errors = validationResult(req)
        if(!errors.isEmpty())
        {
            return res.status(400).send({errors: errors.array()})
        }

        const {email, password} = req.body
        const {errorDetails, token} = await authService.loginUser(email, password)
        if (errorDetails.hasErrors())
        {
            return res.status(400).send({errors: errorDetails.errors})
        }


        res.status(200).json({token})
    }
}

module.exports = authController