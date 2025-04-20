<template>
  <div class="mt-10 px-4 pb-16 flex flex-col items-center">
    <!-- Start Exercise -->
     <div v-if="!showTrack">
      <ExerciseNew v-if="!showTrack" @start="showTrack = true" />
      <h2 class="mt-10 text-2xl font-semibold mb-4">Previous Exercise</h2>
      
     </div>
    <!-- Workout in progress -->
    <ExerciseTrack
      v-if="showTrack"
      @workoutFinished="handleWorkoutFinished"
    />

    <div class="mt-10 w-full max-w-md">
      <div v-if="!showTrack">
      <ExerciseCard
        v-for="(exercise, index) in exercises"
        :key="index"
        :title="exercise.title"
        :activity="exercise.activity"
        :distance="exercise.distance"
        :time="exercise.time"
      />
    </div>
    </div>

    <div v-if="showTrack">
        
    </div>
  </div>
</template>


<script>
import ExerciseTrack from './ExerciseTrack.vue';
import ExerciseCard from './ExerciseCard.vue';
import ExerciseNew from './ExerciseNew.vue';

export default {
  components: { ExerciseTrack, ExerciseCard, ExerciseNew },
  data() {
    return {
      showTrack: false,
      exercises: []
    };
  },
  methods: {
    handleWorkoutFinished(workout) {
    if (workout) {
      console.log('Received workout in parent:', workout);
      this.exercises.unshift(workout);
    }
    this.showTrack = false;
  }
}
};
</script>
