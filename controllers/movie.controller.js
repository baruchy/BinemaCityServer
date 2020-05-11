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

const update = async (req, res) => {
    return await apiHandler.handleUpdate(req, res, movieDao);
}

const removeById = async (req, res) => {
    return await apiHandler.handleRemove(req, res, movieDao);
}

const groupBy = async (req, res) => {
    return await apiHandler.handleGroupBy(req, res, movieDao);
}


module.exports = { create, list, byId, update, removeById, groupBy };




/*
const MovieController = require('../models/movie');

module.exports = {
    create: (req, res) => {
        let movie = req.body;
        let p = new MovieController(movie);

        var error = p.validateSync();
        if(error) {
            if (error.name == 'ValidationError') {
                let message = '';
                for (let field in error.errors) {
                    message = message + error.errors[field].message + '\n';
                }
                return res.status(404).send(message);
            }
        } else {
            p.save((err, movie) => {
                if (err) {
                    return res.status(500).send('Bad Request');
                }
                res.json(movie);
            });
        }
    },
    list: (req, res) => {  
        MovieController.find().populate('category', 'name').exec((err, movies) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }
            res.json(movies);
        });
    },
    byId: (req, res) => {
        let pId = req.params.id;

        MovieController.findOne({_id: pId}).populate('category', 'name').exec((err, movie) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }

            res.json(movie);
        });
    },
    update: (req, res) => {
        let pId = req.params.id;
        let movie = req.body;
        let p = new MovieController(movie);
        var error = p.validateSync();
        if(error) {
            if (error.name == 'ValidationError') {
                let message = '';
                for (let field in error.errors) {
                    message = message + error.errors[field].message + '\n';
                }
                return res.status(404).send(message);
            }
        } else {

            MovieController.findOne({_id: pId}, (err, p) => {
                if (err) {
                    return res.status(500).send('Bad Request');
                }

                p.name = movie.name;
                p.price = movie.price;
                p.category = movie.category;
                p.image = movie.image;

                p.save((err, newMovie) => {
                    if (err) {
                        return res.status(500).send('Bad Request');
                    }
                    res.json(newMovie);
                });

            });
        }
    },
    delete: (req, res) => {
        let id = req.params.id;
        MovieController.deleteOne({_id: id}, (err, p) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }
        	return res.json(p);
        });

    },

    groupByCategory: (req, res) => {
        MovieController.aggregate(
            [{
                $group: {
                    _id:  "$category",
                    count:{$sum:1}
                }
            }]
        ).exec((err, prods) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }
           res.json(prods);
        })
    }


};
*/