const jwt = require("jsonwebtoken")

const authenticateUser = (request, response, next) => {
    console.log("from header"+request.headers.authorization)
    const authHeader = request.headers.authorization
    console.log("authheader", authHeader)
    const authToken = authHeader && authHeader.split(" ")[1]
    console.log("auth"+authToken)
    if(!authToken){
        console.log("token not found")
        return response.status(404).send({message: "Token not found"})
    }
    jwt.verify(authToken, process.env.JWT_TOKEN, (error, data) => {
        if(error){
            console.log("error in verify")
            return response.status(404).send({message: "User not authorized"})
        }
        console.log(data)
        request.user = data
    })
    next()
}

module.exports = authenticateUser