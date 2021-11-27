const User = require("../models/user")

const userRepo = {
    getAsync: async ()=>{
        return User.find({})
    },
    getOneAsync: async (filter, project)=>{
        return User.findOne(filter).select(project)
    },
    addAsync: async (user) =>{
        const {name, email, avatar, password} = user
        const newUser = new User({name, email, avatar, password })
        await newUser.save()
        return newUser
    },
    findOneAsync: async (condition) =>{
        return User.findOne(condition)
    }
}


module.exports = userRepo