const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routers/router');
const usersRouter = require('./routers/users.router');
const ordersRouter = require('./routers/orders.router');
const moviesRouter = require('./routers/movies.router');
const categoriesRouter = require('./routers/categories.router');
const mapsRouter = require('./routers/maps.router');


const dbOptions =
     {'useNewUrlParser': true,
        'useFindAndModify': false,
        'useCreateIndex': true,
        'useUnifiedTopology': true
    };

const dbUrl =  'mongodb://localhost:27017/binemacity';

mongoose.connect(dbUrl, dbOptions).then(
    () => { console.log('Connected to DB'); },
    err => { console.log('Connected to DB') }
);

const app = express();

app.get('/', (req, res) => { res.send('OK') });
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/v1', router);
app.use('/api/v1',usersRouter)
app.use('/api/v1',ordersRouter)
app.use('/api/v1',moviesRouter)
app.use('/api/v1',categoriesRouter)
app.use('/api/v1',mapsRouter)

const http = require('http');
const server = http.createServer(app).listen(3000, () => { console.log('listening on 3000') });

var numOusers = 0;
const io = require('socket.io').listen(server);

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
