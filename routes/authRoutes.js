const passport = require('passport');

module.exports = app =>{

    app.get(
        '/auth/google', 
        passport.authenticate('google', {  //'google' knows automatically that it refers to googleStrategy
            scope: ['profile', 'email'] //specifies to Google that we want profile and email
        })
    );

    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        }
        );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};