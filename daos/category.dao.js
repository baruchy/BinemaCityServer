const Category = require('../models/category');
const objectDocumentMapper = require('../odm/object.document.mapper');


const create = async (category) => {
    return objectDocumentMapper.create(category, Category, 'Category ' + category.name + ' already exists');
}

const findById = async (categoryID) => {
    return objectDocumentMapper.findById(categoryID, Category);
}

const query = async (categoryQuery) => {
    return objectDocumentMapper.query(categoryQuery, Category, 'Category query is missing');
}

const update = async (categoryID, category) => {
    return objectDocumentMapper.update(categoryID,category, Category, 'Category name already exists');
}

const remove = async (categoryID) => {
    return objectDocumentMapper.remove(categoryID, Category);
}


module.exports= { create, findById, query, update, remove };