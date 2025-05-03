// Import Express and userModel from database.js
const express = require('express');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { UserModel, GroupModel, FoodModel } = require('./database');
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: __dirname + '/../.env' });

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
const port = 8000;

const envIP = process.env.VITE_IP;
const allowedOrigin = envIP ? `http://${envIP}:3000` : null;
const corsOptions = {
    origin: [
        'http://localhost:3000',
        allowedOrigin
    ].filter(Boolean), // removes null if allowed origin is missing
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

function generateCode() {
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

        res.status(200).json({ message: 'Recovery code sent to email' });

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
        // console.log("User found:", user);

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

        user = { first_name, last_name, email, password_hash: hashedPassword } // password: hashedpassword keeps the correct label.
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

app.get('/groups', authenticateToken, async (req, res) => {
    try {
      const user = await UserModel.findOne({ email: req.user.email }).populate('groups', 'name');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ groups: user.groups }); // Each group will include _id and name
    } catch (error) {
      console.error('Error fetching user groups:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

app.post('/groups/new', authenticateToken, async (req, res) => {
    try {
        const { name, membersByID } = req.body;
        console.log(name)
        if (!name || typeof name !== 'string') {
            return res.status(400).json({ message: 'Group name is required and must be a string.' });
        }

        const existingGroup = await GroupModel.findOne({ name });

        if (existingGroup) {
            return res.status(409).json({ message: 'Group name already exists.' });
        }

        const newGroup = new GroupModel({
            name,
            membersByID
        });

        await newGroup.save();

        res.status(201).json({ message: 'Group created successfully', group: newGroup });
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// CREATES NEW !GROUP! GOAL
app.post('/groups/:groupId/new-goal', authenticateToken, async (req, res) => {
    try {
        const { groupId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(groupId)) {
            return res.status(400).json({ message: 'Invalid group ID format.' });
        }

        const { description, target, progressLabel, remainingLabel, unit, sport, date} = req.body;
        const user = await UserModel.findOne({ email: req.user.email });
        const createdBy = user._id
        
        //validation

        // Validate description
        if (!description) {
            return res.status(400).json({ message: 'Description is required.' });
        }
        if (typeof description !== 'string') {
            return res.status(400).json({ message: 'Description must be a string.' });
        }
        if (description.length < 1 || description.length > 60) {
            return res.status(400).json({ message: 'Description must be between 1 and 60 characters long.' });
        }

        // Validate target
        if (target == null) {
            return res.status(400).json({ message: 'Target is required.' });
        }

        // Validate unit
        if (unit == null) {
            return res.status(400).json({ message: 'Unit is required.' });
        }

        // Validate sport
        if (typeof sport !== 'boolean') {
            return res.status(400).json({ message: 'Sport must be a boolean.' });
        }

        // Validate date
        if (date == null) {
            return res.status(400).json({ message: 'Date is required.' });
        }

        // Validate createdBy
        if (createdBy == null) {
            return res.status(400).json({ message: 'CreatedBy is required.' });
        }

        const group = await GroupModel.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found.' });
        }

        const newGoal = {
            description,
            target,
            unit,
            sport,
            date,
            createdBy
        };

        // Conditionally include optional labels
        if (progressLabel && typeof progressLabel === 'string' && progressLabel.trim() !== '') {
            newGoal.progressLabel = progressLabel;
        }

        if (remainingLabel && typeof remainingLabel === 'string' && remainingLabel.trim() !== '') {
            newGoal.remainingLabel = remainingLabel;
        }


        group.goals.push(newGoal);
        await group.save();

        const addedGoal = group.goals[group.goals.length - 1];

        res.status(201).json({ message: 'Group goal added successfully', goal: addedGoal });
    } catch (error) {
        console.error('Error adding group goal:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// GETS USERS GOALS 
app.get('/goals', authenticateToken, async (req, res) => {
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

// DELETE GOAL BY ID
app.delete('/goals/:id', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const goalId = req.params.id;

        await UserModel.updateOne(
            { _id: userId },
            { $pull: { goals: { _id: new ObjectId(goalId) } } }
        );

        res.status(200).json({ message: "Goal deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete goal" });
    }
});

// ADD NEW GOAL
app.post('/goals/new', authenticateToken, async (req, res) => {
    try {
        const { target, progress, progressLabel, remainingLabel, unit, sport, date, group } = req.body;

        // Validate input
        if (
            typeof target !== 'number' || !Number.isInteger(target) || target <= 0 ||
            typeof progress !== 'number' || !Number.isInteger(progress) || progress < 0 || progress > target ||
            typeof unit !== 'string' || unit.trim() === '' ||
            typeof sport !== 'boolean' ||
            !date
        ) {
            return res.status(400).json({
                message: 'Invalid goal input: target must be an integer > 0, progress must be an integer between 0 and target, and unit must be non-empty.'
            });
        }

        // Find the user
        const user = await UserModel.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create the new goal and save it to the user's goals
        const newGoal = { target, progress, progressLabel, remainingLabel, unit, sport, date, group };
        user.goals.push(newGoal);
        await user.save();

        if (group) {
            // get the desc, use the add new group goal route. Maybe do this in the Goals.vue instead.
        }

        // Respond with the saved goal
        const savedGoal = user.goals[user.goals.length - 1];  // The newly added goal
        res.status(201).json({ message: 'Goal added successfully', goal: savedGoal });

    } catch (error) {
        console.error('Error adding goal:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// UPDATE GOAL BY ID
app.put('/goals/update/:id', authenticateToken, async (req, res) => {
    try {
        const goalId = req.params.id;  // Extract the goalId from the route parameters
        const updatedGoal = req.body;  // Extract the updated goal data from the request body

        // Find the user by the email in the token
        const user = await UserModel.findOne({ email: req.user.email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the goal in the user's goals by id
        const goalIndex = user.goals.findIndex(goal => goal._id.toString() === goalId);

        if (goalIndex === -1) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        // Update goal fields with the updated data
        user.goals[goalIndex] = { ...user.goals[goalIndex]._doc, ...updatedGoal };

        // Save the updated user object with the updated goal
        await user.save();

        // Respond with success and the updated goal
        res.status(200).json({ message: 'Goal updated successfully', goal: user.goals[goalIndex] });
    } catch (error) {
        console.error('Error updating goal:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
//   ACCEPT GOAL: Copies GroupGoal to a users list of Goals
app.post('/goals/accept/:groupId/:goalId', authenticateToken, async (req, res) => {
    try {
        const { groupId, goalId } = req.params;
        const userEmail = req.user.email;

        // Find the group
        const group = await GroupModel.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Find the group goal
        const groupGoal = group.goals.id(goalId);
        if (!groupGoal) {
            return res.status(404).json({ message: 'Group goal not found' });
        }

        // Find the user
        const user = await UserModel.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(groupGoal);
        // Create a copy of the group goal as a local goal
        const copiedGoalObj = groupGoal.toObject();
        const copiedGoal = {
            ...copiedGoalObj,
          sourceGroupId: groupId,
          group: group.name,
          progressLabel: copiedGoalObj.progressLabel?.trim() || "Progress",
          remainingLabel: copiedGoalObj.remainingLabel?.trim() || "Remaining",
          progress: 0
        };

        delete copiedGoal.description;
        delete copiedGoal._id; // Let MongoDB assign a new _id

        user.goals.push(copiedGoal);
        await user.save();

        const newGoal = user.goals[user.goals.length - 1];

        res.status(200).json({ message: 'Group goal accepted and added to user goals', goal: newGoal });
    } catch (err) {
        console.error('Error accepting group goal:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET ALL USER MEALS
app.get('/meals', authenticateToken, async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.user.email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ meals: user.meals});
    } catch (error) {
        console.error('Error fetching meals:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get recent calories (last 24hrs)
app.get('/recent-calories', authenticateToken, async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.user.email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const now = new Date();
        const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);


        let recentCalories = 0;

        for (const meal of user.meals) {
            // Check if the meal is from the last 24 hours
            const mealDate = new Date(meal.date);
            const isMealRecent = mealDate >= twentyFourHoursAgo;

            // If the meal is NOT recent, go to next meal
            if (!isMealRecent) {
                continue;
            }
            
            // Work out calories for this meal
            let caloriesInThisMeal = 0;
            // Sum all calories from each food in meal
            const foodsInMeal = meal.foods || [];
            for (const food of foodsInMeal) {
                const foodCalories = food.calories || 0;
                caloriesInThisMeal += foodCalories;
            }
            
            recentCalories += caloriesInThisMeal;
        }
        res.status(200).json(recentCalories);
    } catch (error) {
        console.error('Error fetching recent calories:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});




// GET MEAL BY ID
app.get('/meals/:id', authenticateToken, async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.user.email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const mealId = req.params.id;
        const meal = user.meals.find(m => m._id.toString() === mealId);

        if (!meal) {
            return res.status(404).json({ message: 'Meal not found' });
        }

        res.status(200).json({ meal });
    } catch (error) {
        console.error('Error fetching meal:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// SAVE MEAL TO USER
app.post('/meals', authenticateToken, async (req, res) => {
    const { mealName, foods, date } = req.body;
    try {
        const user = await UserModel.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newMeal = { mealName, foods, date };
        user.meals.push(newMeal);
        await user.save();

        res.status(201).json({ message: 'Meal saved successfully', meal: newMeal });
    } catch (err) {
        console.error('Error saving meal:', err);
        res.status(500).json({ error: 'Failed to create meal' });
    }
});

// UPDATE MEAL BY ID
app.put('/meals/update/:id', authenticateToken, async (req, res) => {
    try {
        const mealId = req.params.id;  // Extract the mealsId from the route parameters
        const updatedMeal = req.body;  // Extract the updated meal data from the request body

        // Find the user by the email in the token
        const user = await UserModel.findOne({ email: req.user.email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the meal in the user's meals by id
        const mealIndex = user.meals.findIndex(meal => meal._id.toString() === mealId);

        if (mealIndex === -1) {
            return res.status(404).json({ message: 'Meal not found' });
        }

        // Update meal fields with the updated data
        user.meals[mealIndex] = { ...user.meals[mealIndex]._doc, ...updatedMeal };

        // Save the updated user object with the updated meal
        await user.save();

        // Respond with success and the updated meal
        res.status(200).json({ message: 'Meal updated successfully', meal: user.meals[mealIndex] });
    } catch (error) {
        console.error('Error updating meal:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// DELETE MEAL BY ID
app.delete('/meals/:id', authenticateToken, async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.user.email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const mealId = req.params.id;

        await UserModel.updateOne(
            { _id: user._id },
            { $pull: { meals: { _id: new ObjectId(mealId) } } }
        );

        res.status(200).json({ message: 'Meal deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete meal' });
    }
});

// GET FOOD
app.get('/foods', authenticateToken, async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.user.email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ foods: user.foods });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching foods', error: err });
    }
});

// POST FOOD
app.post('/food', authenticateToken, async (req, res) => {
    const { name, calories, isDrink } = req.body;

    if (!name || calories === undefined || isDrink === undefined) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const user = await UserModel.findOne({ email: req.user.email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newFood = { name, calories, isDrink};
        user.foods.push(newFood)
        await user.save()

        res.status(201).json(newFood);
    } catch (err) {
        res.status(500).json({ message: 'Error saving food item', error: err });
    }
});


// DELETE /food/:id - Delete a food item by ID
app.delete('/food/:id', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const foodID = req.params.id;

        await UserModel.updateOne(
            { _id: userId },
            { $pull: { foods: { _id: new ObjectId(foodID) } } }
        );

        res.status(200).json({ message: "Food deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete food" });
    }
});

// Start the server
app.listen(port, '0.0.0.0', () => {
    const prefix = `✨ Node.js server running at `;
    const localURL = `http://localhost:${port}`;
    const networkURL = envIP ? `http://${envIP}:3000` : null;

    console.log(prefix + localURL+('     (For fast development on this device)'));

    if (networkURL) {
        console.log(' '.repeat(prefix.length -2)+'✅ ' + networkURL + ' (Other devices)');
    } else {
        console.error('\x1b[31m%s\x1b[0m',`⚠️  WARNING: Add your computer's IP Address to .env for mobile testing support.`);
    }
});