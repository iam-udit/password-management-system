// Import required modules
var passport = require('passport');
var userController = require('../controllers/users');
var GoogleStrategy = require('passport-google-oauth20');


// Setup passport for google-auth
module.exports = function (req, res, next) {

    // Options for google strategy
    let strategyOptions = {
        callbackURL: '/users/redirect',
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    };

    // Setup passport for google-strategy & callback                
    passport.use(new GoogleStrategy(strategyOptions, 
        async (accessToken, refreshToken, profile, done) => {       
            done(null, await userController.userSignIn(profile));
        })
    );

    // Serialize userData
    passport.serializeUser((user, done) => {        
        done(null, user._id);
    });

    // Deserialize userData
    passport.deserializeUser( async (userId, done) => {   
        done(null, await userController.getUserDetails(userId));
    });

    // Allow to next route
    next();
}