<template>
  <div class="mt-20 px-4 pb-16 flex flex-col items-center">
    <!-- Start Exercise Button -->
    <ExerciseNew />
    <!-- Previous Exercises -->
    <div class="mt-16 w-full max-w-md">
      <h2 class="text-xl font-semibold mb-4">Previous Exercise</h2>

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
</template>

<script>
import ExerciseCard from './ExerciseCard.vue'
import ExerciseNew from './ExerciseNew.vue'

export default {
  name: 'Exercise',
  components: { ExerciseCard, ExerciseNew },
  data() {
    return {
      exercises: [
        { title: '3km Run', activity: 'Run', distance: '3km', time: '18m 43s' }
        
      ]
    }
  }
}
</script>
