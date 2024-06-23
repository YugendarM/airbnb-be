const {userLogin, userSignup, addPropertyToWishlist, getUserDetails, removePropertyFromWishlist} = require("../controllers/userController")
const authenticateUser = require("../middlewares/authenticateUser") 
const express = require("express")
const route = express()

route.post("/signup", userSignup)
route.post("/login", userLogin)
route.post('/details', getUserDetails)
route.post("/addPropertyToWishlist", authenticateUser, addPropertyToWishlist)
route.post("/removePropertyFromWishlist", authenticateUser, removePropertyFromWishlist)

module.exports = route