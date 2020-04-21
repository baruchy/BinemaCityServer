var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'email is missing']
      },
    password: {
        type: String,
        required: [true, 'password is missing']
      },
    role: {type: String, default: 'user'},
    active: {type: Boolean, default: true},
    gender: {type: String, default: 'Male'}
});

module.exports = mongoose.model('User', UserSchema);
