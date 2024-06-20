require("dotenv").config()
const express = require("express")
const app = express()

const PORT = process.env.PORT || 3000

const mongoose = require("mongoose")

app.get("/", (request, response) => {
    response.send({message: "Server Running"})
})

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', (errorMessage) => console.log(errorMessage))
db.once('open', () => console.log('Connected to db successfully'))

app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`)
})