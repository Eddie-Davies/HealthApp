const mongoose = require('mongoose');

require('dotenv').config();
const mongoURI = process.env.MONGO_URI;

const {
    UserModel,
    FoodModel,
    MealModel,
    ExerciseModel,
    GoalModel,
    GroupModel
} = require('./database');

// To run migration, CD into Backend and then run:
// node migrateDB.js

// Comment out completed migrations, add new migrate functions below:

async function runMigration1() {
    try {
      console.log('✅ Connected to MongoDB (via database.js)');
  
      await UserModel.updateMany({}, {
        $set: {
          meal: [],
          exercise: [],
          goals: []
        }
      });
  
      console.log('✅ Migration complete');
      process.exit(0);
    } catch (err) {
      console.error('❌ Migration failed:', err);
      process.exit(1);
    }
  }
  
//   runMigration1();

async function runMigration2() {
    try {
      console.log('✅ Connected to MongoDB (via database.js)');
  
      await UserModel.updateMany({}, {
        $set: {
          password: null
        }
      });
  
      console.log('✅ Migration complete');
      process.exit(0);
    } catch (err) {
      console.error('❌ Migration failed:', err);
      process.exit(1);
    }
  }

  // runMigration2();

  async function runMigration3() {
    try {
      console.log('✅ Connected to MongoDB (via database.js)');
  
      const users = await UserModel.find({});
      for (const user of users) {
        const recoveryCode = generateCode();
        await UserModel.updateOne({ _id: user._id }, {
          $set: {
        recoveryCode: recoveryCode
          }
        });
      }
  
      console.log('✅ Migration complete');
      process.exit(0);
    } catch (err) {
      console.error('❌ Migration failed:', err);
      process.exit(1);
    }
  }

// runMigration3();