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

// admin Tools

// deleteUser (not authed)
// This route is for deleting a user by email. It does not require authentication.
//Example use: http://localhost:5000/deleteUser/test@example.com
app.delete('/deleteUser/:email', async (req, res) => {
    try {
        const email = req.params.email;

        if (!email) {
            return res.status(400).json({ message: 'Email is required in URL parameter' });
        }

        const deletedUser = await UserModel.findOneAndDelete({ email: email.toLowerCase().trim() });

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log(`User with email ${email} deleted.`);
        res.json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// deleteAllUsers (not authed)
// This route is for deleting all users from the database. It does not require authentication.
app.get('/deleteAllUsers', async (req, res) => {
    try {
        const result = await UserModel.deleteMany({});
        console.log(`All users deleted. Count: ${result.deletedCount}`);
        res.json({ message: 'All users deleted successfully', deletedCount: result.deletedCount });
    } catch (error) {
        console.error('Error deleting all users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Fetch Users (not authed)
// This route is for fetching all users. It does not require authentication.
app.get("/getUsers", async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Fetch User by Email (not authed)
// This route is for fetching a user by email. It does not require authentication.
// Example use: http://localhost:5000/getUserByEmail?email=test@example.com
app.get('/getUserByEmail', async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await UserModel.findOne({ email: email.toLowerCase().trim() });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//--------------------------------------------------------------------------------------------------------------------

// Test route
app.get('/', (req, res) => {
    res.send('<h1>Testing index from the backend!</h1>');
});

app.post('/signup', async (req, res) => {
    try {
        let { first_name, last_name, email, password } = req.body;

        first_name = first_name?.trim();
        last_name = last_name?.trim();
        email = email?.toLowerCase().trim();
        password = password?.trim();

        const errors = [];

        if (!first_name || !/^[a-zA-Z]{2,30}$/.test(first_name)) {
            errors.push("First name must be between 2 and 30 alphabetic characters.");
        }
        if (!last_name || !/^[a-zA-Z]{2,30}$/.test(last_name)) {
            errors.push("Last name must be between 2 and 30 alphabetic characters.");
        }
        if (!email || !/^[^\s@]+@[^\s@]+$/.test(email)) {
            errors.push("Invalid email format.");
        }
        if (!password || !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
            errors.push("Password must be at least 8 characters long and contain at least one number, one lowercase letter, and one uppercase letter.");
        }

        // Return validation errors if any
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }



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

app.get('/user/goals', authenticateToken, async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.user.email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ goals: user.goals });
    } catch (error) {
        console.error('Error fetching user goals:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.delete('/user/goals/:id', authenticateToken, async (req, res) => {
    try {
      const goalId = req.params.id;
      console.log(goalId)
  
      const user = await UserModel.findOne({ email: req.user.email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const originalLength = user.goals.length;
  
      // Remove the goal with matching _id
      user.goals = user.goals.filter(goal => goal._id.toString() !== goalId);
  
      if (user.goals.length === originalLength) {
        return res.status(404).json({ message: 'Goal not found' });
      }
  
      await user.save();
  
      res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (error) {
        console.error('Error deleting goal:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

app.post('/user/newgoal', authenticateToken, async (req, res) => {
    try {
        
        const { target, progress, progressLabel, remainingLabel, unit, sport, date, groups } = req.body;

        if (typeof sport !== 'boolean' || !target || progress === undefined || !date) {
            return res.status(400).json({ message: 'Missing or invalid goal fields' });
        }

        const user = await UserModel.findOne({ email: req.user.email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newGoal = {
            target, progress, progressLabel, remainingLabel, unit, sport, date, groups
        };

        user.goals.push(newGoal);
        await user.save();
        const savedGoal = user.goals[user.goals.length - 1];  // The new goal should be the last one added

        res.status(201).json({ message: 'Goal added successfully', goal: savedGoal });  // Return the saved goal including _id
    } catch (error) {
        console.error('Error adding goal:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.put('/user/updateGoal/:id', authenticateToken, async (req, res) => {
    try {
      const goalId = req.params.id;
      const updatedGoal = req.body;
  
      const user = await UserModel.findOne({ email: req.user.email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find the goal by id
      const goalIndex = user.goals.findIndex(goal => goal._id.toString() === goalId);
  
      if (goalIndex === -1) {
        return res.status(404).json({ message: 'Goal not found' });
      }
  
      // Update goal fields
      user.goals[goalIndex] = { ...user.goals[goalIndex]._doc, ...updatedGoal };
  
      await user.save();
  
      res.status(200).json({ message: 'Goal updated successfully', goal: user.goals[goalIndex] });
    } catch (error) {
      console.error('Error updating goal:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

// Start the server
app.listen(port, () => {
    console.log(`✨ Node.js server running at http://localhost:${port} (backend)`);
});
