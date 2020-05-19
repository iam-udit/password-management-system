// Import required modules
var mongoose = require('mongoose');

// Connect to mongoDb database
module.exports.connect = function () {

    try {
        mongoose.connect(
            process.env.DB_URI, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true
            }, (success) => {
                console.log('Database Connected Successfully  !');
            }
        );
    } catch (error) {
        console.log("Initial Database Connectivity Failed !");
        console.log('Error: ' + error.message);
    }

    // Setting up error event
    mongoose.connection.on("error", (error) => {
        console.log('Database Connectivity Failed !');
        console.log('Error: ' + error.message);
    });
    
    mongoose.Promise = global.Promise;
}