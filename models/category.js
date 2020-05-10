const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        unique: true,
        type: String,
        required: [true, 'Category name is missing'],
        trim: true
    },
    active: {type: Boolean, default: true}
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;