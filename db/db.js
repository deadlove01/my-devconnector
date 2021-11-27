const mongoose = require('mongoose')
const config = require('config')
const dbConfig = config.get("mongodb")

const connectDB = async () =>{
    try {
        console.log("db config: "+dbConfig)
        await mongoose.connect(dbConfig, {
            useNewUrlParser: true
        })

        console.log("mongodb connected...")
    }catch(err){
        console.log("connect db error: "+err.message)

    }
}

module.exports = connectDB