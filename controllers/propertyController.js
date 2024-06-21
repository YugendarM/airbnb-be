const propertyModel = require("../models/propertyModel")
const initialProperty = require("../data/propertyData")

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
        console.log(newProperty)
        console.log(addedProperty)
        return response.status(201).send(addedProperty)

    }
    catch(error) {
        response.status(500).send({messagerrr: error.message})
    }
}

const searchProperty = async(request, response) => {
    const {city, adults, children, infants, pets } = request.query
    try{
        let query = {}
        if(city) {
            query['address.city'] = city
        }
        if(adults) {
            query['accomodationCapacity.adults'] = {$gte: Number(adults)}
        }
        if(children) {
            query['accomodationCapacity.children'] = {$gte: Number(children)}
        }
        if(infants) {
            query['accomodationCapacity.infants'] = {$gte: Number(infants)}
        }
        if(pets) {
            query['accomodationCapacity.pets'] = {$gte: Number(pets)}
        }
        const foundProperties = await propertyModel.find(query)
        if(foundProperties){
            return response.status(200).send(foundProperties)
        }
        return response.status(404).send({message: "No results found"})
    }
    catch(error) {
        response.status(500).send({messagerrr: error.message})
    }
}

module.exports = {getAllProperties, addNewProperty, searchProperty}