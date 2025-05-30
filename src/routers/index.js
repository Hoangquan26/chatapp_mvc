const express = require('express');
const router = express.Router();
const passport = require('../auth/index');

router.get('/', passport.isAuthenticated, (req, res) => {
    console.log(req.session); 
    res.render('chatroom', {
        title: 'Home',
        message: 'Welcome to the Home Page!'
    });
})


router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login',
        message: 'Please log in to continue.'
    });
})

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureMessage: true
}), (req, res) => {
    res.redirect('/');
})

module.exports = router