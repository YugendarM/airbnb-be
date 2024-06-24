const propertyModel = require("../models/propertyModel")
const initialProperty = require("../data/propertyData")
const userModel = require("../models/userModel")

const getAllProperties = async(request, response) => {
    try{
        const propertyData = await propertyModel.find()
        if(propertyData.length === 0){
            const addedProperties = await propertyModel.create(initialProperty)
            return response.status(200).send(addedProperties)
        }
        return response.status(200).send(propertyData)
    }
    catch(error) {
        response.status(500).send({message: error.message})
    }
}

const addNewProperty = async(request, response) => {
    const propertyImages = request.files
    const propertyData = request.body

    //console.log(request.body)
    

    let images = [];
    if (propertyImages && propertyImages.length > 0) {
        images = propertyImages.map(file => file.path.replace("\\", "/"));
    }
    
    try{
        const newProperty = new propertyModel({
            propertyName: propertyData.propertyName,
            location: propertyData.location,
            address: propertyData.address,
            accomodationCapacity: propertyData.accomodationCapacity,
            bedrooms: propertyData.bedrooms,
            beds: propertyData.beds,
            bathrooms: propertyData.bathrooms,
            balconies: propertyData.balconies,
            area: propertyData.area,
            ratings: propertyData.ratings,
            reviews: propertyData.reviews,
            facilities: propertyData.facilities,
            about: propertyData.about,
            amenities:propertyData.amenities,
            amenitiesNotIncluded: propertyData.amenitiesNotIncluded,
            likes: propertyData.likes,
            images: images,
            propertyType: propertyData.propertyType,
            pricePerNight: propertyData.pricePerNight
           })
        const addedProperty = await newProperty.save()
        return response.status(201).send(addedProperty)

    }
    catch(error) {
        response.status(500).send({messagerrr: error.message})
    }
}

const searchProperty = async(request, response) => {
    const {city, adults, children, infants, pets } = request.query
    try{
        const allProperties = await propertyModel.find()
        console.log("city", city)
        console.log("children",children)
        console.log("adults",adults)
        console.log("infants",infants)
        console.log("pets",pets)
        allProperties.map((property) => {
            console.log("adults", property.accomodationCapacity.adults)
            console.log("child", property.accomodationCapacity.children)
            console.log("infants", property.accomodationCapacity.infants)
            console.log("pets", property.accomodationCapacity.pets)
            console.log("city", property.address.city)
            if(
                property.address.city !== city ||
                property.accomodationCapacity.adults<=adults ||
                property.accomodationCapacity.children<=children ||
                property.accomodationCapacity.infants<=infants 
                // property.accomodationCapacity.pets<=pets 
            ){
                property.available = false
                //console.log(property)
            }
        })
        return response.status(200).send(allProperties)
    }
    catch(error) {
        return response.status(500).send({messagerrr: error.message})
    }
}

const getPropertyFromWishlist = async(request, response) => {
    const userData = request.user
    try{
        const validUser = await userModel.findOne({email: userData.email})
        if(validUser){
            const propertyData = await propertyModel.find({
                _id: {$in : validUser.wishlist}
            })
            return response.status(200).send(propertyData)
        }
        else{
            return response.status(404).send({message:"Not a valid user"})
        }
    }
    catch(error) {
        response.status(500).send({messagerrr: error.message})
    }
}

module.exports = {getAllProperties, addNewProperty, searchProperty, getPropertyFromWishlist}