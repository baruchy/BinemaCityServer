const Movie = require('../models/movie');

module.exports = {
    create: (req, res) => {
        let movie = req.body;
        let p = new Movie(movie);

        var error = p.validateSync();
        if(error) {
            if (error.name == 'ValidationError') {
                let message = '';
                for (let field in error.errors) {
                    message = message + error.errors[field].message + '\n';
                }
                return res.status(404).send(message);
            }
        } else {
            p.save((err, movie) => {
                if (err) {
                    return res.status(500).send('Bad Request');
                }
                res.json(movie);
            });
        }
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
        let p = new Movie(movie);
        var error = p.validateSync();
        if(error) {
            if (error.name == 'ValidationError') {
                let message = '';
                for (let field in error.errors) {
                    message = message + error.errors[field].message + '\n';
                }
                return res.status(404).send(message);
            }
        } else {

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
        }
    },
    delete: (req, res) => {
        let id = req.params.id;
        Movie.deleteOne({_id: id}, (err, p) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }
        	return res.json(p);
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
