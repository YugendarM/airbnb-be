const {getAllProperties, addNewProperty, searchProperty, getPropertyFromWishlist} = require("../controllers/propertyController")
const express = require("express")
const route = express()
const upload = require("../middlewares/upload")
const authenticateUser = require("../middlewares/authenticateUser")

route.get("/getAllProperties", getAllProperties)
route.post("/addNewProperty", upload.array("images"), addNewProperty)
route.get("/search", searchProperty)
route.post("/getWishlistProperty", authenticateUser, getPropertyFromWishlist)

module.exports = route