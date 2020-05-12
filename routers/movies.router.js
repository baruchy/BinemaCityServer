const express = require('express');
const moviesRouter = express.Router();
const movieController = require('../controllers/movie.controller');

moviesRouter.route('/movies').post(movieController.create);
moviesRouter.route('/movies').get(movieController.list);
moviesRouter.route('/movies/:id').get(movieController.byId);
moviesRouter.route('/movies/search/query').get(movieController.query);
moviesRouter.route('/movies/groupBy/:field').get(movieController.groupBy);
moviesRouter.route('/movies/:id').put(movieController.update);
moviesRouter.route('/movies/:id').delete(movieController.removeById);

module.exports = moviesRouter;