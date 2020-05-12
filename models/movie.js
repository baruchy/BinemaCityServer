const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Movie name is missing'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is missing']
    },
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    image: {
        type: String,
        required: [true, 'Image url is missing'],
        trim: true
    },
    orders: {type: Number, default: 0},
    active: {type: Boolean, default: true}
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
