const express = require('express');
const ordersRouter = express.Router();
const orderService = require('../services/order');


ordersRouter.route('/orders').get(orderService.list);
ordersRouter.route('/orders/:id').get(orderService.byId);
ordersRouter.route('/orders').post(orderService.create);
ordersRouter.route('/ordersByDate').post(orderService.ordersByDate);
ordersRouter.route('/orders/:id').put(orderService.update);
//Todo rename url
ordersRouter.route('/getMostRecommandedMovie/:id').get(orderService.getMostRecommandedMovie);


module.exports = ordersRouter;