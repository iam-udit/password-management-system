// Import required modules
const mongoose = require("mongoose");


// Creating user's schema
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, index: true },
    emailVerified: { type: Boolean, default: false },
    gender: { type: String, required: false },
    age: { type: Number, required: false },
    about: { type: String, required: false },
    address: {
        street: { type: String, required: false },
        state: { type: String, required: false },
        country: { type: String, required: false }
    },
    imageURL: { type: String, required: false },
}, { timestamps: true });


module.exports = mongoose.model("User", userSchema);

