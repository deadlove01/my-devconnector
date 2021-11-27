const { check } = require('express-validator')

const authValidator = {
    validateLoginUser: () => {
        return [
            check("email", "Please input valid email")
                .isEmail(),
            check("password", "Password is required")
                .exists()
        ]
    }
}

module.exports = authValidator