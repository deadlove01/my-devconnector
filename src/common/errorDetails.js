const _ = require("lodash")
const ErrorDetails = class {
    constructor() {
    }
    errors = []
    hasErrors (){
        return !_.isEmpty(this.errors)
    }

    addError (err){
        this.errors.push({msg: err})
    }
}


module.exports = ErrorDetails