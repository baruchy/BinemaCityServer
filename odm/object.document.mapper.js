const mongooseValidator = require('../services/mongoose.validator');
const errorHandler = require('../services/error.handler');

const create = async (dataObject, schemaConstructor, errorMessage) => {
    let schemaModel = new schemaConstructor(dataObject);
    let result = await mongooseValidator.validateSchemaModel(schemaModel);
    if (!result.isValid) {
        return result;
    }
    return schemaModel.save()
        .then((savedMovie) => {
            return {success: true, data: savedMovie};
        })
        .catch((err) => {
            return errorHandler.handleDBError(err, errorMessage);
        });
}

const findById = async (objectID, SchemaObject, errorMessage, populateData) => {
    let result = await mongooseValidator.validateID(objectID);
    if (!result.isValid) {
        return result;
    }
    let promise = SchemaObject.findOne({_id: objectID});
    if (populateData) {
        promise = promise.populate(populateData);
    }
    return promise
        .then((objectFromDB) => {
            if (!objectFromDB) {
                return  {success: false, message: 'Did not find object'};
            }
            return {success: true, data: objectFromDB};
        })
        .catch((err) => {
            return errorHandler.handleDBError(err, errorMessage);
        });
}

const query = async (query, SchemaObject, errorMessage, populateData) => {
    if (!query){
        return {success: false, isValid: false, message: errorMessage};
    }
    let promise = SchemaObject.find(query);
    if (populateData) {
        promise = promise.populate(populateData);
    }
    return promise
        .then((objectFromDB) => {
            return {success: true, data: objectFromDB};
        })
        .catch((err) => {
            return errorHandler.handleDBError(err, errorMessage);
        });
}

const update = async (objectID, dataObject, schemaConstructor, errorMessage) => {
    let validateIDResult = await mongooseValidator.validateID(objectID);
    if (!validateIDResult.isValid) {
        return validateIDResult;
    }
    let schemaModel = new schemaConstructor(dataObject);
    let schemaValidationResult = await mongooseValidator.validateSchemaModel(schemaModel);
    if (!schemaValidationResult.isValid) {
        return schemaValidationResult;
    }
    delete dataObject._id;
    return schemaConstructor.findOneAndUpdate({_id: objectID} ,dataObject)
        .then((objectFromDB) => {
            return {success: true, data:objectFromDB};
        })
        .catch((err) => {
            return errorHandler.handleDBError(err, errorMessage);
        });
}

const remove = async (objectID, SchemaObject) => {
    let result = await mongooseValidator.validateID(objectID);
    if (!result.isValid) {
        return result;
    }
    return SchemaObject.findByIdAndDelete(objectID)
        .then((removedFromDB) => {
            if (!removedFromDB) {
                return  {success: false, message: 'Did not find object for deletion'};
            }
            return {success: true};
        })
        .catch((err) => {
            return errorHandler.handleDBError(err);
        });
}

const groupBy = async (groupBy, SchemaObject) => {
    let result = await mongooseValidator.validateGroupByData(groupBy);
    if (!result.isValid) {
        return result;
    }
    return SchemaObject.aggregate(
        [{
            $group: {
                _id:  '$' + groupBy.field,
                count:{$sum:1}
                }
            }]
        )
        .then((data) => {
            if (!data) {
                return  {success: false, message: 'Did not find data'};
            }
            return {success: true, data: data};
        })
        .catch((err) => {
            return errorHandler.handleDBError(err);
        });
}


module.exports= { create, findById, query, update, remove, groupBy};