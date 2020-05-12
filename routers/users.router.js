const express = require('express');
const usersRouter = express.Router();
const userController = require('../controllers/user.controller');

usersRouter.route('/users').post(userController.create);
usersRouter.route('/users').get(userController.list);
usersRouter.route('/users/:id').get(userController.byId);
usersRouter.route('/users/:id/orders').get(userController.getOrders);
usersRouter.route('/users/search/query').get(userController.query);
usersRouter.route('/users/groupBy/:field').get(userController.groupBy);
usersRouter.route('/users/:id').put(userController.update);
usersRouter.route('/users/:id').delete(userController.removeById);

module.exports = usersRouter;