const express = require('express');
const usersRouter = express.Router();
const userService = require('../controllers/user');


usersRouter.route('/users').get(userService.list);
usersRouter.route('/users/:id').put(userService.update);
usersRouter.route('/users').post(userService.register);
usersRouter.route('/users/:id/orders').get(userService.getUserOrders);
usersRouter.route('/users/:id').put(userService.update);
// Todo rename urls
usersRouter.route('/users/:id/getml').get(userService.getml);
usersRouter.route('/groupByGender').get(userService.groupByGender);

module.exports = usersRouter;