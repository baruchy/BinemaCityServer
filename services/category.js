const categoryDao = require('../daos/category.dao');
const responseHandler = require('../utils/response.handler');

const create = async (req, res) => {
    try {
        let createResult = await categoryDao.create(req.body);
        return responseHandler.populateResponse(res, createResult);
    } catch (e) {
        console.log(e)
        return responseHandler.populateInternalErrorResponse(res);
    }
}

const list = async (req, res) => {
    try {
        let queryResult = await categoryDao.query({});
        return responseHandler.populateResponse(res, queryResult);
    } catch (e) {
        console.log(e)
        return responseHandler.populateInternalErrorResponse(res);
    }
}

const byId = async (req, res) => {
    try {
        let queryResult = await categoryDao.findById(req.params.id);
        return responseHandler.populateResponse(res, queryResult);
    } catch (e) {
        console.log(e)
        return responseHandler.populateInternalErrorResponse(res);
    }
}

const update = async (req, res) => {
    try {
        let updateResult = await categoryDao.update(req.params.id, req.body);
        return responseHandler.populateResponse(res, updateResult);
    } catch (e) {
        console.log(e)
        return responseHandler.populateInternalErrorResponse(res);
    }
}

const remove = async (req, res) => {
    try {
        let remove = await categoryDao.remove(req.params.id);
        return responseHandler.populateResponse(res, remove);
    } catch (e) {
        console.log(e)
        return responseHandler.populateInternalErrorResponse(res);
    }
}


module.exports = { create, list, byId, update, remove };