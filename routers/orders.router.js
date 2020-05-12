const express = require('express');
const ordersRouter = express.Router();
const orderController = require('../controllers/order.controller');

ordersRouter.route('/orders').post(orderController.create);
ordersRouter.route('/orders').get(orderController.list);
ordersRouter.route('/orders/:id').get(orderController.byId);
ordersRouter.route('/orders/search/query').get(orderController.query);
ordersRouter.route('/orders/:id').put(orderController.update);
ordersRouter.route('/orders/:id').delete(orderController.removeById);

module.exports = ordersRouter;


// const express = require('express');
// const ordersRouter = express.Router();
// const orderService = require('../controllers/order.controller');
//
//
// ordersRouter.route('/orders').get(orderService.list);
// ordersRouter.route('/orders/:id').get(orderService.byId);
// ordersRouter.route('/orders').post(orderService.create);
// // ordersRouter.route('/ordersByDate').post(orderService.ordersByDate);
// ordersRouter.route('/orders/:id').put(orderService.update);
// //Todo rename url
// // ordersRouter.route('/getMostRecommandedMovie/:id').get(orderService.getMostRecommandedMovie);
//
//
// module.exports = ordersRouter;