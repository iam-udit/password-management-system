// Import all required modules
var express = require('express');
var router = express.Router();
var passport = require('passport');
var upload = require('../middlewares/upload');
var userController = require('../controllers/users');

// Check user authorization
function checkAuth(req, res, next) {
    
    if(req.user) {
        // If user is authorized
        next();
    } else{
        // If user is not authorized
        res.redirect('/');
    }
}

// GET: google auth operation
router.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));

// GET: google auth callback/ user singup & login operation
router.get('/redirect', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/' }));

// GET: route for user profile
router.get('/profile', checkAuth, function (req, res, next) { 
    res.render('profile', { title: 'PMS | Profile' }); 
});

// GET: user logout operation
router.get('/logout', function (req, res, next) { 
    req.logout(); res.redirect('/'); 
});

// POST: user details update operation
router.post('/update', checkAuth, upload.single('userImage'), userController.updateUserDetails);

module.exports = router;
