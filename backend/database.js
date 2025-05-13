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
    mealName: {
        type: String,
        required: true
    },
    foods: [FoodSchema],
    date: {
        type: Date,
        default: Date.now
    }
});

// Activity Type Schema
const ActivityTypeSchema = new mongoose.Schema({
    name: String,
    unit: String,
});

// Activity Schema
const ActivitySchema = new mongoose.Schema({
    activityType: [ActivityTypeSchema],
    quantity: Number,
});

// Exercise Schema
const ExerciseSchema = new mongoose.Schema({
    exerciseName: String,
    activities: [ActivitySchema],
    durationMs: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

// Goal Schema
const GoalSchema = new mongoose.Schema({
    target: Number,
    progress: Number,
    progressLabel: String,
    remainingLabel: String,
    unit: String,
    trackFrom: {type: Number, default: null},
    type: String,
    time: String,
    date: { type: Date, default: Date.now },
    createdDate: { type: Date, default: Date.now},
    group: { type: String, default: null },
    sourceGroupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }
});


// User Schema
const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    date_of_birth: { type: Date },
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password_hash: { type: String, required: true },
    firstLogin: { type: Boolean, default: true },
    gender: Boolean, // true = male, false = female
    weight: Number,
    dailyCalorieIntake: Number,
    bmi: Number,
    height: Number,
    targetWeight: Number,
    recoveryCode: String,
    emailCode: String,
    newEmail: String,
    meals: [MealSchema],
    foods: [FoodSchema],
    exercises: [ExerciseSchema],
    activities: [ActivitySchema],
    activityTypes: [ActivityTypeSchema],
    goals: [GoalSchema],
    accountCreationDate: { type: Date, required: true, default: Date.now },
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
    groupInvites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }]
});

const GroupGoalSchema = new mongoose.Schema({
    target: Number,
    progressLabel: String,
    remainingLabel: String,
    description: String, // for when you receive an email. We will force users to describe the goal they share.
    unit: String,
    type: String,
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
const ActivityTypeModel = mongoose.model("ActivityType", ActivityTypeSchema)
const ActivityModel = mongoose.model("Activity", ActivitySchema);
const ExerciseModel = mongoose.model("Exercise", ExerciseSchema);
const GoalModel = mongoose.model("Goal", GoalSchema);
const UserModel = mongoose.model("User", UserSchema);
const GroupModel = mongoose.model("Group", GroupSchema);
const GroupGoal = mongoose.model("GroupGoal", GroupGoalSchema);

module.exports = {
    FoodModel,
    MealModel,
    ActivityTypeModel,
    ActivityModel,
    ExerciseModel,
    GoalModel,
    UserModel,
    GroupModel,
    GroupGoal
};
