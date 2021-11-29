const Profile = require("../models/profile")

const profileRepo = {
    getAsync: async ()=>{
        return Profile.find({})
    },
    getOneAsync: async (filter, project)=>{
        return Profile.findOne(filter).select(project)
    },
    findOneAsync: async (condition, isPopulated, refName, fields) =>{
        if (isPopulated)
            return Profile.findOne(condition).populate(refName, fields)
        else
            return Profile.findOne(condition)
    },
    findAsync: async (condition, isPopulated, refName, fields) =>{
        if (isPopulated)
            return Profile.find(condition).populate(refName, fields)
        else
            return Profile.find(condition)
    },
    addAsync: async (fields) =>{
        const profile = new Profile(fields)
        await profile.save()
        return profile
    },
    upsertAsync: async (condition, fields) =>{
        return Profile.findOneAndUpdate(condition, fields, {upsert: true})
    },
    deleteAsync: async (condition) =>{
        await Profile.findOneAndRemove(condition)
    }
}


module.exports = profileRepo