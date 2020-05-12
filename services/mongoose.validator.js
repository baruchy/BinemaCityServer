const mongoose = require('mongoose');

const validateSchemaModel = async (model) => {
    let error = model.validateSync();
    if (error) {
        var errorMessage = '';
        if (error.name == 'ValidationError') {
            for (let field in error.errors) {
                errorMessage = errorMessage + error.errors[field].message + '\n';
            }
        }
        return {success: false, isValid: false, message:errorMessage};
    }
    return {success: true, isValid: true};
}

const validateID = async (objectID) => {
    if (!mongoose.Types.ObjectId.isValid(objectID)){
        return {success: false, isValid: false, message: 'DB error: invalid ObjectID'};
    }
    return {success: true, isValid: true};
}

const validateGroupByData = async (field) => {
    if (!field){
        return {success: false, isValid: false, message: 'Missing groupby field'};
    }
    return {success: true, isValid: true};
}

module.exports= {validateSchemaModel, validateID, validateGroupByData};