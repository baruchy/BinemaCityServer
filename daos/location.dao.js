const Location = require('../models/location');
const objectDocumentMapper = require('../services/object.document.mapper');


const create = async (location) => {
    return objectDocumentMapper.create(location, Location);
}

const findById = async (locationID) => {
    return objectDocumentMapper.findById(locationID, Location);
}

const query = async (locationQuery) => {
    return objectDocumentMapper.query(locationQuery, Location, 'Location query is missing');
}

const update = async (locationID, category) => {
    return objectDocumentMapper.update(locationID, category, Location);
}

const removeById = async (locationID) => {
    return objectDocumentMapper.remove(locationID, Location);
}


module.exports = {create, findById, query, update, removeById};