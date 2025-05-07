<template>
  <PageHeader :title="$route.meta.title" />
  <div class="mt-10 px-4 pb-16 flex flex-col items-center">
    <!-- Start Exercise -->
    <div>
      <ExerciseNew @start="startExercise" />
      <!-- Exercise Summary -->
      <div class="mt-10 flex justify-between items-center w-full max-w-md">
        <h2 class="text-2xl font-semibold">Previous Exercise</h2>
      </div>
    </div>
    <!-- Workout in progress -->
    <ExerciseTrack v-if="showTrack" @workoutFinished="handleWorkoutFinished" />
    <div class="mt-10 w-full max-w-md">
      <div>

        <!-- Only show limited exercises or all based on showAll toggle -->
        <ExerciseCard v-for="(exercise, index) in displayedExercises" :key="index" :title="exercise.title"
          :activity="exercise.activity" :value="exercise.value" :time="exercise.time"
          :activitiesDetails="exercise.activitiesDetails || []" :isMultiActivity="Boolean(exercise.isMultiActivity)"
          @delete="deleteExercise(index)" />
        <!-- Show more/less button -->
        <div v-if="!showTrack && exercises && exercises.length > 5" class="flex justify-center mt-6 mb-15">
          <button @click="showAll = !showAll" class="btn btn-outline btn-neutral">
            {{ showAll ? 'Show Recent' : 'Show All' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ExerciseTrack from './ExerciseTrack.vue';
import ExerciseCard from './ExerciseCard.vue';
import ExerciseNew from './ExerciseNew.vue';
import PageHeader from '../../../components/header/PageHeader.vue';

export default {
  components: { ExerciseTrack, ExerciseCard, ExerciseNew, PageHeader },
  data() {
    return {
      showTrack: false,
      showAll: false,
      exercises: []
    };
  },
  computed: {
    displayedExercises() {
      if (this.showAll || this.exercises.length <= 5) {
        return this.exercises;
      } else {
        // Show only the first 5 (most recent) exercises
        return this.exercises.slice(0, 5);
      }
    }
  },
  created() {
    this.fetchExercises();
  },
  methods: {
    formatTime(ms) {
      if (!ms || typeof ms !== 'number') return '00:00.00';
      const minutes = Math.floor(ms / 60000);
      const seconds = ((ms % 60000) / 1000).toFixed(2).padStart(5, '0');
      return `${String(minutes).padStart(2, '0')}:${seconds}`;
    },
    async fetchExercises() {
      try {
        const res = await axios.get('/exercises', { withCredentials: true }); // ensure token is sent
        this.exercises = res?.data?.exercises.map(workout => ({
          ...workout,
          isMultiActivity: workout.activities.length > 1,
          time: this.formatTime(workout.durationMs),
          activitiesDetails: workout.activities.map(act => ({
            activity: act.activityType[0]?.name || 'Unknown',
            unit: act.activityType[0]?.unit || '',
            integer: act.quantity
          }))
        })) || [];
      } catch (err) {
        console.error('Failed to fetch exercises:', err);
      }
    },
    startExercise() {
      this.$router.push('/home/exercise/new');
    },
    handleWorkoutFinished(workout) {
      if (workout) {
        this.exercises.unshift({
          ...workout,
          isMultiActivity: workout.activities.length > 1,
          time: this.formatTime(workout.durationMs),
          activitiesDetails: workout.activities.map(act => ({
            activity: act.activityType[0]?.name || 'Unknown',
            unit: act.activityType[0]?.unit || '',
            integer: act.quantity
          }))
        });
      }
      this.showTrack = false;
    },
    async deleteExercise(index) {
      const idToDelete = this.exercises[index]._id;
      try {
        await axios.delete(`/exercises/${idToDelete}`, { withCredentials: true });
        this.exercises.splice(index, 1);
      } catch (err) {
        console.error('Failed to delete exercise:', err);
      }
    }
  }
};
</script>