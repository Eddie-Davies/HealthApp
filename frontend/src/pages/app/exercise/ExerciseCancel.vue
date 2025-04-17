<template>
    <div class="flex flex-col items-center">
      <div class="flex flex-col items-center">
        <button
          class="btn btn-error w-18 h-18 rounded-full flex items-center justify-center"
          @click="$emit('cancelWorkout')"
        >
          <i class="fa-solid fa-xmark text-base-100 text-4xl"></i>
        </button>
        <p class="pt-4 text-center text-base">Finish Run</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ExerciseCancel',
  };
  </script>
  