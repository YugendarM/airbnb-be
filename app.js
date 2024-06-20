require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const app = express()

const PORT = process.env.PORT || 3000
const propertyRoute = require("./routes/propertyRoute")


app.get("/", (request, response) => {
    response.send({message: "Server Running"})
})

app.use("/api/v1/property", propertyRoute)

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', (errorMessage) => console.log(errorMessage))
db.once('open', () => console.log('Connected to db successfully'))

app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`)
})