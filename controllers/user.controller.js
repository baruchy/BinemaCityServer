const userDao = require('../daos/user.dao');
const orderDao = require('../daos/order.dao');
const apiHandler = require('../services/api.handler');

const create = async (req, res) => {
    return await apiHandler.handleCreate(req, res, userDao);
}

const list = async (req, res) => {
    return await apiHandler.handleList(res, userDao);
}

const byId = async (req, res) => {
    return await apiHandler.handleGetById(req, res, userDao);
}

const getOrders = async (req, res) => {
    req.query = {user: req.params.id};
    return await apiHandler.handleQuery(req, res, orderDao, 200,['movies']);
}

const query = async (req, res) => {
    return await apiHandler.handleQuery(req, res, userDao);
}

const update = async (req, res) => {
    return await apiHandler.handleUpdate(req, res, userDao);
}

const removeById = async (req, res) => {
    return await apiHandler.handleRemoveById(req, res, userDao);
}

const groupBy = async (req, res) => {
    return await apiHandler.handleGroupBy(req, res, userDao);
}


module.exports = { create, list, getOrders, query, byId, update, removeById, groupBy };