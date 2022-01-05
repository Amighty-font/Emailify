const cookieSession = require('cookie-session');
const passport = require('passport');
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');  //have to make model before passport fetches it
require('./services/passport'); //just runs the file



mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);  //calls the authRoutes() function from authRoutes.js

const PORT = process.env.PORT || 5000; 
//grabs port from the Heroku environment or if none -> 5000
app.listen(PORT);

