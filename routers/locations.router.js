const express = require('express');
const locationsRouter = express.Router();
const locationsController = require('../controllers/location.controller');

locationsRouter.route('/locations').post(locationsController.create);
locationsRouter.route('/locations').get(locationsController.list);
locationsRouter.route('/locations/:id').get(locationsController.byId);
locationsRouter.route('/locations/search/query').get(locationsController.query);
locationsRouter.route('/locations/:id').put(locationsController.update);
locationsRouter.route('/locations/:id').delete(locationsController.removeById);

module.exports = locationsRouter;