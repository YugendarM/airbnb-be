const {getAllProperties, addNewProperty, searchProperty} = require("../controllers/propertyController")
const express = require("express")
const route = express()
const upload = require("../middlewares/upload")

route.get("/getAllProperties", getAllProperties)
route.post("/addNewProperty", upload.array("images"), addNewProperty)
route.get("/search", searchProperty)

module.exports = route