// call the packages we need
const express = require('express');        // call express
const app = express();                 // define our app using express
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userService = require('./services/user');
const map = require('./models/map');
const router = require('./routers/router');
const usersRouter = require('./routers/users.router');
const ordersRouter = require('./routers/orders.router');
const moviesRouter = require('./routers/movies.router');
const categoriesRouter = require('./routers/categories.router');
const mapsRouter = require('./routers/maps.router');

const server = http.createServer(app);
const io = require('socket.io').listen(server);


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

this.getMongoConnectionConfig = function () {
    return {'useNewUrlParser': true,
        'useFindAndModify': false,
        'useCreateIndex': true,
        'useUnifiedTopology': true
    };
}

mongoose.connect('mongodb://localhost:27017/binemacity', this.getMongoConnectionConfig());
var port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================

var numOusers = 0;
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({message: 'hooray! welcome to our api!'});
});

// REGISTER OUR ROUTES -------------------------------
// all of our routers will be prefixed with /api

app.use('/api', router);
app.use('/api',usersRouter)
app.use('/api',ordersRouter)
app.use('/api',moviesRouter)
app.use('/api',categoriesRouter)
app.use('/api',mapsRouter)

async function checkMaps() {
    map.find((err, maps) => {
        if (err) throw err;
        var locations = [
            ['Binema City NY', 'New York, NY', 'about'],
            ['Binema City NJ', 'Newark, NJ', 'about'],
            ['Binema City PA', 'Philadelphia, PA', 'about']
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
    console.log('Binema City Server listen on port 3000\n\n');
});
