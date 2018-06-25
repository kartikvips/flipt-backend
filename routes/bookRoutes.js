 const mongoose = require('mongoose');
 const Book = require('../models/Book');
 var express = require('express');
var router = express.Router();
 

     router.post('/api/books', (req,res) => {
        const {title,author, isbn, year, description, imageUrl, category} = req.body;

        const book = new Book({
            title,
            author,
            isbn,
            year,
            description,
            imageUrl,
            category
        });

        book.save();
        res.send(book);
     });

     module.exports = router;