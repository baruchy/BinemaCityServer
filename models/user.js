var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'password is missing'],
        trim: true
    },
    role: {type: String, default: 'user'},
    active: {type: Boolean, default: true},
    gender: {
        type: String,
        required: [true, 'Gender is missing'],
        trim: true,
        default: 'Male'
    }
});

module.exports = mongoose.model('User', UserSchema);
