// Import Express and userModel from database.js
const express = require('express');
const UserModel = require('./database');
const cors = require('cors')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || "default_secret"; // Ensure JWT secret exists




const app = express();
const port = 5000;

app.use(cors({ // This is needed because frontend and backend are on different urls.
    origin: 'http://localhost:3000'
}))
app.use(express.json());


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Forbidden: Invalid token' });

        req.user = user; // Add user data to request
        next();
    });
};

app.get('/user', authenticateToken, async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.user.email });
        console.log("User found:", user);

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

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

app.post('/signup', async (req, res) => {
    try {
        console.log('Incoming request to /signup:', req.body);
        const { first_name, last_name, email, password } = req.body;
        const user = { first_name, last_name, email, password };

        // Check if email is already in database.
        const emailInDB = await UserModel.findOne({ email });
        if (emailInDB) {
            console.log('User already has an account! ');
            return res.status(401).json({ message: `This email (${email}) is already associated with an account.` });
        }

        const newUser = await UserModel.insertOne(user);
        console.log(`User (${email}) added to database.`);
        return res.status(201).json({ message: "User registered successfully!", user: newUser });
    } catch (err) {
        console.log("Error during signup:", err);
        return res.status(500).json({ message: "Internal Server Error" });
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
