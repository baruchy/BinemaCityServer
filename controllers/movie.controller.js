const movieDao = require('../daos/movie.dao');
const apiHandler = require('../services/api.handler');

const create = async (req, res) => {
    return await apiHandler.handleCreate(req, res, movieDao);
}

const list = async (req, res) => {
    return await apiHandler.handleList(res, movieDao);
}

const byId = async (req, res) => {
    return await apiHandler.handleGetById(req, res, movieDao);
}

const query = async (req, res) => {
    return await apiHandler.handleQuery(req, res, movieDao);
}

const update = async (req, res) => {
    return await apiHandler.handleUpdate(req, res, movieDao);
}

const removeById = async (req, res) => {
    return await apiHandler.handleRemoveById(req, res, movieDao);
}

const groupBy = async (req, res) => {
    return await apiHandler.handleGroupBy(req, res, movieDao);
}

module.exports = {create, list, byId, query, update, removeById, groupBy};