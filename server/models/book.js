const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    review: {
        type: String,
        default: 'n/a'
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    price: {
        type: String,
        default: 'n/a'
    },
    ownerId: {
        type: String,
        required: true
    },
    pages: {
        type: String,
        required: true
    },
    search: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});


bookSchema.index({search: 'text'});



const Book = mongoose.model('Book', bookSchema);


module.exports = Book;