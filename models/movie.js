const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema= new Schema({
    name: String,
    price: Number,
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    image: String,
    orders: {type: Number, default: 0},
    active: {type: Boolean, default: true}
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
