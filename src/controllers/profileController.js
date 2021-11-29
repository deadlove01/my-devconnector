const profileService = require("../services/profileService");
const userService = require("../services/userService")
const {validationResult} = require("express-validator")

const profileController = {
    get: async (req, res) => {
        const {errorDetails, profile} = await profileService.getProfile({id: req.user.id})
        if (errorDetails.hasErrors())
        {
            return res.status(400).send({errors: errorDetails.errors})
        }
        if(!profile)
        {
            return res.status(400).send({msg: "User Profile was not found"})
        }

        res.status(200).send({profile})
    },
    getAll: async (req, res) => {
        const {errorDetails, profiles} = await profileService.getProfiles()
        if (errorDetails.hasErrors())
        {
            return res.status(400).send({errors: errorDetails.errors})
        }

        res.status(200).send({profiles})
    },
    post: async (req, res) =>{
        const errors = validationResult(req)
        if(!errors.isEmpty())
        {
            return res.status(400).send({errors: errors.array()})
        }

        const {errorDetails, profile} = await profileService.createProfile(req.body, req.user)
        if (errorDetails.hasErrors())
        {
            return res.status(400).send({errors: errorDetails.errors})
        }
        res.status(200).send({profile})
    },
    getByUserId: async (req, res) => {
        const {errorDetails, profile} = await profileService.getProfileById({id: req.params.user_id})
        if (errorDetails.hasErrors())
        {
            return res.status(400).send({errors: errorDetails.errors})
        }
        if(!profile)
        {
            return res.status(400).send({msg: "User Profile was not found"})
        }

        res.status(200).send({profile})
    },
    removeByUserId: async (req, res) => {
        const userId = req.user.id
        console.log("user id: "+userId)
        const {errorDetails, profile} = await profileService.removeProfileByUserId({id: userId})
        if (errorDetails.hasErrors())
        {
            return res.status(400).send({errors: errorDetails.errors})
        }

        const {errorDetails: errorDetails2, user} = await userService.removeById({id: userId})
        if (errorDetails2.hasErrors())
        {
            return res.status(400).send({errors: errorDetails2.errors})
        }


        res.status(200).send({msg: "Profile removed"})
    },
    postExperience: async (req, res) => {
        const {errorDetails, profile} = await profileService.addExperience(req.body, req.user.id)
        if (errorDetails.hasErrors())
        {
            return res.status(400).send({errors: errorDetails.errors})
        }
        if(!profile)
        {
            return res.status(400).send({msg: "User Profile was not found"})
        }

        res.status(200).send({profile})
    },
    removeExperience: async (req, res) => {
        const userId = req.user.id
        const expId = req.params.exp_id

        const {errorDetails, profile} = await profileService.removeExperience({userId, expId})
        if (errorDetails.hasErrors())
        {
            return res.status(400).send({errors: errorDetails.errors})
        }

        res.status(200).send({profile})
    },
    postEducation: async (req, res) => {
        const {errorDetails, profile} = await profileService.addEducation(req.body, req.user.id)
        if (errorDetails.hasErrors())
        {
            return res.status(400).send({errors: errorDetails.errors})
        }
        if(!profile)
        {
            return res.status(400).send({msg: "User Profile was not found"})
        }

        res.status(200).send({profile})
    },
    removeEducation: async (req, res) => {
        const userId = req.user.id
        const eduId = req.params.edu_id

        const {errorDetails, profile} = await profileService.removeEducation({userId, eduId})
        if (errorDetails.hasErrors())
        {
            return res.status(400).send({errors: errorDetails.errors})
        }

        res.status(200).send({profile})
    },
}

module.exports = profileController