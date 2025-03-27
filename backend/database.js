// Import and Connect to MongoDB
const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;


mongoose.connect(mongoURI)
    .then(() => console.log('✅ Successfully Connected to MongoDB!'))
    .catch(err => console.log('❌ Error connecting to MongoDB:', err));
    
// Food Schema
const FoodSchema = new mongoose.Schema({
    name: String,
    calories: Number,
    isDrink: Boolean
});

// Meal Schema
const MealSchema = new mongoose.Schema({
    mealType: [String], // e.g., ["Dinner", "Breakfast"]
    food: FoodSchema,
    date: Date
});

// Exercise Schema
const ExerciseSchema = new mongoose.Schema({
    title: String,
    type: String,
    quantity: Number,
    unit: String,
    date: Date,
    time: Date
});

// Goal Schema
const GoalSchema = new mongoose.Schema({
    name: String,
    type: Boolean, // true = Food, false = Sport
    target: Number,
    current: Number,
    endDate: Date
});

// User Schema
const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: {
        type: String,
        unique: true
    },
    password: String,
    gender: Boolean, // true = Male, false = Female
    weight: Number,
    targetWeight: Number,
    meal: [MealSchema],
    exercise: [ExerciseSchema],
    goals: [GoalSchema]
});

// Group Schema
const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    membersByID: [mongoose.Schema.Types.ObjectId], // Reference to User IDs
    goal: [GoalSchema]
});

// Models
const FoodModel = mongoose.model("Food", FoodSchema);
const MealModel = mongoose.model("Meal", MealSchema);
const ExerciseModel = mongoose.model("Exercise", ExerciseSchema);
const GoalModel = mongoose.model("Goal", GoalSchema);
const UserModel = mongoose.model("User", UserSchema);
const GroupModel = mongoose.model("Group", GroupSchema);

module.exports = {
    FoodModel,
    MealModel,
    ExerciseModel,
    GoalModel,
    UserModel,
    GroupModel
};
