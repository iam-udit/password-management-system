// Import all required packages
const fs = require("fs");
const multer = require("multer");
const mkdirp = require("mkdirp");


// Providing destination, filename to multer
var storage = multer.diskStorage({

    // Providing destination path
    destination : (req, file, cb) => {

        // Creating target directories
        let dir = `public/uploads/${req.user._id}`;
        
        // If image is present then unlink
        fs.unlinkSync('public' + req.user.imageURL);

        // Creating the new dir
        mkdirp.sync(dir);

        cb(null,dir);
    },

    // Providing file name
    filename : (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname );
    }
});

// Prevent unwanted files, accepting only jpeg,png,jpg and gif
const fileFilter = function (req, file, cb) {
    if(
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/gif'
    ){
        // If condition satisfied, allow to upload
        cb(null, true);
    }else{
        // If condition does not satisfied, don't allow to upload
        cb(null, false);
    }
};

// Store image using multer
module.exports = multer({
    storage : storage,
    limits : { fileSize : 1024 * 1024 },
    fileFilter : fileFilter
});
