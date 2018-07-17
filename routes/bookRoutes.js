 const mongoose = require('mongoose');
 const Book = require('../models/Book');
 var express = require('express');
 const googleBooks = require('google-books-search');
var router = express.Router();
const User = require('../models/User');

router.post('/new', (req,res) => {
    console.log('here is the book',res.body);
    Book.create(req.body).then((book) => {
        User.findByIdAndUpdate(req.body.ownerId,
        {
            $push : {
                ownedBook : book
            },
            coordinates: req.body.coordinates
        }
    ).then(user => user).catch(err => console.log(err));

    // console.log(req.body.ownerId);
    // User.findById({_id: book.ownerId}).then((user) => {
    //         console.log(user.firstname);
    
    // });
   
        return res.status(201).send(book);
    }).catch(err => {
        return res.status(400).send({error:err});
    });
});

router.post('/borrow', (req, res) => {
    Book.findById(req.body.bookId)
        .then(book => {

        User.findByIdAndUpdate(book.ownerId, {
            $push: {
                lentBook: book
            }
        }).then(user => console.log(user)).catch(err => console.log(err));


        User.findByIdAndUpdate(req.body.borrowerId, {
            $push: {
                borrowedBook: book
            }
        }).then(user => console.log(user)).catch(err => console.log(err));

        return res.status(201).send(book);
    }).catch(err => {
        return res.status(400).send({
            error: err
        });
    });
});

router.post('/return', (req, res) => {
    Book.findById(req.body.bookId)
        .then(book => {

            User.findByIdAndUpdate(book.ownerId, {
                $pull: {
                    lentBook: book
                }
            }).then(user => console.log(user)).catch(err => console.log(err));


            User.findByIdAndUpdate(req.body.borrowerId, {
                $pull: {
                    borrowedBook: book
                }
            }).then(user => console.log(user)).catch(err => console.log(err));

            return res.status(201).send(book);
        }).catch(err => {
            return res.status(400).send({
                error: err
            });
        });
});



router.get('/all', (req,res) => {
    Book.find({}).then((books) => {
        res.status(201).send(books);
    });
});

router.get('/:id', (req,res) => {
    Book.findById({_id: req.params.id}).then((book) => {
        res.status(201).send(book);
    }).catch(err => {
        return res.status(401).send({error:err});
    });
});

router.get('/google/:isbn', (req, res) => {
    googleBooks.search(req.params.isbn, (error, book) => {
        // console.log(book);
        if(book === [] || book === {}){
            res.send(false);
        }
        else if (!error) {
            if (!book[0].thumbnail){
                book[0].thumbnail = 'http://res.cloudinary.com/dbm56y2y/image/upload/v1530484547/blank_cover.jpg';
            }
            res.status(201).send({
                title: book[0].title,
                author: book[0].authors,
                isbn: req.params.isbn,
                year: book[0].publishedDate.slice(0, 4),
                description: book[0].description,
                imageUrl: (book[0].thumbnail.slice(0, 4) + 's' + book[0].thumbnail.slice(4)),
                category: book[0].categories,
                ownerId: null
            });
        } else {
            res.status(400).send(error);
        }
    });
});

// router.get('/search'), (req, res) => {

// }

router.patch('/:id', (req,res) => {
    Book.findByIdAndUpdate({_id:req.params.id},req.body).then(() => {
        Book.findOne({_id: req.params.id}).then(book => {
        return res.status(201).send(book);
    });
    }).catch(err => {
            return res.status(400).send({error:err});
    });

});

router.delete('/:id', (req,res) => {
    Book.findByIdAndRemove({_id:req.params.id}).then(book => {
        // console.log(book.ownerId);
        // console.log(book);
        // console.log(User.findById(book.ownerId));
        User.findByIdAndUpdate(book.ownerId, {
            $pull: {
                ownedBook: book
            }
        }).then(user => user).catch(err => console.log(err));

        return res.status(201).send(book);
    }).catch(err => {
            return res.status(400).send({error:err});
    });

});


module.exports = router;