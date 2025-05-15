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

async function runMigration1() { // add default values to meal, exercise and goals
    try {
      console.log('Connected to MongoDB (via database.js)');
  
      await UserModel.updateMany({}, {
        $set: {
          meal: [],
          exercise: [],
          goals: []
        }
      });
  
      console.log('Migration complete');
      process.exit(0);
    } catch (err) {
      console.error('Migration failed:', err);
      process.exit(1);
    }
  }
  
//   runMigration1();

async function runMigration2() { //set password for all users to null
    try {
      console.log('Connected to MongoDB (via database.js)');
  
      await UserModel.updateMany({}, {
        $set: {
          password: null
        }
      });
  
      console.log('Migration complete');
      process.exit(0);
    } catch (err) {
      console.error('Migration failed:', err);
      process.exit(1);
    }
  }

  // runMigration2();

  async function runMigration3() { // add recovery code to all users
    try {
      console.log('Connected to MongoDB (via database.js)');
  
      const users = await UserModel.find({});
      for (const user of users) {
        const recoveryCode = generateCode();
        await UserModel.updateOne({ _id: user._id }, {
          $set: {
        recoveryCode: recoveryCode
          }
        });
      }
  
      console.log(' Migration complete');
      process.exit(0);
    } catch (err) {
      console.error(' Migration failed:', err);
      process.exit(1);
    }
  }

// runMigration3();

async function runMigration4() { // adding default usernames as we used emails until now
  try {
    console.log(' Connected to MongoDB (via database.js)');

    const users = await UserModel.find({});
    for (const user of users) {
      await UserModel.updateOne({ _id: user._id }, {
        $set: {
      username: user.first_name + user.last_name,
        }
      });
    }

    console.log(' Migration complete');
    process.exit(0);
  } catch (err) {
    console.error(' Migration failed:', err);
    process.exit(1);
  }
}

// runMigration4();

async function runMigration5() { // adding default date_of_birth to all users
  try {
    console.log(' Connected to MongoDB (via database.js)');

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
          console.error(` Failed to update user ${user._id}:`, innerErr);
        }
      }
    }

    console.log(` Migration complete – ${updatedCount} users updated`);

  } catch (err) {
    console.error(' Migration failed:', err);
  }
  finally {
    process.exit(0);
  }
}

// runMigration5();

async function runMigration_setAccountCreationDate() { // adding default accountCreationDate to all users
  try {
    console.log(' Connected to MongoDB (via database.js)');

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

    console.log(' Migration complete');
    process.exit(0);
  } catch (err) {
    console.error(' Migration failed:', err);
    process.exit(1);
  }
}

// runMigration_setAccountCreationDate()

async function runMigration6_addGroupInvites() { // adding default groupInvites to all users
  try {
    console.log(' Connected to MongoDB (via database.js)');

    const users = await UserModel.find({ groupInvites: { $exists: false } });

    for (const user of users) {
      await UserModel.updateOne(
        { _id: user._id },
        { $set: { groupInvites: [] } }
      );
    }

    console.log(` Migration complete – ${users.length} users updated`);
    process.exit(0);
  } catch (err) {
    console.error(' Migration failed:', err);
    process.exit(1);
  }
}

async function runMigration7_convertSportToType() { // convert sport to type in goals
    try {
        console.log(' Connected to MongoDB');

        // --- USER GOALS ---
        const users = await UserModel.find({ "goals.sport": { $exists: true } });
        let userGoalsUpdated = 0;

        for (const user of users) {
            let updated = false;

            for (const goal of user.goals) {
              console.log(user.first_name, goal.sport, goal.progressLabel)
                for (const goal of user.goals) {
    if (goal.sport !== undefined) {
        goal.type = goal.sport === true ? 'sport' : 'other';
        goal.set('sport', undefined, { strict: false });
        goal.markModified('sport');
        updated = true;
    }
}

            }

            if (updated) {
                // Fix potential validation issues
                for (const meal of user.meals || []) {
                    if (Array.isArray(meal.mealName)) {
                        meal.mealName = meal.mealName.join(', ');
                    }
                }

                try {
                    await user.save();
                    userGoalsUpdated++;
                } catch (err) {
                    console.warn(`⚠️ Skipped user ${user._id} due to validation error:`, err.message);
                }
            }
        }

        // --- GROUP GOALS ---
        const groups = await GroupModel.find({ "goals.sport": { $exists: true } });
        let groupGoalsUpdated = 0;

        for (const group of groups) {
            let updated = false;

            for (const goal of group.goals) {
for (const goal of user.goals) {
    if (goal.sport !== undefined) {
        goal.type = goal.sport === true ? 'sport' : 'other';
        goal.set('sport', undefined, { strict: false });
        goal.markModified('sport');
        updated = true;
    }
}

            }

            if (updated) {
                try {
                    await group.save();
                    groupGoalsUpdated++;
                } catch (err) {
                    console.warn(`⚠️ Skipped group ${group._id} due to validation error:`, err.message);
                }
            }
        }

        console.log(` Migration complete: ${userGoalsUpdated} users and ${groupGoalsUpdated} groups updated`);
        process.exit(0);

    } catch (err) {
        console.error(' Migration failed:', err);
        process.exit(1);
    }
}

runMigration7_convertSportToType();


// runMigration6_addGroupInvites()
