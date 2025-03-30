// Import Express and userModel from database.js
const express = require('express');
const UserModel = require('./database');
const cors = require('cors')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || "default_secret"; // Ensure JWT secret exists




const app = express();
const port = 5000;

app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(express.json());

// Fetch Users
app.get("/getUsers", async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Test route
app.get('/', (req, res) => {
    res.send('<h1>Testing index from the backend!</h1>');
});

app.post('/signup', (req, res) => {
    try {
        console.log(res.json())
    } catch (err) {
        console.log(err);
    }
});

app.post('/login', async (req, res) => {
    try {
        console.log('Incoming request to /login:', req.body);

        const { email, password } = req.body;

        // Check if user exists
        const user = await UserModel.findOne({ email });

        if (!user) {
            console.log('User not found');
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Normally, password should be hashed. Plaintext for now to make it easy.
        if (user.password !== password) {
            console.log('Incorrect password');
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        console.log('✅ Login successful, token generated. ');
        res.json({ token });

    } catch (error) {
        console.error('Error in /login route:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`✨ Node.js server running at http://localhost:${port} (backend)`);
});
