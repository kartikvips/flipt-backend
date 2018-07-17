const passport = require('passport');
const User = require('../models/User');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    // app.get('/auth/google/callback', passport.authenticate('google'));

    app.get(
        '/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/auth/google'
        }),
        (req, res) =>{
        return res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user));
        }
    );

    // app.get(
    //     '/auth/google/callback',
    //     passport.authenticate('google', {
    //         failureRedirect: '/auth/google'
    //     }),
    //     (req, res) =>
    //     res.send(req.user)
    // );

    // Set up Facebook auth routes
    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            failureRedirect: '/auth/facebook'
        }),
        // Redirect user back to the mobile app using Linking with a custom protocol OAuthLogin
        (req, res) => res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user)));

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });

    app.get('/api/current_user/:id', (req, res) => {
        // console.log('made it to user fetch backend', req.data);
        // req.params.id
        // the front end is sending the wrong id for some reason
        // this is the right id
        // _id: '5b398f9ea055bf441feb4626'
        // console.log('the user params are', req.params);
        User.findOne({ _id: req.params.id }).then(user => {
          console.log('the user is', user);
          res.send(user);
        });
    });
};
