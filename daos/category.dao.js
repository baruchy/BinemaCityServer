const Category = require('../models/category');
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


const create = async (category) => {
    let categoryModel = new Category(category);
    let result = await validateSchemaModel(categoryModel);
    if (!result.isValid) {
        return result;
    }
    return categoryModel.save()
        .then((savedCategory) => {
            result.data = savedCategory;
            return result;
        })
        .catch((err) => {
            console.log(err);
            result.success = false;
            result.message = 'Internal error please try again later';
            return result;
        });
}

const findById = async (categoryId) => {
    if (!mongoose.Types.ObjectId.isValid(categoryId)){
        return {success: false, isValid: false, message: 'Invalid category ID'};
    }
    return Category.findOne(categoryId)
        .then((categoryFromDB) => {
            return {success: true, data:categoryFromDB};
        })
        .catch((err) => {
            console.log(err);
            return {success: false, message: 'Internal error please try again later'};
        });
}

const findByName = async (categoryName) => {
    if (!categoryName){
        return {success: false, isValid: false, message: 'Category name is missing'};
    }
    return Category.findOne({name: categoryName})
        .then((categoryFromDB) => {
            return {success: true, data:categoryFromDB};
        })
        .catch((err) => {
            console.log(err);
            return {success: false, message: 'Internal error please try again later'};
        });
}




module.exports ={ create, findById, findByName };