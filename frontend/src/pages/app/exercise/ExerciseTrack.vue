<template>
    <div class="flex flex-col items-center">
      <div class="w-full flex justify-center">
        <textarea
          v-model="newTitle"
          class="textarea textarea-ghost text-base-content text-4xl font-semibold text-left focus:outline-none focus:ring-0 border-none shadow-none resize-none w-115"
          placeholder="Afternoon Run"
          rows="1"
        ></textarea>
      </div>
      <div class="pr-85 text-xl">
        Elapsed
        <div class="text-xl text-center text-neutral">
          {{ formatTime(timer) }}
            <div class="inline-grid *:[grid-area:1/1]">
            <div class="status status-error animate-ping"></div>
            <div class="status status-error"></div>
            </div>
        </div>
      </div>
      <div class="mt-8 w-full max-w-md">
        <ExerciseTrackCard
          v-for="(exercise, index) in exercises"
          :key="exercise.id"
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
  
    <div class="flex items-center justify-center w-full pt-20 gap-4">
        <ExercisePlay @play="startTimer" :disabled="isRunning" />
        <ExerciseFinish @finishWorkout="finishWorkout" />
        <ExercisePause @pause="pauseTimer" :disabled="!isRunning" />
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
        { id: 1, title: 'New Activity 1', activity: 'Run', integer: '0', unit: 'km' }
        ],
        nextId: 2,
        timer: 0,  // This will now track milliseconds
        timerInterval: null,
        isRunning: false,
        newTitle: ''
    };
    },
    methods: {
    startTimer() {
        if (!this.isRunning) {
        this.isRunning = true;
        // Update every 10ms instead of 1000ms
        this.timerInterval = setInterval(() => {
            this.timer += 10;  // Add 10ms each tick
        }, 10);
        }
    },
    pauseTimer() {
        if (this.isRunning) {
        this.isRunning = false;
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        }
    },
    formatTime(milliseconds) {
      // Calculate minutes, seconds and milliseconds
      const mins = Math.floor(milliseconds / 60000).toString().padStart(2, '0');
      const secs = Math.floor((milliseconds % 60000) / 1000).toString().padStart(2, '0');
      const ms = Math.floor((milliseconds % 1000) / 10).toString().padStart(2, '0');
      
      return `${mins}:${secs}.${ms}`;
    },
    addNewActivity() {
      const newActivity = {
        id: this.nextId,
        title: `New Activity ${this.nextId}`,
        activity: 'Run',
        integer: '0',
        unit: 'km'
      };
      this.exercises.push(newActivity);
      this.nextId++;
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
  
  // Create a detailed activities array for multi-column display
  const activitiesDetails = this.exercises.map(ex => ({
    activity: ex.activity,
    integer: ex.integer,
    unit: ex.unit
  }));
  
  // Use the first activity as the main activity for backward compatibility
  const mainActivity = this.exercises[0].activity;
  const mainValue = `${this.exercises[0].integer} ${this.exercises[0].unit}`;
  
  const completedWorkout = {
    title: this.newTitle || 'Untitled Workout',
    activity: mainActivity,
    value: mainValue,
    time: this.formatTime(this.timer),
    // Add the detailed activities array for multi-column display
    activitiesDetails: activitiesDetails,
    // Flag to indicate this is a multi-activity workout - ensure this is set correctly
    isMultiActivity: this.exercises.length > 1
  };
  
  console.log('Workout finished:', completedWorkout);
  console.log('Multi-activity flag:', completedWorkout.isMultiActivity);
  console.log('Activities details:', JSON.stringify(activitiesDetails));
  
  this.$emit('workoutFinished', completedWorkout);
}
}

  };
  </script>