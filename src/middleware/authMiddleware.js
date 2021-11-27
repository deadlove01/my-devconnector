const utils = require('../common/ultils')

const authMiddleware = (req, res, next) =>{

    const token = req.header("Authorization").replace("Bearer ", "")
    try {
        if (!token)
        {
            return res.status(401).json({msg: "unable to authenticate"})
        }
        const decoded = utils.extractDataFromToken(token)
        req.user = decoded.user
        next()
    }catch(err)
    {
        res.status(401).json({msg: "unable to authenticate"})
    }
}


module.exports = authMiddleware
