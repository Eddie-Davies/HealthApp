// Import and Connect to MongoDB
const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;


mongoose.connect(mongoURI)
    .then(() => console.log('✅ Successfully Connected to MongoDB!'))
    .catch(err => console.log('❌ Error connecting to MongoDB:', err));

// Define User Schema
const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number, required: false },
    email: { type: String, unique: true, required: true },
    password_hash: { type: String, required: true }, // Added password field
    gender: Boolean,
    weight: Number,
    targetWeight: Number
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
