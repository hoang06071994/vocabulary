const mongoose = require('mongoose');

const {DATABASE_LINK} = process.env

mongoose.connect(DATABASE_LINK);
const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: String,
    age: Number,
    role: {
        type: String,
        default: 'user'
    },
    avatar: String,
    result: []
}, {collection: 'user'});

exports.UserModel = mongoose.model('user', UserSchema);