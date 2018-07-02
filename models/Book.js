const mongoose = require('mongoose');
const {Schema} = mongoose;

// const geoSchema = new Schema({
//     type: {
//         default: "Point",
//         type: String
//     },
//     coordinates: {
//         type: [Number],
//         index: "2dsphere "
//     }
// });


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
    ownerId:{
        type: String
    },
    coordinates: {
        type: [Number]
    }

});

bookSchema.index({isbn: 1});

module.exports = mongoose.model('books', bookSchema);