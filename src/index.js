const express = require("express")

const app = express()


app.use(express.json())


const port = process.env.Port || 3000

app.get("/", async (req, res) => {
    res.send("hello")
})


app.listen(port, () => {
    console.log("server is listening to port " + port)
})