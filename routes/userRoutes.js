const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
const User = require('../models/User');

//create new user
router.post('/new', (req, res) => {
  User.create(req.body)
    .then(user => res.status(201).send(user))
    .then(err => res.status(401).send({ error: err }))
})

router.get('/:id/chats', (req, res) => {
  User.findById({ _id: req.params.id })
    .then(user => res.status(201).send(user.chatroom))
    .catch(err => res.status(401).send({ error: err }))
})

router.get('/all', (req, res) => {
  User.find({})
    .then((users) => res.status(201).send(users))
})

router.get('/:id', (req, res) => {
  User.find({ _id: req.params.id })
    .then(user => res.status(201).send(user))
    .catch(err => res.status(401).send({ error: err }))
})

module.exports = router;