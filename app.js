require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const app = express()
const fs = require("fs")
const path = require("path")
const cors = require("cors")

const PORT = process.env.PORT || 3000
const propertyRoute = require("./routes/propertyRoute")

app.use(express.json())
app.use(cors())

app.get("/", (request, response) => {
    response.send({message: "Server Running"})
})

// const uploadDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadDir)){
//     fs.mkdirSync(uploadDir);
// }

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/v1/property", propertyRoute)

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', (errorMessage) => console.log(errorMessage))
db.once('open', () => console.log('Connected to db successfully'))

app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`)
})