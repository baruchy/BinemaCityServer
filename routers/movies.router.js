const express = require('express');
const moviesRouter = express.Router();
const movieService = require('../services/movie');

moviesRouter.route('/movies').post(movieService.create);
moviesRouter.route('/movies').get(movieService.list);
moviesRouter.route('/movies/:id').get(movieService.byId);
moviesRouter.route('/movies/:id').put(movieService.update);
moviesRouter.route('/movies/:id').delete(movieService.delete);
//Todo rename url
moviesRouter.route('/movieByCategory').get(movieService.groupByCategory);

module.exports = moviesRouter;