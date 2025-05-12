<template>
  <!-- DIET EDIT -->
  <div v-if="goal.type == 'diet'" class="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
    @click.self="$emit('cancel')">

    <div class="bg-base-200 p-6 rounded-xl w-96 text-center">
      <h2 class="text-lg font-semibold mb-4">{{ editableGoal.progressLabel }}</h2>
      <!-- Value Display -->
      <div v-if="isWeightGoal" class="flex items-baseline justify-center">
        <p class="text-sm opacity-70 mr-1">Current Weight:</p>
        <span class="font-semibold text-lg">{{ weight }}</span>
        <span class="text-sm font-semibold text-neutral/90">{{ editableGoal.unit }}</span>
      </div>

      <div class="flex items-baseline justify-center mb-3">
        <span class="text-sm opacity-70 mr-1">Change by:</span>
        <span class="font-semibold text-lg">{{ sliderDisplay }}</span>
        <span class="text-sm font-semibold text-neutral/90">{{ editableGoal.unit }}</span>
      </div>
      <p>For a total of {{ totalDailyCals }}kcal per day</p>

      <p v-if="dietConfig.note" class="font-semibold text-neutral/75">{{dietConfig.note}}</p>
      <div class="flex flex-col gap-4">




        <!--* Reasonable Calorie Goal *-->
        <div class="collapse bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-1" checked="checked" />
          <div class="collapse-title font-semibold flex items-center">Reasonable {{ dietConfig.goalType.toLowerCase() }}
            target: </div>
          <div class="collapse-content text-sm">
            <!-- only use decimals if its a weight goal, not for calories! -->
            <input type="range" :step="isWeightGoal ? '0.1' : '1'" :min="dietConfig.min"
              :max="dietConfig.max" v-model.number="sliderDisplay" class="w-full" />
          </div>
        </div>
        <div class="collapse bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-1" />
          <div class="collapse-title font-semibold flex items-center">Custom Figure:</div>
          <div class="collapse-content text-sm">
            <input type="number" :step="isWeightGoal ? '0.1' : '1'" :min="dietConfig.min" :max="dietConfig.max"
              v-model.number="sliderDisplay" class="input input-bordered w-20" />
          </div>
        </div>

        <!-- Date Selector and Display -->
        <div class="flex-col items-center justify-center text-center p-5 rounded-2xl bg-base-100">
          <div v-if="isTodaySelected" class="text-sm">Default Deadline (today's Date):</div>
          <div v-else class="text-sm">Deadline currently set to:</div>
          <h1 class="font-semibold text-2xl text-primary">{{ formattedDate }}</h1>
        </div>
        <label class="block text-sm mb-2 pt-2">Override Deadline:</label>
        <input v-model="editableGoal.date" type="date" class="input input-bordered w-full mb-5">
      </div>

      <!-- Action Buttons -->
      <div class="space-x-3 mt-4">
        <button @click="$emit('cancel')" class="btn w-1/4 btn-error btn-soft">
          Back
        </button>
        <button :disabled="!isFormValid" class="btn w-2/4 btn-success"
          @click="$emit('save', editableGoal)">Confirm</button>
      </div>
    </div>
  </div>










  <div v-else class="fixed inset-0 bg-black/90 flex items-center justify-center z-50" @click.self="$emit('cancel')">
    <div class="bg-base-200 p-6 rounded-xl w-80">
      <h2 class="text-lg font-semibold mb-4 text-center">{{ goalTitle }}</h2>
      <div class="min-h-65">
        <div v-if="page === 1">
          <!-- Page 1: Main Info -->
          <label class="block text-sm mb-2">Target</label>
          <input v-model.number="editableGoal.target" :placeholder="goal.target" type="number"
            class="input input-bordered w-full mb-2" />

          <label class="block text-sm mb-2">Progress</label>
          <input v-model.number="editableGoal.progress" :placeholder="goal.progress" type="number"
            class="input input-bordered w-full mb-2" @keyup.enter="isFormValid && $emit('save', editableGoal)" />

          <label class="block text-sm mb-2">Unit</label>
          <input required v-model="editableGoal.unit" :placeholder="goal.unit" type="text"
            class="input input-bordered w-full mb-2" />
        </div>
        <div v-if="page === 2" class="pt-5">
          <!-- Page 2: Labels -->
          <label class="block text-sm mb-2">Progress Label</label>
          <input v-model="editableGoal.progressLabel" type="text" placeholder="Progress Label (e.g. Eaten)"
            class="input input-bordered w-full mb-2" />

          <label class="block text-sm mb-2">Target Label</label>
          <input v-model="editableGoal.remainingLabel" type="text" placeholder="Remaining Label (e.g. Left)"
            class="input input-bordered w-full mb-10" />


        </div>
        <div v-if="page === 3" class="pt-7">
          <!-- Page 3: Date -->
          <div class="flex-col items-center justify-center text-center p-5 rounded-3xl bg-base-100">
            <div v-if="isTodaySelected" class="text-sm">Default Deadline (today's Date):</div>
            <div v-else class="text-sm">Deadline currently set to:</div>
            <h1 class="font-semibold text-2xl text-primary">{{ formattedDate }}</h1>
          </div>
          <label class="block text-sm mb-2 pt-11">Override Deadline:</label>
          <input v-model="editableGoal.date" type="date" class="input input-bordered w-full mb-2">

        </div>
      </div>
      <div class="flex justify-center gap-2 my-10">
        <button class="btn btn-md" :class="{ 'btn-outline btn-soft btn-primary': page === 1, 'btn-ghost': page !== 1 }"
          @click="page = 1">
          Goal Info
        </button>
        <button class="btn btn-md"
          :class="{ 'btn-outline btn-soft btn-secondary': page === 2, 'btn-ghost': page !== 2 }" @click="page = 2">
          Labels
        </button>
        <button class="btn btn-md" :class="{ 'btn-outline btn-soft btn-accent': page === 3, 'btn-ghost': page !== 3 }"
          @click="page = 3">
          Deadline
        </button>
      </div>

      <!-- Footer group goal warning (only on edit) -->
      <div v-if="!isNew && goal.group" class="text-center mt-4 py-5">
        <div class="text-sm text-warning inline">
          <i class="fa-solid fa-triangle-exclamation mr-2"></i>
          <span>Changes to this goal won't update for other group members.</span>
        </div>
      </div>

      <div class="flex justify-between mt-4" @click.self="$emit('cancel')">
        <button v-if="!isNew" class="btn btn-error" @click="$emit('confirm-delete', editableGoal)">Delete</button>
        <div v-else class="invisible btn btn-error">Placeholder</div>
        <div class="space-x-2">
          <button class="btn btn-ghost" @click="$emit('cancel')">Cancel</button>
          <button :disabled="!isFormValid" class="btn btn-success" @click="$emit('save', editableGoal)">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import axios from 'axios';

  export default {
    name: 'GoalEdit',
    props: {
      goal: Object,
      isNew: {
        type: Boolean,
        default: false
        }
    },
    
    data() {
      return {
        editableGoal: { ...this.goal }, // clone to allow canceling
        page: 1,
        sliderValue: 0,
        weight: 0,
        targetWeight: 0,
        targetCalories: 2200,
        kcalIntake: 0,
        date: null
      };
      
    },

    // Disable scrolling, and leave room for it to stop page jittering.
    async mounted() {
      try {
        const res = await axios.get('/kcal-intake')
        this.kcalIntake = res.data;
        console.log('Kcal Intake Reccommendation:', this.kcalIntake)
      } catch (err) {
        console.error('Error fetching groups:', err.response?.data)
      }
      try {
        const res = await axios.get('/weights');
        const weights = res.data;
        this.weight = weights.weight
        console.log(this.weight);
      } catch (err) {
        console.error('Error fetching user weight:', err.response?.data || err.message);
      }
      
        this.$nextTick(() => {
          if (this.isNew){
            this.sliderDisplay = this.dietConfig.startingVal; 
          } else {
            this.sliderDisplay = this.editableGoal.target; 
          }
    // Set the initial value for the slider
    console.log('Initial sliderValue set:', this.sliderValue);
  });
      
       

      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.marginRight = `${scrollBarWidth}px`;
    },

    beforeUnmount() {
        document.documentElement.style.overflow = '';
        document.documentElement.style.marginRight = '';
    },

    computed: {
sliderDisplay: {
    get() {
      if (this.isWeightGoal) {
        return Math.round(this.targetWeight * 10) / 10;  // 1 decimal point for weight goals
      } else if (this.isCalorieGoal) {
        return this.targetCalories; // Show total calories (no decimal for calorie goals)
      }
    },
    set(newVal) {
      if (this.isWeightGoal) {
        this.targetWeight = Math.round(newVal * 10) / 10; // Set with 1 decimal point for weight goals
      } else if (this.isCalorieGoal) {
        this.targetCalories = Math.round(newVal); // Set total calories (rounded to nearest whole number)
      }
      console.log(this.targetWeight || this.targetCalories);
    }
  },

    isCalorieGoal() {
      return (this.dietConfig.goalType == 'Calorie Deficit' || this.dietConfig.goalType == 'Calorie Surplus')

    },
    isWeightGoal() {
      return (this.dietConfig.goalType == 'Weight Gain' || this.dietConfig.goalType == 'Weight Loss') 
    },
      totalDailyCals() {
        if (this.dietConfig.goalType == 'Calorie Deficit') {
          return this.kcalIntake - this.sliderDisplay
        }
        else if (this.dietConfig.goalType == 'Calorie Surplus') {
          return this.kcalIntake + this.sliderDisplay 
        }
        
      },
    weightLoss() {
    return this.weight - this.targetWeight;
  },


      dietConfig() {
        const dietGoalChoice = this.editableGoal.progressLabel;
        let config = {};

        if (dietGoalChoice === 'Eat Less Calories') {
          console.log('calorie deficit located')
          config = {
            min: 0,
            max: 500, // later replace with daily calories dynmaiclly loaded
            goalType: 'Calorie Deficit',
            startingVal: 300,
            note: '(every 24hrs)'
          };
        } else if (dietGoalChoice === 'Eat More Calories') {
          config = {
            min: 0,
            max: 500,
            goalType: 'Calorie Surplus',
            startingVal: 300,
            note: '(every 24hrs)'
          };
        } else if (dietGoalChoice === 'Lose Weight') {
          config = {
            min: 0,
            max: this.weight,
            goalType: 'Weight Loss',
            startingVal: Math.floor(this.weight / 8)
          };
        } else if (dietGoalChoice === 'Gain Weight') {
          // Present weight to be gained as target (startingVal = weight / 2)
          config = {
            min: 0,
            max: Math.ceil(this.weight),
            goalType: 'Weight Gain',
            startingVal: Math.floor(this.weight / 8)
          };
        } else {
          config = {
            min: 0,
            max: 1000,
            goalType: 'INVALID',
            startingVal: 0
          };
        }

        // Assign the starting value to sliderValue
        this.sliderValue = config.startingVal;
        console.log('slider value:' , this.sliderValue)
        this.sliderValue = config.startingVal;
        if (this.isNew && this.editableGoal.type == 'diet') {
        this.editableGoal.target = config.startingVal

        }
        this.targetCalories = config.startingVal;

        // Return the configuration object
        return config;
      },
        goalTitle() {
            if (this.isNew) {
            return this.goal.group ? 'Create New Group Goal' : 'Create New Goal';
            } else {
            return this.goal.group ? 'Edit Group Goal' : 'Edit Goal';
            }
        },
        isTodaySelected() {
            if (!this.editableGoal.date) return false;
    
            const today = new Date();
            const selectedDate = new Date(this.editableGoal.date);
            
            return today.getFullYear() === selectedDate.getFullYear() &&
                today.getMonth() === selectedDate.getMonth() &&
                today.getDate() === selectedDate.getDate();
        },
        isFormValid() {
          if (this.editableGoal.type === 'diet') {
            switch (this.dietConfig.goalType) {
              case 'Weight Loss':
                console.log('Editable goal target (weight loss)' , this.editableGoal.target)
                return this.editableGoal.target > 0;
              case 'Weight Gain':
                return this.editableGoal.target > 0;
              case 'Calorie Deficit':
              if (this.totalDailyCals <= 0) {
                return false;
              }
                return this.editableGoal.target > 0;
              case 'Calorie Surplus':
                return this.editableGoal.target > 0 && this.totalDailyCals > this.kcalIntake;

              default:
                return false;
            }
          }

            // form checks: progress must be lower or same as target; both numbers must be more than zero and integers; 
          const isInt = val => Number.isInteger(val);
          console.log(this.isWeightGoal)
          return (
            this.editableGoal.unit.trim() &&
            (this.isWeightGoal || (isInt(this.editableGoal.target) && this.editableGoal.target > 0)) &&
            (this.isWeightGoal || (isInt(this.editableGoal.progress) && this.editableGoal.progress >= 0)) &&
            this.editableGoal.progress <= this.editableGoal.target
          );

        },
        parsedDate() {
            const parsed = new Date(this.editableGoal.date);
            return isNaN(parsed.getTime()) ? new Date() : parsed; // fallback if invalid
        },
        formattedDate() {
            const date = this.parsedDate;
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }
    },
          watch: {
        sliderDisplay() {
          // update the target based on the value of the slider.
          if (this.isWeightGoal) { 
            console.log('weight goal dtected')
            this.editableGoal.target = this.sliderDisplay
          }
          else if (this.isCalorieGoal) {
            console.log('calorie goal dtected')
            this.editableGoal.target = this.sliderDisplay
            console.log('fdfd')
            console.log(this.editableGoal.target, this.kcalIntake)
          }
        }},
  };
  </script>
