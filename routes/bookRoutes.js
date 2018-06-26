 const mongoose = require('mongoose');
 const Book = require('../models/Book');
 var express = require('express');
var router = express.Router();
 

     router.post('/api/books', (req,res) => {
        const {title,author, isbn, year, description, imageUrl, category} = req.body;

        const newBook = new Book({
            title,
            author,
            isbn,
            year,
            description,
            imageUrl,
            category
        });

        // res.send(newBook);
        let test =  newBook.save();
        debugger;
        test.then(console.log,console.log);
        // .then((book) => {
        //     console.log(book);
        //     if(!book){
        //        return res.status(400).send();
        //     }
        //     return res.status(201).send(book);
        // }).catch(err => {
        //     if(err){
        //         return res.status(400).send({error:err});
        //     }
        //     return res.status(400).send();
        // });

            
     
     });

     router.get('/api/book/:id', (req,res) => {
        
     });
    

     module.exports = router;