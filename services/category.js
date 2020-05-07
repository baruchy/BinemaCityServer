const Category = require('../models/category');

module.exports = {
    create: (req, res) => {
        let category = req.body;
        let c = new Category(category);
        var error = c.validateSync();
        if(error) {
            if (error.name == 'ValidationError') {
                let message = '';
                for (let field in error.errors) {
                    message = message + error.errors[field].message + '\n';
                }
                return res.status(404).send(message);
            }
        } else {
            Category.findOne({name: category.name}, (err, category) => {
                if (err) {
                    return res.status(500).send('Bad Request');
                }
                if (category) {
                    return res.status(404).send('Category with same name already exists');
                } else {
                    c.save((err, category) => {
                        if (err) {
                            return res.status(500).send('Bad Request');
                        }
                        res.json(category);
                    });
                    res.json(category);
                }
            });
        }
    },
    list: (req, res) => {
        Category.find({'active':true},(err, categories) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }
            res.json(categories);
        });
    },
    byId: (req, res) => {
        let catId = req.params.id;
        Category.findOne({_id: catId}, (err, category) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }
            res.json(category);
        });
    },
    update: (req, res) => {
        let catId = req.params.id;
        let category = req.body;

        let c = new Category(category);
        var error = c.validateSync();
        if(error) {
            if (error.name == 'ValidationError') {
                let message = '';
                for (let field in error.errors) {
                    message = message + error.errors[field].message + '\n';
                }
                return res.status(404).send(message);
            }
        } else {
            Category.findOne({_id: catId}, (err, c) => {
                if (err) {
                    return res.status(500).send('Bad Request');
                }

                c.name = category.name;
                Category.findOne({name: category.name}, (err, category) => {
                    if (err) {
                        return res.status(500).send('Bad Request');
                    }
                    if (category) {
                        return res.status(404).send('Category with same name already exists');
                    } else {
                        c.save((err, category) => {
                            if (err) {
                                return res.status(500).send('Bad Request');
                            }
                            res.json(category);
                        });
                        res.json(category);
                    }});
            });
        }
    }


};