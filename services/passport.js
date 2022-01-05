const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');  //grabbing users model class

passport.serializeUser((user, done) => { //user is the user we just pulled from passport.use()
    done(null, user.id); //user.id is mongos unique id and not the oauth id
});
  
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

//use the google strategy for passport
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
    //callback event
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id }).then(existingUser => {
                if (existingUser){
                    //found existing user
                    done(null, existingUser);  //null = nothing went wrong, and tells mongo that we found existingUser
                } else {
                    //user has not been created
                    new User({ googleId: profile.id }).save() //takes the model and save to the database
                        .then(user => done(null, user));
                }
            });
        }
    )
); 