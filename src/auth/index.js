const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy;
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    // Here you would typically fetch the user from the database
    // For example:
    // User.findById(id, (err, user) => {
    //     done(err, user);
    // });
    
    // For demonstration purposes, we'll just return a mock user
    const mockUser = { id: id, username: 'testuser' };
    done(null, mockUser);
})



passport.use(new LocalStrategy(
    (username, password, done) => {
        console.log('Authenticating user:', username, password);
        // Here you would typically check the username and password against your database
        // For example:
        // User.findOne({ username: username }, (err, user) => {
        //     if (err) return done(err);
        //     if (!user) return done(null, false, { message: 'Incorrect username.' });
        //     if (user.password !== password) return done(null, false, { message: 'Incorrect password.' });
        //     return done(null, user);
        // });

        // For demonstration purposes, we'll just accept any username and password
        const mockUser = { id: 1, username: username };
        return done(null, mockUser);
    }
));

passport.isAuthenticated = function(req, res, next) { 
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = passport;
// This module sets up Passport.js for user authentication in an Express application.