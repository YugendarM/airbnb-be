const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    userName: {
        type:String,
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
    role: {
        type: String,
        enum : ["admin", "user"],
        default: "user"
    },
    wishlist: [{
        type: mongoose.Types.ObjectId,
        ref: 'properties'
    }]
},
{
    collection: "users",
    timestamps: true
})

module.exports = mongoose.model("users", userSchema)