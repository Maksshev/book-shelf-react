const express = require('express');
const router = express.Router();
const Book = require('../models/book');


//get book
router.get('/book', (req, res) => {
    const id = req.query.id;
    Book.findById(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.status(200).json(doc)
    })
});

//get books
router.get('/', (req, res) => {
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const order = req.query.order ? req.query.order : 'asc';
    //order = asc || desc
    Book.find().skip(skip).sort({_id: order}).limit(limit).exec((err, doc) => {
        if (err) res.status(400).send(err);
        res.status(200).json(doc);
    })
});


//add book
router.post('/book', (req, res) => {
    const book = new Book({...req.body, search: req.body.name.split('').join(' ')});
    book.save((err, doc) => {
        if (err) return res.status(401).send(err);
        res.status(200).json({
            post: true,
            bookId: doc._id
        })
    })
});


//update book
router.post('/book_update', (req, res) => {
    Book.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({
            update: true,
            updatedBook: doc
        })
    })
});


//delete book
router.delete('/delete_book', (req, res) => {
    Book.findByIdAndDelete(req.query.id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({
            deleted: true
        })
    })
});

//get user's reviews
router.get('/reviews', (req, res) => {
    const ownerId = req.query.ownerId;
    Book.find({ownerId}).exec((err, reviewedBooks) => {
        if (err) return res.status(404).send(err);
        res.send(reviewedBooks);
    })
});


//search
router.get('/search', (req, res) => {
    const searchReq = req.query.search.split('').join(' ');
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    Book.find({
        $text: {$search: `${searchReq}`}
    }, {
        score: {$meta: "textScore"}
    })
        .skip(skip)
        .sort({ score : { $meta : 'textScore' } })
        .limit(limit)
        .exec((err, searchedBooks) => {
            if (err) return res.status(404).send(err);
            res.send(searchedBooks)
        })

});

module.exports = router;
