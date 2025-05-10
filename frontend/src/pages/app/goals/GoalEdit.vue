<template>
  <div v-if="goal.sport" class="fixed inset-0 bg-black/90 flex items-center justify-center z-50" @click.self="$emit('cancel')">
    
    <div class="bg-base-200 p-6 rounded-xl w-96 text-center">
      <h2 class="text-lg font-semibold mb-4"></h2>
      <div class="flex flex-col gap-4">
        <!-- Adjust Goal Label -->
        <p>{{ calorieConfig.label }}</p>

        <!-- Value Display -->
        <div class="flex justify-center items-center gap-2">
          <span class="text-sm opacity-70">Value:</span>
          <span class="font-semibold text-lg">{{ sliderDisplay }}</span>
        </div>

        <!-- Reasonable Calorie Goal -->
        <div class="collapse bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-1" checked="checked" />
          <div class="collapse-title font-semibold flex items-center">Reasonable Calorie Goal:</div>
          <div class="collapse-content text-sm">
            <input type="range" :min="calorieConfig.min" :max="calorieConfig.max" v-model.number="sliderValue"
              class="w-full" />
          </div>
        </div>
        <div class="collapse bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-1" />
          <div class="collapse-title font-semibold flex items-center">Custom Figure:</div>
          <div class="collapse-content text-sm"><input type="number" min="0" max="200" v-model.number="sliderDisplay"
              class="input input-bordered w-20" /></div>
        </div>
<!-- 
        <div class="flex-col items-center justify-center text-center p-5 rounded-3xl bg-base-100">
          <div v-if="isTodaySelected" class="text-sm">Default Deadline (today's Date):</div>
          <div v-else class="text-sm">Deadline currently set to:</div>
          <h1 class="font-semibold text-2xl text-primary">{{ formattedDate }}</h1>
        </div> -->
        <!-- <label class="block text-sm mb-2 pt-11">Override Deadline:</label>
        <input v-model="date" type="date" class="input input-bordered w-full mb-2"> -->
      </div>

      <!-- Action Buttons -->
      <div class="space-x-3 mt-4">
        <button @click="$emit('cancel')" class="btn w-1/4 btn-error btn-soft">
          Back
        </button>
        <button class="btn w-2/4 btn-success">Confirm</button>
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
                    class="input input-bordered w-full mb-2"
                    @keyup.enter="isFormValid && $emit('save', editableGoal)" />

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
                <button class="btn btn-md" :class="{ 'btn-outline btn-soft btn-secondary': page === 2, 'btn-ghost': page !== 2 }"
                    @click="page = 2">
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
            </div></div>
            
            <div class="flex justify-between mt-4" @click.self="$emit('cancel')">
                <button v-if="!isNew" class="btn btn-error" @click="$emit('confirm-delete', editableGoal)">Delete</button>
                <div v-else class="invisible btn btn-error">Placeholder</div>
                <div class="space-x-2">
                    <button class="btn btn-ghost" @click="$emit('cancel')">Cancel</button>
                    <button :disabled="!isFormValid" class="btn btn-success"
                        @click="$emit('save', editableGoal)">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
  <script>
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
        date: null
      };
      
    },
    // Disable scrolling, and leave room for it to stop page jittering.
    mounted() {
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
        return Math.round(this.sliderValue + this.calorieConfig.startingVal);
      },
      set(newValue) {
        this.sliderValue = newValue - this.calorieConfig.startingVal;
      }
    },

    calorieConfig() {
      const normalizedChoice = 'eat less calories'

      if (normalizedChoice === 'eat less calories') {
        return {
          min: -1000,
          max: 0,
          label: 'Configure calorie deficit',
          startingVal: 2200
        };
      } else if (normalizedChoice === 'eat more calories') {
        return {
          min: 0,
          max: 1000,
          label: 'Configure calorie surplus',
          startingVal: 2200
        };

      } else if (normalizedChoice === 'lose weight') {
        return {
          min: -60,
          max: 0,
          label: 'Configure Weight Loss Target',
          startingVal: 60 //! TODO: change to current weight
        };
      } else if (normalizedChoice === 'gain weight') {
        return {
          min: 0,
          max: 100,
          label: 'Configure Weight Gain Target',
          startingVal: 60 //! TODO: change to current weight
        };
      }
      else {
        return {
          min: 0,
          max: 1000,
          label: 'Adjust goal'
        };
      }
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
            // form checks: progress must be lower or same as target; both numbers must be more than zero and integers; 
            const isInt = val => Number.isInteger(val);
            return (
            this.editableGoal.unit.trim() &&
            isInt(this.editableGoal.target) && this.editableGoal.target > 0 &&
            isInt(this.editableGoal.progress) && this.editableGoal.progress >= 0 && 
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
    }
  };
  </script>
