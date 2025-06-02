const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars')
const passport = require('./auth/index');

const indexRouter = require('./routers/index');
const appSession = require('./lib/session');

const app = express();


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// initialize middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//initialize logger

//initialize session
app.use(appSession)
app.use(passport.initialize())
app.use(passport.session())
// initialize routers
app.use(express.static('public'));

require('./database/init.database');
app.use('/', indexRouter);

//catch error
app.use(function(req, res, next) {
  res.render('404', {
    title: 'Error',
    message: 'Page not found',
    status: 404
  });
});
module.exports = app;