const location = require('../daos/location.dao');
const apiHandler = require('../services/api.handler');

const create = async (req, res) => {
    return await apiHandler.handleCreate(req, res, location);
}

const list = async (req, res) => {
    return await apiHandler.handleList(res, location);
}

const byId = async (req, res) => {
    return await apiHandler.handleGetById(req, res, location);
}

const query = async (req, res) => {
    return await apiHandler.handleQuery(req, res, location);
}

const update = async (req, res) => {
    return await apiHandler.handleUpdate(req, res, location);
}

const removeById = async (req, res) => {
    return await apiHandler.handleRemoveById(req, res, location);
}


module.exports = {create, list, byId, query, update, removeById};