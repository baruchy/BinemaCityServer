const Movie = require('../models/movie');

module.exports = {
    create: (req, res) => {
        let movie = req.body;
        let p = new Movie(movie);

        p.save((err, movie) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }

            res.json(movie);
        });
    },
    list: (req, res) => {  
        Movie.find().populate('category', 'name').exec((err, movies) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }
            res.json(movies);
        });
    },
    byId: (req, res) => {
        let pId = req.params.id;

        Movie.findOne({_id: pId}).populate('category', 'name').exec((err, movie) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }

            res.json(movie);
        });
    },
    update: (req, res) => {
        let pId = req.params.id;
        let movie = req.body;

        Movie.findOne({_id: pId}, (err, p) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }

            p.name = movie.name;
            p.price = movie.price;
            p.category = movie.category;
            p.image = movie.image;

            p.save((err, newMovie) => {
            	if (err) {
                	return res.status(500).send('Bad Request');
                }

                res.json(newMovie);
            });

        });
    },
    delete: (req, res) => {
        let id = req.params.id;

        Movie.findOne({_id: id}, (err, p) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }

            p.active = false;

            p.save((err, prod) => {
            	if (err) {
                	return res.status(500).send('Bad Request');
                }

                res.json(prod);
            });
        });

    },

    groupByCategory: (req, res) => {
        Movie.aggregate(
            [{
                $group: {
                    _id:  "$category",
                    count:{$sum:1}
                }
            }]
        ).exec((err, prods) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }
           res.json(prods);
        })
    }


};
