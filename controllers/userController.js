const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const JWT_TOKEN = process.env.JWT_TOKEN

const userSignup = async(request, response) => {
    const userData = request.body
    console.log(userData)
    try{
        const existingUser = await userModel.findOne({email: userData.email})
        if(existingUser){
            return response.status(401).send({message: "User already exist"})
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10)
        const newUser = new userModel({
            email: userData.email,
            userName: userData.userName,
            password: hashedPassword,
        })
        const addedUser = await newUser.save()
        return response.status(201).send(addedUser)
    }
    catch(error){
        response.status(500).send({message: error.message})
    }
}

const userLogin = async(request, response) => {
    const userData = request.body
    console.log(userData)
    try{
        const validUser = await userModel.findOne({email: userData.email})
        console.log(validUser)
        if(!validUser){
            return response.status(404).send({message: "User not registered"})
        }
        // if(await bcrypt.compare(userData.password, validUser.password)){
        if(await bcrypt.compare(userData.password, validUser.password)){
            const AUTH_TOKEN = jwt.sign({email: validUser.email, role: validUser.role, userName: validUser.userName}, JWT_TOKEN)
            console.log(AUTH_TOKEN)
            console.log({token: AUTH_TOKEN})
            return response.status(200).send({token: AUTH_TOKEN})
        }
        else{
            return response.status(401).send({message: "Incorrect Password"})
        }
    }
    catch(error){
        response.status(500).send({message: error.message})
    }
}

const getUserDetails = async(request, response) => {
    const {token} = request.body
    console.log(request.body)
    console.log(token)
    try{
        jwt.verify(token, process.env.JWT_TOKEN, async(error, data) => {
            if(error){
                return response.status(404).send({message: "User not authorized"})
            }
            console.log(data)
            const user = await userModel.findOne({email: data.email})
            console.log(user)
            return response.status(200).send(user)
        })
    }
    catch(error){
        response.status(500).send({message: error.message})
    }
}

const addPropertyToWishlist = async(request, response) => {
    const {propertyId} = request.body
    const userData = request.user
    try{
        const updatedUser = await userModel.findOneAndUpdate(
            { email: userData.email },
            { $addToSet: { wishlist: propertyId } },
            { new: true } // to return the updated document
          );
        return response.status(201).send({message: "Property added to wishlist", User: updatedUser})
    }
    catch(error){
        response.status(500).send({message: error.message})
    }
}

const removePropertyFromWishlist = async(request, response) => {
    const {propertyId} = request.body
    const userData = request.user
    try{
        const updatedUser = await userModel.findOneAndUpdate(
            { email: userData.email },
            { $pull: { wishlist: propertyId } },
            { new: true } // to return the updated document
          );
          return response.status(200).send({message: "Property removed from wishlist", User: updatedUser})
    }
    catch(error){
        response.status(500).send({message: error.message})
    }
}

module.exports = {userSignup, userLogin, getUserDetails, addPropertyToWishlist, removePropertyFromWishlist}