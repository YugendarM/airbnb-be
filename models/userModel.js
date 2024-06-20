const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        unique: true
    },
    likedProperties: [{
        type: mongoose.Types.ObjectId,
        ref: 'properties'
    }]
},
{
    collection: "users",
    timestamps: true
})

module.exports = mongoose.model("users", userSchema)