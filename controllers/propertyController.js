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

    console.log(request.body)
    

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
        // let query = {}
        // if(city) {
        //     query['address.city'] = city
        // }
        // if(adults) {
        //     query['accomodationCapacity.adults'] = {$gte: Number(adults)}
        // }
        // if(children) {
        //     query['accomodationCapacity.children'] = {$gte: Number(children)}
        // }
        // if(infants) {
        //     query['accomodationCapacity.infants'] = {$gte: Number(infants)}
        // }
        // if(pets) {
        //     query['accomodationCapacity.pets'] = {$gte: Number(pets)}
        // }
        const allProperties = await propertyModel.find()
        console.log("city", city)
        allProperties.map((property) => {
            if(
                property.address.city !== city && 
                property.accomodationCapacity.adults<=adults &&
                property.accomodationCapacity.children<=children &&
                property.accomodationCapacity.infants<=infants &&
                property.accomodationCapacity.pets<=pets 
            ){
                property.available = false
                console.log(property)
            }

            // const obj = {
            //     ...(trueCondition && { dogs: "woof" }),
            //     ...(falseCondition && { cats: "meow" }),
            //   };

            // property = {
            //     ...(
            //         property.address.city === city && 
            //         property.accomodationCapacity.adults>=adults &&
            //         property.accomodationCapacity.children>=children &&
            //         property.accomodationCapacity.infants>=infants &&
            //         property.accomodationCapacity.pets>=pets &&
            //         {availability: true} && console.log(property)
            //     )
            // }
        })
        return response.status(200).send(allProperties)
    }
    catch(error) {
        response.status(500).send({messagerrr: error.message})
    }
}

module.exports = {getAllProperties, addNewProperty, searchProperty}