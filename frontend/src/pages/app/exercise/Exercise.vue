<template>
  <div class="mt-10 px-4 pb-16 flex flex-col items-center">
    <!-- Start Exercise -->
    <div v-if="!showTrack">
      <ExerciseNew v-if="!showTrack" @start="startExercise" />
      
      <!-- Exercise Summary with Count -->
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
          :distance="exercise.distance"
          :time="exercise.time"
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

export default {
  components: { ExerciseTrack, ExerciseCard, ExerciseNew },
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
      this.$emit('start-exercise'); // Emit event to hide navbar
    },
    handleWorkoutFinished(workout) {
      if (workout) {
        console.log('Received workout in parent:', workout);
        this.exercises.unshift(workout);
      }
      this.showTrack = false;
      this.$emit('finish-exercise'); // Emit event to show navbar
    },
    deleteExercise(index) {
      // Remove the exercise at the specified index
      this.exercises.splice(index, 1);
      console.log('Exercise deleted, remaining:', this.exercises.length);
    }
  }
};
</script>