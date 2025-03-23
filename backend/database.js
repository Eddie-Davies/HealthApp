// Import and Connect to MongoDB
const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;


mongoose.connect(mongoURI)
    .then(() => console.log('✅ Successfully Connected to MongoDB!'))
    .catch(err => console.log('❌ Error connecting to MongoDB:', err));

// Define User Schema
const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: {
        unique: true,
        type: String
    },
    gender: Boolean,
    weight: Number,
    targetWeight: Number
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
