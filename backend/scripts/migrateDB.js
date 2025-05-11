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
} = require('../database');

// To run migration, CD into Backend/scripts and then run:
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

async function runMigration4() { // adding default usernames as we used emails until now
  try {
    console.log('✅ Connected to MongoDB (via database.js)');

    const users = await UserModel.find({});
    for (const user of users) {
      await UserModel.updateOne({ _id: user._id }, {
        $set: {
      username: user.first_name + user.last_name,
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

// runMigration4();

async function runMigration5() {
  try {
    console.log('✅ Connected to MongoDB (via database.js)');

    const users = await UserModel.find({});
    const defaultDOB = new Date('2005-01-01');

    let updatedCount = 0;

    for (const user of users) {
      if (!user.date_of_birth) {
        try {
          await UserModel.updateOne(
            { _id: user._id },
            { $set: { date_of_birth: defaultDOB } }
          );
          console.log(`Updated user ${user._id} with default DOB`);
          updatedCount++;
        } catch (innerErr) {
          console.error(`❌ Failed to update user ${user._id}:`, innerErr);
        }
      }
    }

    console.log(`✅ Migration complete – ${updatedCount} users updated`);

  } catch (err) {
    console.error('❌ Migration failed:', err);
  }
  finally {
    process.exit(0);
  }
}

// runMigration5();

async function runMigration_setAccountCreationDate() {
  try {
    console.log('✅ Connected to MongoDB (via database.js)');

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const users = await UserModel.find({ accountCreationDate: { $exists: false } });

    for (const user of users) {
      await UserModel.updateOne(
        { _id: user._id },
        {
          $set: {
            accountCreationDate: thirtyDaysAgo
          }
        }
      );
    }

    console.log('✅ Migration complete');
    process.exit(0);
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  }
}

// runMigration_setAccountCreationDate()

async function runMigration6_addGroupInvites() {
  try {
    console.log('✅ Connected to MongoDB (via database.js)');

    const users = await UserModel.find({ groupInvites: { $exists: false } });

    for (const user of users) {
      await UserModel.updateOne(
        { _id: user._id },
        { $set: { groupInvites: [] } }
      );
    }

    console.log(`✅ Migration complete – ${users.length} users updated`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  }
}

// runMigration6_addGroupInvites()
