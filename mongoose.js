const mongoose = require ('mongoose');

mongoose.Promise = global.Promise;

mongoose
    .connect('mongodb://localhost/test')
    .then(()=> console.log('DB connected'))
    .catch(err=>console.log(err));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose connected');
});


module.exports = mongoose;