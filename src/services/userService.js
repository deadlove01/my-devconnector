const userRepo = require("../repositories/userRepo")
const gravatar = require("gravatar")
const ErrorDetails = require("../common/errorDetails")
const utils = require("../common/ultils")
const profileRepo = require("../repositories/profileRepo");

const userService = {
   registerUser: async (data) => {
       let errorDetails = new ErrorDetails()
       try {

           const { name, email, password} = data
           const existedUser = await userRepo.findOneAsync({"email": email})
           if (existedUser)
           {
               console.log(JSON.stringify(existedUser))
               errorDetails.addError("User already exists")
               return {errorDetails, undefined}
           }

           const avatar = gravatar.url(email, {
               s: '200',
               r: 'pg',
               d: 'mm'
           })

           const hashPassword = await utils.encodePassword(password)
           const user = await userRepo.addAsync({
               name,
               email,
               avatar,
               password: hashPassword
           })

           // generate jwt token
           const payload = {
               user: {
                   id: user.id
               }
           }
           const token = await utils.generateAccessToken(payload)

           console.log("userService.regist user")

           return {errorDetails, token}
       }catch(err){
           console.log("register user error: "+ err)
           errorDetails.addError(err)
       }
       return {errorDetails, undefined};

   },
    getUser: async () => {
        let errorDetails = new ErrorDetails()
        try {

            const user =  await userRepo.getAsync()
            return {errorDetails, user};
        }catch(err){
            console.log("register user error: "+ err)
            errorDetails.addError(err)
        }
        return {errorDetails, undefined};
    },
    getOneUser: async (data) => {
        let errorDetails = new ErrorDetails()
        try {
            const {id} = data

            const user =  await userRepo.getOneAsync({_id: id}, "-password")
            return {errorDetails, user};
        }catch(err){
            console.log("getOneUser error: "+ err)
            errorDetails.addError(err)
        }
        return {errorDetails, undefined};
    },
    removeById: async (data) => {
        let errorDetails = new ErrorDetails()
        try {
            const {id} = data

            await userRepo.deleteAsync({_id: id})
            return {errorDetails, undefined};
        }catch(err){
            console.log("removeById error: "+ err)
            errorDetails.addError(err)
        }
        return {errorDetails, undefined};
    },
}


module.exports = userService