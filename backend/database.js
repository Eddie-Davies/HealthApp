// Import and Connect to MongoDB
const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://aidanleonard:W0qzGd2JBHwEEoYR@softenghealthapp.vzlak.mongodb.net/health-app?retryWrites=true&w=majority';


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }) // useNewUrlParser: true prevents a deprecation warning || useUnifiedTopology: true enables the new MongoDB connection engine, improving stability.
    .then(() => console.log('✅ Connected to MongoDB'))                        // Logs if successfully connected to Database
    .catch(err => console.log('❌ MongoDB Connection Error:', err));

// Define User Schema
const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: String,
    gender: Boolean,
    weight: Number,
    targetWeight: Number
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
