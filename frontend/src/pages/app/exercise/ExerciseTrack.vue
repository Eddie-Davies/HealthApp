<template>
    <div class="flex flex-col items-center w-full px-4">
      <!-- Wrapper to constrain width and align children to left -->
      <div class="w-full max-w-md flex flex-col items-start">
        <!-- Title Input - Left aligned within container -->
        <textarea
          v-model="newTitle"
          class="textarea textarea-ghost text-base-content text-4xl font-semibold text-left focus:outline-none focus:ring-0 border-none shadow-none resize-none w-full p-0"
          placeholder="Afternoon Run"
          rows="1"
        ></textarea>
        
            <!-- Timer Section  -->
    <div class="flex justify-between items-start mt-4 ml-1">
    <!-- Elapsed section -->
    <div class="relative flex flex-col items-start w-22">
        <span class="text-xl font-semibold text-base-content/95">Elapsed</span>
        <div class="flex items-center gap-3 mt-1">
        <div class="text-lg text-neutral/85">
            {{ formatTime(timer) }}
        </div>
        <!-- Status indicator -->
        <div class="inline-grid *:[grid-area:1/1] absolute right-0">
            <div class="status status-error animate-ping"></div>
            <div class="status status-error"></div>
        </div>
        </div>
    </div>

    <!-- Activities section -->
    <div class="flex flex-col ml-10">
        <span class="text-xl font-semibold text-base-content/95">Activities</span>
        <span class="text-lg text-neutral/85 mt-1">{{ exercises.length }}</span>
    </div>
    </div>


      </div>
      
      <!-- Activity Cards - Centered on page, but content left-aligned -->
      <div class="mt-8 xs:mt-4 w-full max-w-md">
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
  
      <!-- Add Activity Button - Centered -->
      <div class="w-full max-w-md flex justify-center mt-4 xs:mt-2">
        <button 
          @click="addNewActivity" 
          class="btn btn-primary" >
          + Add Activity
        </button>
      </div>
    
      <!-- Control Buttons - Centered -->
      <div class="flex flex-wrap items-center justify-center w-full mt-10 gap-4">
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
        { id: 1, title: 'Activity 1', activity: 'Run', integer: '0', unit: 'km' }
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
        title: `Activity ${this.nextId}`,
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