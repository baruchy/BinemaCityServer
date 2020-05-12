const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    location: [],
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;