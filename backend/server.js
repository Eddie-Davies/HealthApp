// backend/server.js

const express = require('express');
const connectDB = require('./database');  // Import the connection function

const app = express();
const port = 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());  // Middleware to parse JSON bodies

// Example route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Start the server
app.listen(port, () => {
  console.log(`✨ Server running at https://localhost:${port} ✨`);
});
