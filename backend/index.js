const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

mongoose.connect('mongodb://127.0.0.1:27017/health-app')

const UserSchema = mongoose.mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: String,
    gender: Boolean,
    weight: Number,
    targetWeight: Number
})

const UserModel = mongoose.model("users", UserSchema);

app.get("/getUsers", (req, res) =>{
    UserModel.find({}).then(function(users) {
        res.json(users)
    }).catch(function(err){
        console.log(err)
    })
})

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
  });
  

app.listen(port, () => {
    console.log(`✨ Server running at http://localhost:${port} ✨`);
  });

  