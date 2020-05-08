const express = require('express');
const router = express.Router();
const userService = require('../services/user');

const cors=require('cors');

router.all('*', cors());
//Todo change url and add new service to authenticate
router.route('/login').post(userService.login);

router.route('/register').post(userService.register);


router.get('/', function (req, res) {
    res.json({message: 'hooray! welcome to our api!'});
});

module.exports = router;
