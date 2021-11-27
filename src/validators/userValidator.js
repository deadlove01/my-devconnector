const { check } = require('express-validator')

const userValidator = {
    validateUserRegister: () => {
        return [
            check("name", "Name is required")
                .not().isEmpty(),
            check("email", "Please input valid email")
                .isEmail(),
            check("password", "Password must be at least 6 characters")
                .isLength({min: 6})
        ]
    }
}

module.exports = userValidator