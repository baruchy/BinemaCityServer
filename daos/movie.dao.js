const Movie = require('../models/movie');
const objectDocumentMapper = require('../odm/object.document.mapper');


const create = async (movie) => {
    return objectDocumentMapper.create(movie, Movie);
}

const findById = async (movieID) => {
    return objectDocumentMapper.findById(movieID, Movie, ['category']);
}

const query = async (movieQuery) => {
    return objectDocumentMapper.query(movieQuery, Movie, 'Movie query is missing', ['category']);
}

const update = async (movieID, movie) => {
    return objectDocumentMapper.update(movieID,movie, Movie);
}

const remove = async (movieID) => {
    return objectDocumentMapper.remove(movieID, Movie);
}

const groupBy = async (groupBy) => {
    return objectDocumentMapper.groupBy(groupBy, Movie);
}


module.exports= { create, findById, query, update, remove, groupBy };

/**
const mongooseValidator = require('../services/mongoose.validator');
const errorHandler = require('../services/error.handler');

const create = async (movie) => {
    let movieModel = new Movie(movie);
    let result = await mongooseValidator.validateSchemaModel(movieModel);
    if (!result.isValid) {
        return result;
    }
    return movieModel.save()
        .then((savedMovie) => {
            return {success: true, data: savedMovie};
        })
        .catch((err) => {
            return errorHandler.handleDBError(err);
        });
}

const findById = async (movieID) => {
    let result = await mongooseValidator.validateID(movieID);
    if (!result.isValid) {
        return result;
    }
    return Movie.findOne(movieID)
        .then((movieFromDB) => {
            return {success: true, data: movieFromDB};
        })
        .catch((err) => {
            return errorHandler.handleDBError(err);
        });
}

const query = async (movieQuery) => {
    if (!movieQuery){
        return {success: false, isValid: false, message: 'Movie query is missing'};
    }
    return Movie.find(movieQuery)
        .then((movieFromDB) => {
            return {success: true, data: movieFromDB};
        })
        .catch((err) => {
            return errorHandler.handleDBError(err);
        });
}

const update = async (movieID, movie) => {
    let validateIDResult = await mongooseValidator.validateID(movieID);
    if (!validateIDResult.isValid) {
        return validateIDResult;
    }
    let categoryModel = new Movie(movie);
    let schemaValidationResult = await mongooseValidator.validateSchemaModel(categoryModel);
    if (!schemaValidationResult.isValid) {
        return schemaValidationResult;
    }
    delete movie._id;
    return Movie.findOneAndUpdate({_id: movieID} ,movie)
        .then((categoryFromDB) => {
            return {success: true, data:categoryFromDB};
        })
        .catch((err) => {
            return errorHandler.handleDBError(err);
        });
}

const remove = async (movieID) => {
    let result = await mongooseValidator.validateID(movieID);
    if (!result.isValid) {
        return result;
    }
    return Movie.findByIdAndDelete(movieID)
        .then(() => {
            return {success: true};
        })
        .catch((err) => {
            return errorHandler.handleDBError(err);
        });
}


module.exports= { create, findById, query, update, remove };
**/