const User = require('../models/user');
const Order = require('../models/order');
const Movie = require('../models/movie');
const Map = require('../models/map');
const brain = require('brain.js');


module.exports = {
    login: (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        User.findOne({email: email, password: password}, (err, user) => {
            if (err) {
            	return res.status(500).send('Bad Request');
            }
            if (!user) {
                return res.status(404).send('Incorrect username or password');
            }
            console.log(user.fname, 'connected to the store');
            return res.json(user);
        });
    },
    register: (req, res) => {
        let user = req.body;
        console.log('user-----' + JSON.stringify(user));
        let u = new User(user);
        
        var error = u.validateSync();
        if(error) {
        	console.log('errors');
        	if (error.name == 'ValidationError') {
            	let message = '';
                for (field in error.errors) {
                    console.log(error.errors[field].message);
                    message = message + error.errors[field].message + '\n';
                }
            	return res.status(404).send(message);
            }
        }
        console.log('1');
        u.save((err, user) => {
        	console.log('2');
        	if (err) {
        		console.log('3');
            	return res.status(500).send('Bad Request');
            }
        	console.log('4');
            console.log(user.fname, 'register to the store');
            console.log('5');
            return res.json(user);
        });
    },
    getUserOrders: (req, res) => {
        let id = req.params.id;
        Order.find({user: id}).populate('movies').exec((err, orders) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }
            res.json(orders);
        });
    },
    list: (req, res) => {
        User.find({active: true}, (err, users) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }
            res.json(users);
        });
    },
    maps: (req, res) => {
        Map.find((err, maps) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }
            res.json(maps);
        });
    },
    setMaps: (maps) => {
        maps.forEach(m => {
            console.log(m);
            let map = new Map({location:m});
            map.save((err, _map) => {
            	if (err) {
                	return res.status(500).send('Bad Request');
                }
                console.log(_map);
                return true;
            });
        });
    },
    update: (req, res) => {
        let pId = req.params.id;
        let password = req.body.password;

        User.findOne({_id: pId}, (err, user) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }
            user.password = password;
            user.save((err, newUser) => {
            	if (err) {
                	return res.status(500).send('Bad Request');
                }
                res.json(newUser);
            });
        });
    },
    delete: (req, res) => {
        console.log('delete user' + req.params.id);
        let id = req.params.id;
        User.findOne({_id: id}, (err, u) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }
            u.active = false;
            u.save((err, user) => {
            	if (err) {
                	return res.status(500).send('Bad Request');
                }
                res.json(user);
            });
        });
    },
    groupByGender: (req, res) => {
        User.aggregate([
            {
                $group: {
                    _id: "$gender",
                    count: {$sum: 1}
                }
            }]
        ).exec((err, users) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }
            res.json(users);
        })
    },
    getml: (req, res) => {
        let id = req.params.id;
        let userMovies = [];
        let trainData = [];

        Order.find({user: id}).populate('movies').exec((err, orders) => {

        	if (err) {
            	return res.status(500).send('Bad Request');
            }

            orders.forEach((o) => {
                console.log('start 1')
                o.movies.forEach((p) => {
                    userMovies.push(p);
                    trainData.push({input: p.name, output: 1});
                });

            })

            let allMovies = [];
            Movie.find({}, (err, movies) => {

            	if (err) {
                	return res.status(500).send('Bad Request');
                }
                allMovies = movies;
                movies.forEach((p) => {
                    console.log('start 2')
                    var found = userMovies.filter((up) => {
                        return up._id == p._id;
                    });

                    if (!found) {
                        console.log('NOT EXIST ------' + JSON.stringify(p));
                        //trainData.push({input: {name: p.name, price: p.price}, output: {goodMovie: 0}});
                        //trainData.push({input: [p.price], output: [0]});
                    }
                })

                let net = new brain.NeuralNetwork();

                console.log('TRAIN DATA ___________');
                console.log(trainData);
                if (trainData.length > 0) {
                    net.train(trainData);
                    let bestMovie;
                    let bestMoviePredicate = 0;
                    let output;
                    allMovies.forEach((p) => {
                        console.log('test ------ ');
                        console.log({name: p.name, price: p.price});
                        //output = net.run({_id: p._id, name: p.name, price: p.price});
                        output = net.run(p.name);
                        console.log('output ------' + JSON.stringify(output));
                        if (output > bestMoviePredicate) {
                            bestMoviePredicate = output;
                            bestMovie = p;
                        }
                    });
                    console.log('best movie-' + JSON.stringify(bestMovie));
                    res.json(bestMovie);
                } else {
                    res.json({});
                }
            });
        });
    },
};