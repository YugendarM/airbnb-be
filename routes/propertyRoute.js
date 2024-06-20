const {getAllProperties} = require("../controllers/propertyController")
const express = require("express")
const route = express()

route.get("/getAllProperties", getAllProperties)

module.exports = route