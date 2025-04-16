<template>
    <div class="min-h-screen flex flex-col pb-40">
      <div class="mt-6 w-full flex justify-center">
        <input
          v-model="newTitle"
          class="input input-ghost text-black text-4xl font-semibold text-center focus:outline-none focus:ring-0 border-none shadow-none"
          placeholder="Afternoon Run"
        />
      </div>
  
      <div class="flex flex-col justify-end items-center flex-grow">
        <div class="relative flex items-center justify-center py-4 w-full">
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
  };
  </script>
  