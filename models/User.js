const mongoose = require('mongoose');
const { Schema } = mongoose;


// create geolocation Schema
// const geoSchema = new Schema({
//     type:{
//         default: "Point",
//         type: String
//     },
//     coordinates: {
//         type: [Number],
//         index: "2dsphere "
//     }
// });



const userSchema = new Schema({
    profileId: String,
    name: String,
    firstname: String,
    lastname: String,
    avatar: String,
    ownedBook: {
        type: Array, 
        "default": []
    },
    borrowedBook: {
        type: Array, 
        "default": []
    },
    lentBook: {
        type: Array,
        "default": []
    },
    chatRoom:{
        type: Array,
        "default": []
    },
    coordinates: {
        type: [Number]
    }
});

const User  = mongoose.model('users', userSchema);

module.exports = User;