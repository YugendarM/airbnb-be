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

module.exports = {getAllProperties}