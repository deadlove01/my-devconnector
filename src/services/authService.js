const userRepo = require("../repositories/userRepo")
const ErrorDetails = require("../common/errorDetails")
const utils = require("../common/ultils")

const authService = {
    loginUser: async (email, password) => {
        let errorDetails = new ErrorDetails()
        try {

            const existedUser =  await userRepo.getOneAsync({email}, {})
            if (!existedUser)
            {
                errorDetails.addError("Invalid login")
                return {errorDetails, undefined}
            }

            const isMatch = await utils.checkPassword(password, existedUser.password)
            if (!isMatch)
            {
                errorDetails.addError("Invalid login")
                return {errorDetails, undefined}
            }

            const token = await utils.generateAccessToken({
                user: {
                    id: existedUser.id
                }
            })


            return {errorDetails, token}
        }catch(err){
            console.log("login user error: "+ err)
            errorDetails.addError(err)
        }
        return {errorDetails, undefined};

    }
}


module.exports = authService