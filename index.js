const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');  
const bodyParser = require('body-parser');
require('./models/User');  //have to make model before passport fetches it
require('./services/passport'); //just runs the file

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json()); //parses request so that req.body has acess to the contents
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);  //calls the authRoutes() function from authRoutes.js
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    //Express will serve up production assets 
    //like our main.js file, or main.css file
    app.use(express.static('client/build'));


    //Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000; 
//grabs port from the Heroku environment or if none -> 5000
app.listen(PORT);

