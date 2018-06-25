 const mongoose = require('mongoose');
 const Book = mongoose.model('books');
 
 module.export = app => {
     app.post('/api/books', (req,res) => {
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
 };