const Category = require('../models/category');
const mongoose = require('mongoose');
const categoryDao = require('../daos/category.dao');
const responseHandler = require('../utils/response.handler');

const create = async (req, res) => {
    try {
        let findByNameResult = await categoryDao.findByName(req.body.name);
        if (!findByNameResult.success) {
            return responseHandler.populateInternalErrorResponse(res, findByNameResult.message);
        } else if (findByNameResult.data) {
            return responseHandler.populateInternalErrorResponse(res,'Category with same name already exists');
        }
        let createResult = await categoryDao.create(req.body);
        return responseHandler.populateResponse(res, createResult);
    } catch (e) {
        console.log(e)
        return responseHandler.populateInternalErrorResponse(res);
    }
}


module.exports = {
    create,
    list: (req, res) => {
        Category.find({'active':true},(err, categories) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }
            res.json(categories);
        });
    },
    byId: (req, res) => {
        let categoryId = req.params.id
        if (!mongoose.Types.ObjectId.isValid(categoryId)){
            return res.status(404).send('Bad category ID');
        }
        Category.findOne({_id: categoryId}, (err, category) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }
            res.json(category);
        });
    },
    update: (req, res) => {
        let categoryId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(categoryId)){
            return res.status(404).send('Bad category ID');
        }
        let category = req.body;

        let c = new Category(category);
        var error = c.validateSync();
        if(error) {
            if (error.name == 'ValidationError') {
                let message = '';
                for (let field in error.errors) {
                    message = message + error.errors[field].message + '\n';
                }
                return res.status(404).send(message);
            }
        } else {
            Category.findOne({_id: categoryId}, (err, c) => {
                if (err) {
                    return res.status(500).send('Bad Request');
                }

                c.name = category.name;
                Category.findOne({name: category.name}, (err, category) => {
                    if (err) {
                        return res.status(500).send('Bad Request');
                    }
                    if (category) {
                        return res.status(404).send('Category with same name already exists');
                    } else {
                        c.save((err, category) => {
                            if (err) {
                                return res.status(500).send('Bad Request');
                            }
                            res.json(category);
                        });
                        res.json(category);
                    }});
            });
        }
    }

};