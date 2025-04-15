<template>
    <div class="min-h-screen flex flex-col justify-end items-center pb-40">
      <div class="flex flex-col items-center py-4">
        <router-link to="/home/exercise">
          <button class="btn btn-accent  w-16 h-16 rounded-full flex items-center justify-center">
            <i class="fa-solid fa-xmark text-base-100 text-2xl"></i>
          </button>
        </router-link>
        <p class="pt-4 text-center text-base">Finish Run</p>
      </div>
    </div>
  </template>

  <script>
  
    export default {
      name: 'ExerciseCancel',
    };
  </script>