const userService = require('../services/userService')
const {validationResult} = require("express-validator")


const userController = {
    get: async (req, res) => {

        res.send("call get method from user controller")
    },
    post: async (req, res) =>{
        const errors = validationResult(req)
        if(!errors.isEmpty())
        {
            return res.status(400).send({errors: errors.array()})
        }

        await userService.registUser()
        res.send("user created")
    }
}






module.exports = userController