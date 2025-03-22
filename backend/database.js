const mongoose = require('mongoose');

// MongoDB connection string (replace with your MongoDB Atlas connection string if using Atlas)
const mongoURI = "mongodb://localhost:27017/healthdb";  // for local MongoDB
// const mongoURI = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/yourDatabaseName?retryWrites=true&w=majority"; // for MongoDB Atlas

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✨ Connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to MongoDB:', err);
  });

module.exports = connect;  // Export the connectDB function