const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    }
);

const User  = mongoose.model('users', userSchema);

module.exports = User;