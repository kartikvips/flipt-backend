const mongoose = require('mongoose');
const {Schema} = mongoose;

const bookSchema = new Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    author:{
        type: String,
        required: true,
        trim: true
    },
    isbn:{
        type: String,
        trim: true
    },
    year:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    imageUrl:{
        type: String
    },
    category:{
        type: String
    },
    lat:{
        type: Number
    },
    long:{
        type: Number
    }
});

bookSchema.index({isbn: 1});

module.exports = mongoose.model('books', bookSchema);