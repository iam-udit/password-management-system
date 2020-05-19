// Import required modules
var path = require('path');
var dotenv = require('dotenv');
var logger = require('morgan');
var express = require('express');
var passport = require('passport');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var expAutoSan = require('express-autosanitizer');
var database = require('./app/middlewares/database');
var passportSetup = require('./app/middlewares/passport-setup');


// Import required routes
var indexRouter = require('./app/routes/index');
var usersRouter = require('./app/routes/users');

// Initialize app
var app = express();

// Setup config-env file
dotenv.config({ path: 'config/process.env' });

// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configuration for morgan, body-parser & cookie-parser
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Sanitize all incomming request
app.use(expAutoSan.allUnsafe);

// Configuration for static files
app.use(express.static(path.join(__dirname, 'public')));

// Config cookie-session
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_SECRET_KEY]
}));

// Establish database connection 
database.connect();

// Setup and initialize passport
app.use(passportSetup);
app.use(passport.initialize());

// Setup passport session and available the user-data to local
app.use(passport.session(), function (req, res, next) {
    res.locals.user = req.user;    
    next();
});

// Provide routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404, 'Page not found'));
});

// Error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', { title: `Error : ${err.status}` });
});

module.exports = app;