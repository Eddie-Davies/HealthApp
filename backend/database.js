// Import and Connect to MongoDB
const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../.env' });
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
    target: Number,
    progress: Number,
    progressLabel: String,
    remainingLabel: String,
    unit: String,
    sport: Boolean, // false = food or other
    date: { type: Date, default: Date.now },
    group: {type: String, default: null},
    sourceGroupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }
  });
  

// User Schema
const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number, required: false },
    email: { type: String, unique: true, required: true },
    password_hash: { type: String, required: true }, // Added password field
    gender: Boolean,
    weight: Number,
    targetWeight: Number,
    recoveryCode: String,
    meal: [MealSchema],
    exercise: [ExerciseSchema],
    goals: [GoalSchema],
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }]
});
const GroupGoalSchema = new mongoose.Schema({
    target: Number,
    progressLabel: String,
    remainingLabel: String,
    description: String, // for when you receive an email. We will force users to describe the goal they share.
    unit: String,
    sport: Boolean, // false = food or other
    date: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
})

// Group Schema
const GroupSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true
    },
    membersByID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    goals: [GroupGoalSchema]
  });



// Models
const FoodModel = mongoose.model("Food", FoodSchema);
const MealModel = mongoose.model("Meal", MealSchema);
const ExerciseModel = mongoose.model("Exercise", ExerciseSchema);
const GoalModel = mongoose.model("Goal", GoalSchema);
const UserModel = mongoose.model("User", UserSchema);
const GroupModel = mongoose.model("Group", GroupSchema);
const GroupGoal = mongoose.model("GroupGoal", GroupGoalSchema);


module.exports = {
    FoodModel,
    MealModel,
    ExerciseModel,
    GoalModel,
    UserModel,
    GroupModel,
    GroupGoal
};
