const mongoose = require("mongoose")

const propertySchema = new mongoose.Schema({
    propertyName: {
        type: String, 
        required: true
    }, 
    location: {
        latitude: String,
        longitude: String
    },
    address: {
        doorNo: {
            type: Number,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        town: {
            type: String,
            required: true
        },
        city: {
            type: String, 
            required: true
        },
        pincode: {
            type: String,
            required: true
        },
    },
    accomodationCapacity: {
        adults: { 
            type: Number, required: true
        },
        children: {
            type: Number, required: true
        },
        infants: {
            type: Number, required: true
        },
        pets: {
            type: Number, required: true
        }
    },
    bedrooms: {
        type: Number,
        required: true
    },
    beds: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    balconies: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    ratings: {
        type: Number,
    },
    reviews: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                ref: "users"
            },
            comment: {
                type: String,
            }
        }
    ],
    facilities: [{
        feature: {type:String},
        description: {type: String}
    }],
    about: {
        type: String,
        required: true
    },
    amenities: [{
        type: String
    }],
    amenitiesNotIncluded: [{
        type: String
    }],
    likes: {
        type: Number,
    }
}, 
{
    collection: "properties", 
    timestamps: true
})

module.exports = mongoose.model('properties', propertySchema)

