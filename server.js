// call the packages we need
const express = require('express');        // call express
const app = express();                 // define our app using express
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userService = require('./services/user');
const map = require('./models/map');

const server = http.createServer(app);
const io = require('socket.io').listen(server);
const cors = require('cors');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/binemacity');
var port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
const router = require('./router');            // get an instance of the express Router
var numOusers = 0;
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({message: 'hooray! welcome to our api!'});
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


async function checkMaps() {
    map.find((err, maps) => {
        if (err) throw err;
        var locations = [
            ['Location 1 Name', 'New York, NY', 'Location 1 URL'],
            ['Location 2 Name', 'Newark, NJ', 'Location 2 URL'],
            ['Location 3 Name', 'Philadelphia, PA', 'Location 3 URL']
        ];
        if (maps.length == 0) {
            userService.setMaps(locations)
        }
    });

}

checkMaps();
io.on('connection', function (socket) {
    socket.on('userLoggedIn', function () {
        numOusers++;
        io.emit('userLoggedIn', numOusers);
    });

    socket.on('userLoggedOut', function () {
        if (numOusers == 0) return 0;
        numOusers--;
        io.emit('userLoggedOut', numOusers);
    });

    socket.on('onRefresh', function () {
        io.emit('userLoggedIn', numOusers);
    });

});
mongoose.Promise = global.Promise;

// START THE SERVER
// =============================================================================
//app.listen(port);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// we wait till mongo is ready before letting the http handler query users:
db.once('open', function () {
    console.log('Running');
});
server.listen(port, () => {
    console.log('Blockbuster Server listen on port 3000\n\n');
});
