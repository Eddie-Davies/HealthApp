<template>
    <div class="flex flex-col items-center">
      <div class="mt-6 w-full flex justify-center">
        <input
          v-model="newTitle"
          class="input input-ghost px-10 text-base-content text-4xl font-semibold text-left focus:outline-none focus:ring-0 border-none shadow-none"
          placeholder="Afternoon Run"
        />
      </div>

    <div class="mt-25 w-full max-w-md">

        <ExerciseTrackCard
            v-for="(exercise, index) in exercises"
            :key="index"
            :title="exercise.title"
            :value="exercise.value"
            :unit="exercise.unit"
        />
    </div>
  
      <div class="w-full flex items-center justify-center py-4">
        <div class="relative flex items-center justify-center w-full pt-20">
          <div class="absolute left-1/2 transform -translate-x-full pr-16">
            <ExercisePlay />
          </div>
  
          <ExerciseCancel />
  
          <div class="absolute left-1/2 transform translate-x-full pl-1">
            <ExercisePause />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import ExerciseCancel from './ExerciseCancel.vue';
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
      ExerciseCancel,
      ExercisePlay,
      ExercisePause,
      ExerciseTrackCard,
    },

    data() {
    return {
      exercises: [
        { title: 'Distance', value: '2', unit: 'km' }
        
      ]
    }
    }
  };
  </script>
  