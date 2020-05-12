const Movie = require('../models/movie');
const Order = require('../models/order');
const objectDocumentMapper = require('../services/object.document.mapper');
const errorHandler = require('../services/error.handler');


const create = async (movie) => {
    return objectDocumentMapper.create(movie, Movie);
}

const findById = async (movieID) => {
    return objectDocumentMapper.findById(movieID, Movie, 'Failed fetching movie', ['category']);
}

const query = async (movieQuery) => {
    return objectDocumentMapper.query(movieQuery, Movie, 'Movie query is missing', ['category']);
}

const update = async (movieID, movie) => {
    return objectDocumentMapper.update(movieID, movie, Movie);
}

const removeById = async (movieID) => {
    return objectDocumentMapper.remove(movieID, Movie);
}

const groupBy = async (groupBy) => {
    let results = await objectDocumentMapper.groupBy(groupBy, Movie);
    if (groupBy != 'category') {
        return results;
    } else {
        await Order.populate(results.data, {path: '_id', model: 'Category'})
            .then((populatedData) => {
                if (!populatedData) {
                    results.success = false;
                    results.message = 'Failed populating data';
                } else {
                    results.data = populatedData;
                }
            })
            .catch((err) => {
                results = errorHandler.handleDBError(err);
            });
    }
    return results;
}


module.exports = {create, findById, query, update, removeById, groupBy};