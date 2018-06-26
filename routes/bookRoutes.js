 const mongoose = require('mongoose');
 const Book = require('../models/Book');
 var express = require('express');
 const googleBooks = require('google-books-search');
var router = express.Router();
 

     router.post('/new', (req,res) => {
        Book.create(req.body).then((book) => {
            return res.status(201).send(book);
        }).catch(err => {
            return res.status(400).send({error:err});
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

     router.get('/google/:isbn',(req,res) => {
        googleBooks.search(req.params.isbn,(error, book)=> {
            if (!error){
                res.status(201).send(book);
            }else {
                res.status(400).send(error);
            }
        });
     });

     

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
            return res.status(201).send(book);
        }).catch(err => {
                return res.status(400).send({error:err});
        });

     });
    

     module.exports = router;