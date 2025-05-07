<template>
  <div class="flex flex-col items-center w-full px-4">
    <!-- Wrapper to constrain width and align children to left -->
    <div class="w-full max-w-md flex flex-col items-start">
      <!-- Title Input - Left aligned within container -->
      <textarea v-model="newTitle"
        class="textarea textarea-ghost text-base-content text-4xl font-semibold text-left focus:outline-none focus:ring-0 border-none shadow-none resize-none w-full p-0"
        placeholder="Afternoon Run" rows="1"></textarea>

      <!-- Timer Section  -->
      <div class="flex justify-between items-start mt-4 ml-1">
        <!-- Elapsed section -->
        <div class="flex flex-col items-start">
          <span class="text-xl font-semibold text-base-content/95">Elapsed</span>
          <div class="flex items-center gap-3 mt-1">
            <div class="text-lg text-neutral/85">
              {{ formatTime(timer) }}
            </div>
            <!-- Status indicator -->
            <div class="inline-grid *:[grid-area:1/1]">
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
      <ExerciseTrackCard v-for="(exercise, index) in exercises" :key="exercise.id" :title="exercise.title"
        :activity="exercise.activity" :integer="exercise.integer" :unit="exercise.unit" @updateActivity="updateActivity"
        @updateInteger="updateInteger" @updateUnit="updateUnit" />
    </div>

    <!-- Add Activity Button - Centered -->
    <div class="w-full max-w-md flex justify-center mt-4 xs:mt-2">
      <button @click="addNewActivity" class="btn btn-primary">
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
import axios from 'axios';
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
      newTitle: '',
      exerciseId: this.$route.params.id,
      isLoaded: false,
      activityTypes: []
    };
  },
  computed: {
    isNew() {
      return this.exerciseId === undefined || this.exerciseId === 'new';
    },
    storageKey() {
      return this.isNew ? 'tempNewExercise' : `tempEditExercise_${this.exerciseId}`;
    }
  },
  watch: {
    newTitle() {
      this.saveToLocalStorage();
    }
  },
  methods: {
    saveToLocalStorage() {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify({
          title: this.newTitle,
          exercises: this.exercises,
          timer: this.timer
        })
      );
    },
    async mounted() {
      const res = await axios.get('/activitytypes');
      this.activityTypes = res.data;
      const tempExercise = JSON.parse(localStorage.getItem(this.storageKey));
      if (tempExercise) {
        this.newTitle = tempExercise.title || '';
        this.exercises = tempExercise.exercises || [];
        this.timer = tempExercise.timer || 0;
      } else if (!this.isNew) {
        try {
          const res = await axios.get(`/exercises/${this.exerciseId}`);
          const workout = res.data.exercise;

          this.newTitle = workout.exerciseName;
          this.exercises = workout.activities.map((a, index) => ({
            id: index + 1,
            title: `Activity ${index + 1}`,
            activity: a.activity,
            integer: a.integer,
            unit: a.unit
          }));
          this.timer = workout.durationMs || 0;
          this.nextId = this.exercises.length + 1;
        } catch (err) {
          console.error('Failed to load exercise:', err);
        }
      }
      this.isLoaded = true;
    },
    startTimer() {
      if (!this.isRunning) {
        this.isRunning = true;
        this.timerInterval = setInterval(() => {
          this.timer += 10;
          this.saveToLocalStorage();
        }, 1000);
      }
    },
    pauseTimer() {
      if (this.isRunning) {
        this.isRunning = false;
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.saveToLocalStorage();
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
        activity: '',
        integer: '',
        unit: ''
      };
      this.exercises.push(newActivity);
      this.nextId++;
      this.saveToLocalStorage();
    },
    updateInteger({ title, integer }) {
      const ex = this.exercises.find((e) => e.title === title);
      if (ex) {
        ex.integer = integer;
        this.saveToLocalStorage();
      }
    },
    updateUnit({ title, unit }) {
      const ex = this.exercises.find((e) => e.title === title);
      if (ex) {
        ex.unit = unit;
        this.saveToLocalStorage();
      }
    },
    updateActivity({ title, activity }) {
      const ex = this.exercises.find((e) => e.title === title);
      if (ex) {
        ex.activity = activity;
        this.saveToLocalStorage();
      }
    },
    async finishWorkout() {
      this.pauseTimer();

      const activitiesDetails = this.exercises.map(ex => {
        const activityType = this.activityTypes.find(type => type._id === ex.activity);
        return {
          activityType: activityType?.name || ex.activity,  // fallback to the string if not found
          quantity: Number(ex.integer)
        };
      });

      const completedWorkout = {
        exerciseName: this.newTitle || 'Untitled Workout',
        activities: activitiesDetails,
        durationMs: this.timer,
        date: new Date()
      };

      try {
        if (this.isNew) {
          await axios.post('/exercises', completedWorkout);
        } else {
          await axios.put(`/exercises/update/${this.exerciseId}`, completedWorkout);
        }
        localStorage.removeItem(this.storageKey);
        this.$router.push('/home/exercise');
      } catch (err) {
        console.error('Failed to save workout:', err.response?.data || err);
      }
    }

  }
};
</script>