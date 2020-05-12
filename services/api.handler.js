
const responseHandler = require('./response.handler');

const handleCreate = async (req, res, daoService , successCode = 201) => {
    try {
        let result = await daoService.create(req.body);
        return responseHandler.populateResponse(res, result, successCode);
    } catch (e) {
        console.log(e)
        return responseHandler.populateInternalErrorResponse(res);
    }
}

const handleList = async (res, daoService , successCode = 200) => {
    try {
        let queryResult = await daoService.query({});
        return responseHandler.populateResponse(res, queryResult);
    } catch (e) {
        console.log(e)
        return responseHandler.populateInternalErrorResponse(res);
    }
}

const handleQuery = async (req, res, daoService , successCode = 200) => {
    try {
        let queryResult = await daoService.query(req.query);
        return responseHandler.populateResponse(res, queryResult);
    } catch (e) {
        console.log(e)
        return responseHandler.populateInternalErrorResponse(res);
    }
}

const handleGetById = async (req, res, daoService , successCode = 200) => {
    try {
        let queryResult = await daoService.findById(req.params.id);
        return responseHandler.populateResponse(res, queryResult);
    } catch (e) {
        console.log(e)
        return responseHandler.populateInternalErrorResponse(res);
    }
}

const handleUpdate = async (req, res, daoService , successCode = 204) => {
    try {
        let updateResult = await daoService.update(req.params.id, req.body);
        return responseHandler.populateResponse(res, updateResult, successCode);
    } catch (e) {
        console.log(e)
        return responseHandler.populateInternalErrorResponse(res);
    }
}

const handleRemoveById = async (req, res, daoService , successCode = 204) => {
    try {
        let remove = await daoService.removeById(req.params.id);
        return responseHandler.populateResponse(res, remove, successCode);
    } catch (e) {
        console.log(e)
        return responseHandler.populateInternalErrorResponse(res);
    }
}

const handleGroupBy = async (req, res, daoService , successCode = 200) => {
    try {
        let result = await daoService.groupBy(req.params.field);
        return responseHandler.populateResponse(res, result, successCode);
    } catch (e) {
        console.log(e)
        return responseHandler.populateInternalErrorResponse(res);
    }
}

module.exports = {handleCreate, handleList, handleGetById, handleQuery, handleUpdate, handleRemoveById, handleGroupBy}