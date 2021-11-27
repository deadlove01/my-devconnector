const { getUserService } = require('../services/userService')

const get = async (req, res) => {

    await getUserService()
    console.log("call get method from user controller")
    res.send("call get method from user controller")
}


module.exports = {
    get
}