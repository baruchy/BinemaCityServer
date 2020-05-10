const Category = require('../models/category');
const mongooseValidator = require('../utils/mongoose.validator');


const create = async (category) => {
    let categoryModel = new Category(category);
    let result = await mongooseValidator.validateSchemaModel(categoryModel);
    if (!result.isValid) {
        return result;
    }
    return categoryModel.save()
        .then((savedCategory) => {
            return {success: true, data: savedCategory};
        })
        .catch((err) => {
            if (err.code == 11000) {
                return {success: false, isValid: false, message: 'Category ' + category.name + ' already exists'};
            } else {
                console.log(err);
            }
            return {success: false, message: 'Internal error please try again later'};
        });
}

const findById = async (categoryID) => {
    let result = await mongooseValidator.validateID(categoryID);
    if (!result.isValid) {
        return result;
    }
    return Category.findOne(categoryID)
        .then((categoryFromDB) => {
            return {success: true, data: categoryFromDB};
        })
        .catch((err) => {
            console.log(err);
            return {success: false, message: 'Internal error please try again later'};
        });
}

const query = async (categoryQuery) => {
    if (!categoryQuery){
        return {success: false, isValid: false, message: 'Category query is missing'};
    }
    return Category.find(categoryQuery)
        .then((categoryFromDB) => {
            return {success: true, data: categoryFromDB};
        })
        .catch((err) => {
            console.log(err);
            return {success: false, message: 'Internal error please try again later'};
        });
}

const update = async (categoryID, category) => {
    let validateIDResult = await mongooseValidator.validateID(categoryID);
    if (!validateIDResult.isValid) {
        return validateIDResult;
    }
    let categoryModel = new Category(category);
    let schemaValidationResult = await mongooseValidator.validateSchemaModel(categoryModel);
    if (!schemaValidationResult.isValid) {
        return schemaValidationResult;
    }
    delete category._id;
    return Category.findOneAndUpdate({_id: categoryID} ,category)
        .then((categoryFromDB) => {
            return {success: true, data:categoryFromDB};
        })
        .catch((err) => {
            if (err.code == 11000) {
                return {success: false, isValid: false, message: 'Category ' + category.name + ' already exists'};
            } else {
                console.log(err);
            }
            return {success: false, message: 'Internal error please try again later'};
        });
}

const remove = async (categoryID) => {
    let result = await mongooseValidator.validateID(categoryID);
    if (!result.isValid) {
        return result;
    }
    return Category.findByIdAndDelete(categoryID)
        .then(() => {
            return {success: true};
        })
        .catch((err) => {
            console.log(err);
            return {success: false, message: 'Internal error please try again later'};
        });
}


module.exports= { create, findById, query, update, remove };