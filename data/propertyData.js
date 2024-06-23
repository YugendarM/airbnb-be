const properties = [
    {
        propertyName: "Bella Vista", 
        "address": {
            "doorNo": 39,
            "street": "JK Street",
            "town": "Arumbakkam",
            "city": "chennai",
            "pincode": "600046",
        },
        accomodationCapacity: {
            adults: 5,
            children: 5,
            infants: 5,
            pets: 0
        },
        bedrooms: 3,
        beds: 3,
        bathrooms: 3,
        balconies: 1,
        area: 1000,
        // owner: {
        //     type: mongoose.Types.ObjectId,
        //     ref: 'users'
        // },
        ratings: 4.9,
        facilities: [{
            feature: "Dive in",
            description: "Swimming Pool with 20 people capacity"
        }],
        about: "My own property",
        amenities: ["Swimming Pool", "beach view"], 
    }
]

module.exports = properties