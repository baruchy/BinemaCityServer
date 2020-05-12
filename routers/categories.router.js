const express = require('express');
const categoriesRouter = express.Router();
const categoryController = require('../controllers/category.controller');

categoriesRouter.route('/categories').post(categoryController.create);
categoriesRouter.route('/categories').get(categoryController.list);
categoriesRouter.route('/categories/:id').get(categoryController.byId);
categoriesRouter.route('/categories/search/query').get(categoryController.query);
categoriesRouter.route('/categories/:id').put(categoryController.update);
categoriesRouter.route('/categories/:id').delete(categoryController.removeById);

module.exports = categoriesRouter;