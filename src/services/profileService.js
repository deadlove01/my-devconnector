const profileRepo = require("../repositories/profileRepo")
const ErrorDetails = require("../common/errorDetails")

const profileService = {
    getProfile: async (data) => {
        let errorDetails = new ErrorDetails()
        try {
            const {id} = data

            const profile =  await profileRepo.findOneAsync({user: id}, true, 'user', ['name', 'avatar'])
            return {errorDetails, profile};
        }catch(err){
            console.log("getOneUser error: "+ err)
            errorDetails.addError(err)
        }
        return {errorDetails, undefined};
    },
    getProfiles: async () => {
        let errorDetails = new ErrorDetails()
        try {
            const profiles =  await profileRepo.findAsync({}, true, 'user', ['name', 'avatar'])
            return {errorDetails, profiles};
        }catch(err){
            console.log("getOneUser error: "+ err)
            errorDetails.addError(err)
        }
        return {errorDetails, undefined};
    },
    createProfile: async (data, user) =>{
        let errorDetails = new ErrorDetails()
        try {
            const {
                company,
                website,
                location,
                bio,
                status,
                githubusername,
                skills,
                youtube,
                facebook,
                twitter,
                instagram,
                linkedin
            } = data

            const profileFields = {}
            profileFields.user = user.id
            if(company) profileFields.company = company
            if(website) profileFields.website = website
            if(location) profileFields.location = location
            if(bio) profileFields.bio = bio
            if(status) profileFields.status = status
            if(githubusername) profileFields.githubusername = githubusername
            if(skills){
                profileFields.skills = skills.split(',').map(x => x.trim())
            }

            profileFields.social = {}
            if(youtube) profileFields.social.youtube = youtube
            if(facebook) profileFields.social.facebook = facebook
            if(instagram) profileFields.social.instagram = instagram
            if(linkedin) profileFields.social.linkedin = linkedin
            if(twitter) profileFields.social.twitter = twitter


            const profile = await profileRepo.upsertAsync({user: user.id}, profileFields)
            return {errorDetails, profile};
        }catch(err){
            console.log("create profile error: "+ err)
            errorDetails.addError(err)
        }
        return {errorDetails, undefined};
    },
    getProfileById: async (data) => {
        let errorDetails = new ErrorDetails()
        try {
            const {id} = data
            console.log("user id: "+id)

            const profile =  await profileRepo.findOneAsync({user: id}, true, 'user', ['name', 'avatar'])
            return {errorDetails, profile};
        }catch(err){
            console.log("getProfileById error: "+ err)
            if (err.kind === 'ObjectId')
                errorDetails.addError("User profile was not found")
            else
                errorDetails.addError(err)
        }
        return {errorDetails, undefined};
    },
    removeProfileByUserId: async (data) => {
        let errorDetails = new ErrorDetails()
        try {
            const {id} = data

            await profileRepo.deleteAsync({user: id})
            return {errorDetails, undefined};
        }catch(err){
            console.log("removeProfileByUserId error: "+ err)
            errorDetails.addError(err)
        }
        return {errorDetails, undefined};
    },
    removeExperience: async (data) => {
        let errorDetails = new ErrorDetails()
        try {
            const {userId, expId} = data

            const profile =  await profileRepo.findOneAsync({user: userId}, true, 'user', ['name', 'avatar'])

            if(profile.experiences){
                const removeIndex = profile.experiences.findIndex(x => x.id === expId)
                if(removeIndex !== -1)
                    profile.experiences.splice(removeIndex, 1)
                await profile.save()
                return {errorDetails, profile};
            }

            return {errorDetails, undefined};
        }catch(err){
            console.log("removeProfileByUserId error: "+ err)
            errorDetails.addError(err)
        }
        return {errorDetails, undefined};
    },
    addExperience: async (data, id) => {
        let errorDetails = new ErrorDetails()
        try {
            const {
                title,
                company,
                location,
                from,
                to,
                current,
                description
            } = data

            const newExp = {
                title,
                company,
                location,
                from,
                to,
                current,
                description
            }

            const profile =  await profileRepo.findOneAsync({user: id}, true, 'user', ['name', 'avatar'])

            if(!profile.experiences) profile.experiences = []
            profile.experiences.unshift(newExp)
            await profile.save()
            return {errorDetails, profile};
        }catch(err){
            console.log("addExperience error: "+ err)
            errorDetails.addError(err)
        }
        return {errorDetails, undefined};
    },
    removeEducation: async (data) => {
        let errorDetails = new ErrorDetails()
        try {
            const {userId, eduId} = data

            const profile =  await profileRepo.findOneAsync({user: userId}, true, 'user', ['name', 'avatar'])

            if(profile.education){
                const removeIndex = profile.education.findIndex(x => x.id === eduId)
                console.log("remove index: "+ removeIndex)
                console.log("eduid: "+eduId)
                if(removeIndex !== -1)
                    profile.education.splice(removeIndex, 1)

                await profile.save()
                return {errorDetails, profile};
            }

            return {errorDetails, undefined};
        }catch(err){
            console.log("removeEducation error: "+ err)
            errorDetails.addError(err)
        }
        return {errorDetails, undefined};
    },
    addEducation: async (data, id) => {
        let errorDetails = new ErrorDetails()
        try {
            const {
                school,
                degree,
                fieldofstudy,
                from,
                to,
                description
            } = data

            const newEdu = {
                school,
                degree,
                fieldofstudy,
                from,
                to,
                description
            }

            const profile =  await profileRepo.findOneAsync({user: id}, true, 'user', ['name', 'avatar'])

            if(!profile.education) profile.education = []
            profile.education.unshift(newEdu)
            await profile.save()
            return {errorDetails, profile};
        }catch(err){
            console.log("addEducation error: "+ err)
            errorDetails.addError(err)
        }
        return {errorDetails, undefined};
    },
}


module.exports = profileService