var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MapSchema = new Schema({
    location:[] ,
});

module.exports = mongoose.model('Map', MapSchema);
