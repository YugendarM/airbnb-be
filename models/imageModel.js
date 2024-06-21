const mongoose = require("mongoose")

const imageSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    propertyId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
},
{
    collection: "images"
})

module.exports = mongoose.model("images", imageSchema)