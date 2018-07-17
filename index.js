const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');
const booksRouter = require('./routes/bookRoutes');
const chatRouter = require('./routes/chatRoutes');
const authRouter = require('./routes/authRoutes');
const bodyParser = require('body-parser');



mongoose.connect(keys.mongoURI);

const app = express();
app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);


app.use(passport.initialize());
app.use(passport.session());

app.use('/books', booksRouter);
app.use('/message', chatRouter);
require('./routes/authRoutes')(app);





const PORT = process.env.PORT || 5000;
console.log(PORT);
app.listen(PORT);