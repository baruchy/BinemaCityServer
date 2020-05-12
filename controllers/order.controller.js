const orderDAO = require('../daos/order.dao');
const apiHandler = require('../services/api.handler');

const create = async (req, res) => {
    return await apiHandler.handleCreate(req, res, orderDAO);
}

const list = async (req, res) => {
    return await apiHandler.handleList(res, orderDAO);
}

const byId = async (req, res) => {
    return await apiHandler.handleGetById(req, res, orderDAO);
}

const query = async (req, res) => {
    return await apiHandler.handleQuery(req, res, orderDAO);
}

const update = async (req, res) => {
    return await apiHandler.handleUpdate(req, res, orderDAO);
}

const removeById = async (req, res) => {
    return await apiHandler.handleRemoveById(req, res, orderDAO);
}

module.exports = { create, list, byId, query, update, removeById };