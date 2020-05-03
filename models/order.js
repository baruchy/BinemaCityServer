const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    movies: [{type: Schema.Types.ObjectId, ref: 'Movie'}],
    price: Number,
    order_date: Date,
    card_digits: {
        type: String,
        required: [true, 'card digits are missing'],
        trim: true
    },
    is_bitcoin: {type: Boolean, default: false}
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
