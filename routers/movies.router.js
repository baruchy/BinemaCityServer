const express = require('express');
const moviesRouter = express.Router();
const movieController = require('../controllers/movie.controller');

moviesRouter.route('/movies').post(movieController.create);
moviesRouter.route('/movies').get(movieController.list);
moviesRouter.route('/movies/:id').get(movieController.byId);
moviesRouter.route('/movies/:id').put(movieController.update);
moviesRouter.route('/movies/:id').delete(movieController.removeById);
moviesRouter.route('/movies/groupBy').post(movieController.groupBy);

module.exports = moviesRouter;