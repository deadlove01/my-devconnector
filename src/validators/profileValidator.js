const { check } = require('express-validator')

const profileValidator = {
    validateUserRegister: () => {
        return [
            check("status", "Status is required")
                .not().isEmpty(),
            check("skills", "Skills is required")
                .not().isEmpty(),
        ]
    }
}

module.exports = profileValidator