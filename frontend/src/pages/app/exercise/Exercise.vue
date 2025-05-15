<template>
  <PageHeader :title="$route.meta.title" />
  <div v-if="isLoaded" class="mt-20 px-4 pb-32 flex flex-col items-center">
    <!-- Start Exercise -->
    <div class="w-full max-w-md">
      <ExerciseNew @start="startExercise" />
      <!-- Exercise Summary -->
      <div class="mt-10">
        <div v-if="exercises.length > 0">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-semibold">Previous Exercise</h2>
            <p class="text-right text-base-content/50 cursor-default">Tap on an exercise to edit.</p>
          </div>

          <!-- Search and filter controls -->
          <div class="flex justify-between items-center mb-1">
            <input v-model="searchQuery" type="text" placeholder="Search exercises..."
              class="input input-bordered w-full max-w-xs" />
            <div class="relative ml-4">
              <div class="dropdown dropdown-bottom dropdown-end">
                <div tabindex="0" role="button" class="m-1 p-4 btn cursor-pointer rounded-full"><i
                    class="fa-solid fa-filter text-xl"></i></div>
                <ul tabindex="0"
                  class="dropdown-content menu bg-base-200 border-secondary border-2 rounded-box z-1 w-52 p-2 shadow-sm">
                  <li><a @click="sortOption = 'date_desc'; showDropdown = false">Date (Newest First)</a></li>
                  <li><a @click="sortOption = 'date_asc'; showDropdown = false">Date (Oldest First)</a></li>
                  <li><a @click="sortOption = 'unit_desc'; showDropdown = false">Units (Most)</a></li>
                  <li><a @click="sortOption = 'unit_asc'; showDropdown = false">Units (Least)</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="tooltip flex justify-center items-center" data-tip="Click the button above :)">
          <button class="btn">Log some new exercises to start tracking!</button>
        </div>
      </div>
    </div>

    <!-- show workout tracking interface if button is pressed -->
    <ExerciseTrack v-if="showTrack" @workoutFinished="handleWorkoutFinished" />

    <div class="w-full max-w-md">
      <div class="mt-3 grid grid-cols-1 gap-4">
        <ExerciseCard v-for="(exercise, index) in filteredAndSortedExercises" :key="index"
          :exerciseName="exercise.exerciseName" :activity="exercise.activity" :value="exercise.value"
          :time="exercise.time" :activitiesDetails="exercise.activitiesDetails || []"
          :isMultiActivity="Boolean(exercise.isMultiActivity)" :createdAt="exercise.date" :exerciseId="exercise._id"
          @delete="deleteExercise(index)" />
      </div>

      <div v-if="!showTrack && exercises && exercises.length > 5" class="flex justify-center mt-6 mb-15">
        <button @click="showAll = !showAll" class="btn btn-outline btn-neutral">
          {{ showAll ? 'Show Recent' : 'Show All' }}
        </button>
      </div>
    </div>
    <div v-if="showDeleteModal" @click.self="showDeleteModal = false"
      class="fixed inset-0 bg-black/90 flex justify-center items-center z-50">
      <div class="bg-base-100 p-6 rounded-xl shadow-lg max-w-sm w-full">
        <h2 class="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this exercise?</p>
        <div class="flex justify-end mt-6">
          <button class="btn btn-outline mr-2" @click="showDeleteModal = false">Cancel</button>
          <button class="btn btn-error" @click="confirmDeleteExercise">Yes, Delete</button>
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
      exercises: [],
      sortOption: 'date_desc',
      searchQuery: '',
      isLoaded: false,
      pendingDeleteIndex: null,
      showDeleteModal: false
    };
  },
  computed: {
    filteredAndSortedExercises() {
      let exercises = [...this.exercises];

      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        exercises = exercises.filter(exercise => exercise.exerciseName.toLowerCase().includes(query));
      }

      switch (this.sortOption) {
        case 'date_asc':
          exercises.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        case 'date_desc':
          exercises.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case 'unit_asc':
          exercises.sort((a, b) => this.totalUnits(a) - this.totalUnits(b));
          break;
        case 'unit_desc':
          exercises.sort((a, b) => this.totalUnits(b) - this.totalUnits(a));
          break;
      }
      return exercises;
    }
  },
  created() {
    this.fetchExercises();
  },
  methods: {
    async fetchExercises() {
      try {
        const res = await axios.get('/exercises', { withCredentials: true });
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
      this.isLoaded = true;
    },

    startExercise() {
      this.$router.push('/home/exercise/new');
    },

    // Handle completion of a workout
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

     // Prepare to delete an exercise
    async deleteExercise(index) {
      this.pendingDeleteIndex = index;
      this.showDeleteModal = true;
    },
    // Confirm and execute exercise deletion
    async confirmDeleteExercise() {
      const index = this.pendingDeleteIndex;
      if (index === null) return;
      const idToDelete = this.exercises[index]._id;
      try {
        await axios.delete(`/exercises/${idToDelete}`, { withCredentials: true });
        this.exercises.splice(index, 1);
        this.showDeleteModal = false;
        this.pendingDeleteIndex = null;
      } catch (err) {
        console.error('Failed to delete exercise:', err);
      }
    },
     // Calculate total units for an exercise (used for sorting)
    totalUnits(exercise) {
      return exercise.activitiesDetails.reduce((sum, act) => sum + (act.integer || 0), 0);
    },
    formatTime(ms) {
      if (!ms || typeof ms !== 'number' || isNaN(ms)) return '00:00:00.00';
      const hours = Math.floor(ms / 3600000);
      const minutes = Math.floor((ms % 3600000) / 60000);
      const seconds = ((ms % 60000) / 1000).toFixed(2).padStart(5, '0');
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${seconds}`;
    }
  }
};
</script>
