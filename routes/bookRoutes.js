 const mongoose = require('mongoose');
 const Book = require('../models/Book');
 var express = require('express');
 const googleBooks = require('google-books-search');
var router = express.Router();
const User = require('../models/User');

router.post('/new', (req,res) => {
    // console.log('here is the book',res.body);
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

function distance(lat1, lon1, lat2, lon2) {
    let radlat1 = (Math.PI * lat1) / 180;
    let radlat2 = (Math.PI * lat2) / 180;
    let theta = lon1 - lon2;
    let radtheta = (Math.PI * theta) / 180;
    let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    return dist;
}

router.post(
    "/search",
    (req, res) => {
        console.log(req);
        let range = parseInt(req.body.range) || 5000;
        let booksAround = [];
        let lat = parseFloat(req.body.latitude);
        let long = parseFloat(req.body.longitude);

        Book.find({
            title: {
                "$regex": req.body.title,
                "$options": "i"
            }
        })
            .then(books => {
                books.forEach(book => {

                    booksAround = booksAround.concat(book);
                });
                let newBooks = {};

                booksAround.forEach(eachB => {
                    if (eachB.coordinates) {
                        let point = eachB.coordinates;
                        if (distance(lat, long, point[0], point[1]) <= range) {
                            newBooks = Object.assign(newBooks, {
                                [eachB._id]: eachB
                            });
                        }
                    }
                });
                newBooks = Object.assign(
                    newBooks, {
                        range: range
                    }
                );

                res.json({
                    books: newBooks
                });
            })
            .catch(err =>
                res.status(404).send("ERRRROOOORR")
            );
        // Book.find({
        //         title: {
        //             "$regex": req.body.title,
        //             "$options": "i"
        //         }

        // })
        //     .then(books => console.log(books));
    }
);

// router.post('/search', (req, res) => {
//     Book.find({
//         $near: {
//             $geometry: {
//                 type: "Point",
//                 coordinates: [parseFloat(req.body.latitude), parseFloat(req.body.longitude)]
//             },
//             $minDistance: 0,
//             $maxDistance: 5000
//         }
//     }
//     ).then((books)=>res.send(books));
// });

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
