const config = require("config")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const utils = {
    encodePassword: async (plainText) =>{
        const salt = await bcrypt.genSalt(config.get("salt"))
        return await bcrypt.hash(plainText, salt)
    },
    checkPassword: async (plainText, hashPassword) =>{
        return await bcrypt.compare(plainText, hashPassword)
    },
    generateAccessToken: async(payload) =>{
        return await jwt.sign(payload, config.get("jwtSecret"), {
            expiresIn: config.get("jwtExpiresIn")
        })
    },
    extractDataFromToken: (token) =>{
        return jwt.verify(token, config.get("jwtSecret"));
    }
}


module.exports = utils;