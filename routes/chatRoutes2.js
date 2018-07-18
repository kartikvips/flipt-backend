const mongoose = require('mongoose');
const Chat = require('../models/Chat');
var express = require('express');
var router = express.Router();
const User = require('../models/User');

// For testing: get all chatrooms
router.get('/all', (req, res) => {
  Chat.find({})
    .then(chats => res.status(201).send(chats));
})

// Get a single chatroom by id
router.get('/:id', (req, res) => {
  Chat.findById(req.params.id)
    .then(chat => res.status(201).send(chat))
})

// Delete a chatroom by id
router.delete('/:id', (req, res) => {
  Chat.findById(req.params.id)
    .then(chat => {
      const { userAId, userBId } = chat;

      User.findByIdAndUpdate(
        userAId, 
        { $pull: { chatRoom: { _id: chat._id } } },
        { new: true }
      ).then(user => {})

      User.findByIdAndUpdate(
        userBId,
        { $pull: { chatRoom: { _id: chat._id } } },
        { new: true }
      ).then(user => {})

      return chat;
    })
    .then(chat => chat.remove())
    .then(() => res.redirect('/message/all'));
})

// Creaete a new chatroom
router.post('/new/:userAId/:userBId', (req, res) => {
  const { userAId, userBId } = req.params;
  
  Chat.create({ userAId, userBId })
    .then((chat) => {

      User.findByIdAndUpdate(
        userAId,
        { $push: { chatRoom: chat } },
        { new: true }
      ).then(() => {})

      User.findByIdAndUpdate(
        userBId,
        { $push: { chatRoom: chat } },
        { new: true }
      ).then(() => {})

      return chat;
    })
    .then(chat => res.status(201).send(chat))
    .catch(err => console.log(err))
});

router.post('/send', (req, res) => {
  Chat.findById(req.body.chatId)
    .then(chat => {
      const { userAId, userBId } = chat;

      User.findByIdAndUpdate(
        userAId,
        { $pull: { chatRoom: { _id: chat._id }}},
        { new: true }
      ).then(user => {})
      
      User.findByIdAndUpdate(
        userBId,
        { $pull: { chatRoom: { _id: chat._id }}},
        { new: true }
      ).then(user => {})

      return chat._id;
    })
    .then(id => {
      Chat.findByIdAndUpdate(
        id,
        { $push: { messages: req.body.message }}
      )
    })
})

module.exports = router;

