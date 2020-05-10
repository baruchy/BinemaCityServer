const mongoose = require('mongoose');

const validateSchemaModel = async (categoryModel) => {
    let error = categoryModel.validateSync();
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

const validateID = async (categoryID) => {
    if (!mongoose.Types.ObjectId.isValid(categoryID)){
        return {success: false, isValid: false, message: 'DB error: invalid ObjectID'};
    }
    return {success: true, isValid: true};
}

module.exports= {validateSchemaModel, validateID};