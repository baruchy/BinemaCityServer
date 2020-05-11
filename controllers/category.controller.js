const categoryDao = require('../daos/category.dao');
const apiHandler = require('../services/api.handler');

const create = async (req, res) => {
    return await apiHandler.handleCreate(req, res, categoryDao);
}

const list = async (req, res) => {
    return await apiHandler.handleList(res, categoryDao);
}

const byId = async (req, res) => {
    return await apiHandler.handleGetById(req, res, categoryDao);
}

const update = async (req, res) => {
    return await apiHandler.handleUpdate(req, res, categoryDao);
}

const removeById = async (req, res) => {
    return await apiHandler.handleRemove(req, res, categoryDao);
}


module.exports = { create, list, byId, update, remove: removeById };