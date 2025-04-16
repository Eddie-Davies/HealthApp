<template>
    <div class="flex flex-col items-center">
      <router-link to="/home/exercise">
        <button class="btn bg-red-600 btn-primary w-18 h-18 rounded-full flex items-center justify-center">
          <i class="fa-solid fa-xmark text-white text-4xl"></i>
        </button>
      </router-link>
      <p class="pt-4 text-center text-base">Finish Run</p>
    </div>
  </template>

  <script>
  
    export default {
      name: 'ExerciseCancel',
    };
  </script>