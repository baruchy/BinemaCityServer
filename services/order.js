const Order = require('../models/order');
const Movie = require('../models/movie');

module.exports = {
    create: (req, res) => {
        let order = req.body;
        let p = new Order(order);

        p.save((err, order) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }
            order.movies.forEach(async (m) => {
                await Movie.findOne({_id: m._id}, (err, founded) => {
                	if (err) {
                    	return res.status(500).send('Bad Request');
                    }

                    if (!founded.orders) {
                        founded.orders = 0;
                    }

                    founded.orders++;
                    founded.save((err, newMovie) => {
                        if (err) throw err;

                        res.json(newMovie);
                    });

                });

            });
            res.json(order);
        });
    },
    list: (req, res) => {
        Order.find().populate('movies').exec((err, order) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }

            res.json(order);
        });
    },
    ordersByDate: (req, res) => {
        let from = req.body.from;
        let to = req.body.to;
        Order.find({order_date: {$gte: new Date(from), $lte: new Date(to)}}, (err, orders) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }

            res.json(orders);
        });
    },
    byId: (req, res) => {
        let pId = req.params.id;

        Order.findOne({_id: pId}).populate('category', 'name').exec((err, order) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }

            res.json(order);
        });
    },
    update: (req, res) => {
        let pId = req.params.id;
        let order = req.body;

        Order.findOne({_id: pId}, (err, o) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }

            o.user = order.user;
            o.movies = order.movies;
            o.price = order.price;
            o.order_date = order.order_date;
            o.card_digits = order.card_digits;

            o.save((err, newOrder) => {
            	if (err) {
                	return res.status(500).send('Bad Request');
                }

                res.json(newOrder);
            });

        });
    },
    getMostRecommandedMovie: (req, res) => {
        let pId = req.params.id;


        Order.find({_id: pId}, (err, orders) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }
            let allprods = [];
            orders.forEach((o) => {
                o.products.forEach((p) => {
                    if (pInAllProducts(p)) {
                        allprods[p.name]++;
                    } else {
                        allprods[p.name] = 0;
                    }
                })
            });
            var max = Object.keys(allprods).reduce((a, b) => allprods[a] > allprods[b] ? a : b);
        });
    },


};
