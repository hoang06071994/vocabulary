const mongoose = require('mongoose');

const {DATABASE_LINK} = process.env;

mongoose.connect('mongodb://localhost/vocabulary');

const wordSchema = mongoose.Schema({
    userId: {
        type: String,
        ref: 'user',
        required: true
    },
    word: {
        type: String,
        required: true
    },
    spelling: String,
    audio: String,
    means: String,
    example: String
}, {collection: 'word'});
exports.wordModel = mongoose.model('word', wordSchema);