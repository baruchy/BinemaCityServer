const Category = require('../models/category');

module.exports = {
    create: (req, res) => {
        let category = req.body;
        let c = new Category(category);
        c.save((err, category) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }
            res.json(category);
        });
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

        Category.findOne({_id: catId}, (err, c) => {
        	if (err) {
            	return res.status(500).send('Bad Request');
            }

            c.name = category.name;

            c.save((err, newCategory) => {
            	if (err) {
                	return res.status(500).send('Bad Request');
                }

                res.json(newCategory);
            });
        });

    }


};