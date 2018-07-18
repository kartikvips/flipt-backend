const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
const User = require('../models/User');

router.get('/all', (req, res) => {
  User.find({})
      .then(users => res.status(201).send(users))
})

router.get('/:id', (req, res) => {
  User.findOne({ _id: req.params.id })
    .then(user => res.status(201).send(user))
    .catch(err => console.log(err));
})

// just for testing
router.patch('/clearchat/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, { chatRoom: [] })
    .then(user => res.status(201).send(user));
})
module.exports = router;