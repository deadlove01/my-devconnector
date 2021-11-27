const express = require("express")
const config = require("config")
const connectDB = require("../db/db")

const app = express()

connectDB()

console.log("config port: "+config.get("port"))
app.use(express.json())
app.use("/api/users", require("./routes/userRoute"))
app.use("/api/auth", require("./routes/authRoute"))
app.use("/api/profile", require("./routes/profileRoute"))
app.use("/api/posts", require("./routes/postRoute"))


const port = process.env.Port || 3000

app.get("*", async (req,res)=>{
    res.status(404).send("Page not found")
})

app.listen(port, () => {
    console.log("server is listening to port " + port)
})