const User = require('../models/user');
const objectDocumentMapper = require('../services/object.document.mapper');


const create = async (user) => {
    return objectDocumentMapper.create(user, User, 'User already exists');
}

const findById = async (userID) => {
    return objectDocumentMapper.findById(userID, User);
}

const query = async (userQuery) => {
    return objectDocumentMapper.query(userQuery, User, 'User query is missing');
}

const update = async (userID, user) => {
    return objectDocumentMapper.update(userID, user, User, 'User with same details already exists');
}

const removeById = async (userID) => {
    return objectDocumentMapper.remove(userID, User);
}

const groupBy = async (groupBy) => {
    return await objectDocumentMapper.groupBy(groupBy, User);
}


module.exports = {create, findById, query, update, removeById, groupBy};