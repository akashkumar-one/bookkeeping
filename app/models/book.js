const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let bookSchema = new Schema({
    "author": {
        type: String,
        required: true
    },
    "country": {
        type: String,
        required: true
    },
    "imageLink": {
        type: String,
        required: true
    },
    "language": {
        type: String,
        required: true
    },
    "link": {
        type: String
    },
    "pages": {
        type: Number
    },
    "title": {
        type: String,
        required: true
    },
    "year": {
        type: Number,
        required: true
    }
});

let Book = mongoose.model('Book', bookSchema);

module.exports = Book;