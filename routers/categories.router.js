const express = require('express');
const categoriesRouter = express.Router();
const categoryService = require('../services/category');

categoriesRouter.route('/categories').post(categoryService.create);
categoriesRouter.route('/categories').get(categoryService.list);
categoriesRouter.route('/categories/:id').get(categoryService.byId);
categoriesRouter.route('/categories/:id').put(categoryService.update);
categoriesRouter.route('/categories/:id').delete(categoryService.remove);

module.exports = categoriesRouter;