<!-- Component button for pausing an exercise -->

<template>
    <div class="flex flex-col items-center">
      <button 
        @click="$emit('play')" 
        class="btn w-14 h-14 rounded-full flex items-center justify-center"
        :class="disabled ? 'btn-disabled' : 'btn-success'"
        :disabled="disabled" >
        <i class="fa-solid fa-play text-base-100 text-2xl"></i>
      </button>
      <p class="pt-4 text-center text-base">Play</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ExercisePlay',
    props: {
      disabled: {
        type: Boolean,
        default: false
      }
    }
  };
  </script>