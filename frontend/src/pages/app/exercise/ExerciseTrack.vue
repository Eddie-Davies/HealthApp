<template>
    <div class="flex flex-col items-center">
      <div class="w-full flex justify-center">
        <textarea
          v-model="newTitle"
          class="mt-20 textarea textarea-ghost text-base-content text-4xl font-semibold text-left focus:outline-none focus:ring-0 border-none shadow-none resize-none w-100"
          placeholder="Afternoon Run"
          rows="2"
        ></textarea>
      </div>
      <div class="pr-80 text-2xl">
        Elapsed
        <div class="text-2xl text-center text-neutral">
          {{ formatTime(timer) }}
        </div>
      </div>
      <div class="mt-8 w-full max-w-md">
        <ExerciseTrackCard
          v-for="(exercise, index) in exercises"
          :key="index"
          :title="exercise.title"
          :activity="exercise.activity"
          :integer="exercise.integer"
          :unit="exercise.unit"
          @updateActivity="updateActivity"
          @updateInteger="updateInteger"
          @updateUnit="updateUnit"
        />
      </div>
      
        <div class="w-full flex justify-center mt-4">
        <button 
            @click="addNewActivity" 
            class="btn btn-primary" >
            + Add Activity
        </button>
        </div>

        <div class="w-full flex items-center justify-center py-4">
      <div class="relative flex items-center justify-center w-full pt-20">
        <div class="absolute left-1/2 transform -translate-x-full pr-16">
          <ExercisePlay @play="startTimer" :disabled="isRunning"/>
        </div>
        <ExerciseFinish @finishWorkout="finishWorkout" />
        <div class="absolute left-1/2 transform translate-x-full pl-1">
          <ExercisePause @pause="pauseTimer" :disabled="!isRunning"/>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import ExerciseFinish from './ExerciseFinish.vue';
  import ExerciseCard from './ExerciseCard.vue';
  import ExerciseNew from './ExerciseNew.vue';
  import ExercisePause from './ExercisePause.vue';
  import ExercisePlay from './ExercisePlay.vue';
  import ExerciseTrackCard from './ExerciseTrackCard.vue';
  
  export default {
    name: 'ExerciseTrack',
    components: {
      ExerciseCard,
      ExerciseNew,
      ExerciseFinish,
      ExercisePlay,
      ExercisePause,
      ExerciseTrackCard,
    },
    data() {
      return {
        exercises: [
          { title: 'New Activity', activity: 'Run', integer: '2', unit: 'km' }
        ],
        timer: 0,
        timerInterval: null,
        isRunning: false,
        newTitle: ''
      };
    },
    methods: {
    addNewActivity() {
      
    },
      startTimer() {
        if (!this.isRunning) {
          this.isRunning = true;
          this.timerInterval = setInterval(() => {
            this.timer++;
          }, 1000);
        }
      },
      pauseTimer() {
        if (this.isRunning) {
          this.isRunning = false;
          clearInterval(this.timerInterval);
          this.timerInterval = null;
        }
      },
      formatTime(seconds) {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
      },
      updateInteger({ title, integer }) {
        console.log('Updating integer for:', title, 'to:', integer);
        const ex = this.exercises.find((e) => e.title === title);
        if (ex) {
          ex.integer = integer;
          console.log('Updated exercises:', JSON.stringify(this.exercises));
        }
      },
      updateUnit({ title, unit }) {
        const ex = this.exercises.find((e) => e.title === title);
        if (ex) ex.unit = unit;
      },
      updateActivity({ title, activity }) {
        const ex = this.exercises.find((e) => e.title === title);
        if (ex) ex.activity = activity;
      },
      finishWorkout() {
        this.pauseTimer(); // stop the timer
        
        // Get the first exercise's data (or use defaults if there are no exercises)
        const exercise = this.exercises[0] || { activity: '', integer: '0', unit: '' };
        
        console.log('Exercise at finish:', JSON.stringify(exercise));
        
        const completedWorkout = {
          title: this.newTitle || 'Untitled Workout',
          activity: exercise.activity,
          value: `${exercise.integer} ${exercise.unit}`,
          time: this.formatTime(this.timer),
        };
        
        console.log('Workout finished:', completedWorkout);
        // Emit to parent
        this.$emit('workoutFinished', completedWorkout);
      }
    }
  };
  </script>