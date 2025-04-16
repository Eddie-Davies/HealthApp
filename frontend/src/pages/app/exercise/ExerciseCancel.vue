<template>
    <div class=" flex flex-col justify-end items-center">
      <div class="flex flex-col items-center py-95">
        <router-link to="/home/exercise">
          <button class="btn btn-error  w-18 h-18 rounded-full flex items-center justify-center">
            <i class="fa-solid fa-xmark text-base-100 text-4xl"></i>
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