// Import required modules
var mongoose = require('mongoose');
var User = require('../models/user');
var createError = require('http-errors');


// Get user details by userID
exports.getUserDetails = async function (userId) {

    try {
        // Return user details
        return await User.findById(userId);
   } catch (error) {
        // If any error occur, return error response
        return createError(500, error.message);
   }
};

// Google auth callback/ user singup & login operation
exports.userSignIn = async function (profile) {

    // Get userdata from profile
    let userData = profile._json;
    
    try {

        // Get user-details from db
        let currentUser = await User.findOne({ email: userData.email });
        
        if (!currentUser) {
            // If user not exists, then register user
            let user = new User({
                _id: new mongoose.Types.ObjectId,
                firstName: userData.given_name,
                lastName: userData.family_name,
                email: userData.email,
                emailVerified: userData.email_verified,
                gender: userData.gender,
                age: userData.age,
                imageURL: userData.picture 
            });
            
            // Save user-data in db
            let newUser = await user.save();

            return newUser;

        } else {

            // If user exists, then return current user deatails
            return currentUser;
        }

    } catch (error) {        
        // If any error occur, return error response
        return createError(500, error.message);
    }
};

// Update user details operation
exports.updateUserDetails = function (req, res, next) {
    
    // Create update options
    let updateOps = {
        firstName: req.body.firstName || req.user.firstName,
        lastName: req.body.lastName || req.user.lastName,
        gender: req.body.gender || req.user.gender,
        age: req.body.age || req.user.age,
        about: req.body.about || req.user.about,
        address: {
            street: req.body.street || req.user.address.street,
            state: req.body.state || req.user.address.state,
            country: req.body.country || req.user.address.country,
        },
        imageURL: (req.file) ? req.file.path.replace('public', '') : req.user.imageURL
    };
    
    // Save changes on db
    User.updateOne({ _id: req.user._id }, { $set: updateOps })
    .then((result) => {

        if (result.nModified > 0) { 

            // Create success message
            let successMessage = '<div class="alert alert-success text-center mb-0 mt-2" role="alert">Profile updated successfully</div>';  
            // If update successfully, return success response
            res.render('profile', { title: 'PMS | Profile', user: updateOps, message: successMessage  });

        } else {
            
            // Create error message
            let errorMessage = '<div class="alert alert-danger text-center mb-0 mt-2" role="alert">Profile update failed</div>'; 
            // If update failed, return error response
            res.render('profile', { title: 'PMS | Profile', message: errorMessage }); 
        }
    })
    .catch((error) => {
        // If any error occur, return error response
        res.render('profile', { title: 'PMS | Profile', error: 'Profile update failed' }); 
    });
};
