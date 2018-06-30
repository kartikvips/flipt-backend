const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
    userAId: {
        type: String
    },
    userBId: {
        type: String
    },
    messages: [{
        senderId: String,
        content: String,
        time: String
    }]
});

const Chat = mongoose.model('chat', chatSchema);

module.exports = Chat;
