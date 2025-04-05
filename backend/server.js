// Import Express and userModel from database.js
const express = require('express');
const { UserModel } = require('./database');
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || "default_secret"; // Ensure JWT secret exists
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS
const EMAIL_PASSWORD = process.env.EMAIL_NODEMAILER_PASSWORD

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: EMAIL_ADDRESS,
        pass: EMAIL_PASSWORD,
    },
});


const app = express();
const port = 5000;

app.use(cors({ // This is needed because frontend and backend are on different urls.
    origin: 'http://localhost:3000'
}))
app.use(express.json());

function generateCode(){
    recoveryCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit recovery code
    return recoveryCode;
  }

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Get token from headers.

    if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Forbidden: Invalid token' });

        req.user = user; // Add user data to request
        next();
    });
};

app.post('/forgotPassword', async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        // console.log("User found:", user);

        let recoveryCode = generateCode();
        await UserModel.updateOne({ email: req.body.email }, { recoveryCode: recoveryCode });

        if (!user) return res.status(404).json({ message: 'User not found' });

        try {
            const email = user.email;
            await transporter.sendMail({
                from: `"RESET PASSWORD" ${EMAIL_ADDRESS}`, // sender address
                to: email, // list of receivers
                subject: "RESET PASSWORD", // Subject line
                text: `Here is your recovery code: ${recoveryCode}. Sincerely the Blossom Dev team.`, // plain text body

            });
        } catch (error) {
            console.error("An error occurred while sending alert emails:", error);
            res.status(500).send("An error occurred while sending alert emails");
        }

        res.status(200).json({ message: 'Recovery code sent to email'});

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/newPassword', async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        reqCode = req.body.code;
        reqnewpassword = req.body.newpassword;

        if (!user) return res.status(404).json({ message: 'User not found' });

        recoveryCode = user.recoveryCode;

        console.log(reqCode, " ", recoveryCode);

        if (reqCode == recoveryCode) {
            newPassword = await bcrypt.hash(reqnewpassword, 10);
            await UserModel.updateOne({ email: req.body.email }, { password_hash: newPassword });
            console.log("Password updated successfully.");
            let recoveryCode = null;
            await UserModel.updateOne({ email: req.body.email }, { recoveryCode: recoveryCode });
            console.log("Recovery code updated successfully.");
            res.status(200).json({ message: 'Password updated successfully' });
        } else if (reqCode != recoveryCode) {
            return res.status(401).json({ message: 'Invalid recovery code' });
        }
        else {
            return res.status(401).json({ message: 'Unknown Error' });
        }


    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

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

// Fetch Users - To remove before Release so no route exists to show user information even with or without auth.
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
        let { first_name, last_name, email, password } = req.body;
        email = email.toLowerCase().trim();

        console.log(`Incoming request to /signup: Email: ${email}`);
        // Check if email is already in database.
        const emailInDB = await UserModel.findOne({ email });
        if (emailInDB) {
            console.log('User already has an account! ');
            return res.status(401).json({ message: `This email (${email}) is already associated with an account.` });
        }

        // Hash Password before storing
        const hashedPassword = await bcrypt.hash(password, 10)

        user = {first_name, last_name, email, password_hash: hashedPassword} // password: hashedpassword keeps the correct label.
        const newUser = await UserModel.create(user);

        console.log(`User (${email}) added to database.`);
        return res.status(201).json({ message: "User registered successfully!", user: newUser });
    } catch (err) {
        console.log("Error during signup:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`Incoming request to /login: Email: ${email}`);

        // Check if user exists
        const user = await UserModel.findOne({ email });

        if (!user) {
            console.log('User not found');
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const passwordCorrect = await bcrypt.compare(password, user.password_hash)
        if (!passwordCorrect) {
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
