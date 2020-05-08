const express = require('express');
const router = express.Router();
const userService = require('../services/user');
// const categoryService = require('./services/category');
// const movieService = require('./services/movie');
// const orderService = require('./services/order');

const cors=require('cors');

router.all('*', cors());
//Todo change url and add new service to authenticate
// when route to /login the the func login in users.js will run
router.route('/login').post(userService.login);
// when route to /register the the func register in users.js will run
router.route('/register').post(userService.register);

// categories
// router.route('/categories').post(categoryService.create);
// router.route('/categories').get(categoryService.list);
// router.route('/categories/:id').get(categoryService.byId);
// router.route('/categories/:id').put(categoryService.update);

// movies
// router.route('/movies').post(movieService.create);
//
// router.route('/movies').get(movieService.list);
// router.route('/movies/:id').get(movieService.byId);
// router.route('/movies/:id').put(movieService.update);
// router.route('/movies/:id').delete(movieService.delete);
// router.route('/movieByCategory').get(movieService.groupByCategory);

//http get ( get all, or by id), post(create) put(update) delete

// order
// router.route('/orders').post(orderService.create);
// router.route('/orders').get(orderService.list);
// router.route('/ordersByDate').post(orderService.ordersByDate);
// router.route('/orders/:id').get(orderService.byId);
// router.route('/orders/:id').put(orderService.update);
// router.route('/getMostRecommandedMovie/:id').get(orderService.getMostRecommandedMovie);

// users

/*
router.route('/users').post(userService.register);
router.route('/users').get(userService.list);
router.route('/users/:id/orders').get(userService.getUserOrders);
router.route('/users/:id').put(userService.update);
router.route('/users/:id/getml').get(userService.getml);
router.route('/users/:id').put(userService.update);
*/

//MAPS
// router.route('/maps').get(userService.maps);


module.exports = router;
