const Order = require('../models/order');
const objectDocumentMapper = require('../services/object.document.mapper');


const create = async (order) => {
    return objectDocumentMapper.create(order, Order);
}

const findById = async (orderID) => {
    return objectDocumentMapper.findById(orderID, Order);
}

const query = async (orderQuery) => {
    return objectDocumentMapper.query(orderQuery, Order, 'Order query is missing',);
}

const update = async (orderID, category) => {
    return objectDocumentMapper.update(orderID, category, Order);
}

const removeById = async (orderID) => {
    return objectDocumentMapper.remove(orderID, Order);
}


module.exports = {create, findById, query, update, removeById};