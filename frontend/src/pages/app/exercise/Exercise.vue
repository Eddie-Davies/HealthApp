<template>
  <PageHeader :title="$route.meta.title" v-if="!showTrack"/>
  <div class="mt-10 px-4 pb-16 flex flex-col items-center">
    <!-- Start Exercise -->
    <div v-if="!showTrack">
      <ExerciseNew v-if="!showTrack" @start="startExercise" />
      <!-- Exercise Summary -->
      <div class="mt-10 flex justify-between items-center w-full max-w-md">
        <h2 class="text-2xl font-semibold">Previous Exercise</h2>
      </div>
    </div>
    <!-- Workout in progress -->
    <ExerciseTrack
      v-if="showTrack"
      @workoutFinished="handleWorkoutFinished"
    />
    <div class="mt-10 w-full max-w-md">
      <div v-if="!showTrack">
        
        <!-- Only show limited exercises or all based on showAll toggle -->
        <ExerciseCard
          v-for="(exercise, index) in displayedExercises"
          :key="index"
          :title="exercise.title"
          :activity="exercise.activity"
          :value="exercise.value"
          :time="exercise.time"
          :activitiesDetails="exercise.activitiesDetails || []"
          :isMultiActivity="Boolean(exercise.isMultiActivity)"
          @delete="deleteExercise(index)"
        />
        <!-- Show more/less button -->
        <div v-if="exercises.length > 5" class="flex justify-center mt-6 mb-15">
          <button
            @click="showAll = !showAll"
            class="btn btn-outline btn-neutral"
          >
            {{ showAll ? 'Show Recent' : 'Show All' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ExerciseTrack from './ExerciseTrack.vue';
import ExerciseCard from './ExerciseCard.vue';
import ExerciseNew from './ExerciseNew.vue';
import PageHeader from '../../../components/header/PageHeader.vue';

export default {
  components: { ExerciseTrack, ExerciseCard, ExerciseNew, PageHeader },
  data() {
    return {
      showTrack: false,
      exercises: [],
      showAll: false
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
  methods: {
    startExercise() {
      this.showTrack = true;
    },
    handleWorkoutFinished(workout) {
      if (workout) {
        console.log('Received workout in parent:', workout);
        // Ensure workout has all required properties for ExerciseCard
        const processedWorkout = {
          ...workout,
          isMultiActivity: Boolean(workout.isMultiActivity),
          activitiesDetails: workout.activitiesDetails || []
        };
        this.exercises.unshift(processedWorkout);
      }
      this.showTrack = false;
    },
    deleteExercise(index) {
      this.exercises.splice(index, 1);
    }
  }
};
</script>