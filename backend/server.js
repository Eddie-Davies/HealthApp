// Import Express and userModel from database.js
const express = require('express');
const UserModel = require('./database'); 
const cors = require('cors')




const app = express();
const port = 5000;

app.use(cors({
    origin: 'http://localhost:3000'
}))

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
    } catch (err){
        console.log(err);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`✨ Node.js server running at http://localhost:${port} (backend)`);
});
