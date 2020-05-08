const express = require('express');
const mapsRouter = express.Router();
// Todo add new service
const userService = require('../services/user');


// Todo rename urls
mapsRouter.route('/maps').get(userService.maps);

module.exports = mapsRouter;