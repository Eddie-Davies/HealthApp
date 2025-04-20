<template>
  <div>
    <!-- Start Exercise -->
    <ExerciseNew v-if="!showTrack" @start="showTrack = true" />

    <!-- Workout in progress -->
    <ExerciseTrack
      v-if="showTrack"
      @workoutFinished="handleWorkoutFinished"
    />

    <div class="">
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
