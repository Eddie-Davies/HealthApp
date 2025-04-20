<template>
    <div class="card bg-base-300 rounded-box p-4 flex flex-col">
      <!-- Top: Title -->
      <h1 class="text-lg font-semibold text-neutral/80">{{ title }}</h1>
      
      <!-- Activity Details -->
      <div class="flex justify-between mt-2">
        <div>
          <p class="text-neutral-400">Activity</p>
          <h2 class="font-medium text-neutral">{{ activity }}</h2>
        </div>
        <div>
          <p class="text-neutral-400">Distance</p>
          <h2 class="font-medium text-neutral">{{ distance }}</h2>
        </div>
        <div>
          <p class="text-neutral-400">Time</p>
          <h2 class="font-medium text-neutral">{{ time }}</h2>
        </div>
      </div>
  
    
    </div>
  </template>
  
  <script>

  
  export default {
    name: 'ExerciseCard',
    props: {
      title: {
        type: String,
        default: 'My Exercise'
      },
      activity: {
        type: String,
        default: 'Run'
      },
      distance: {
        type: String,
        default: '0 km'
      },
      time: {
        type: String,
        default: '0m 0s'
      }
    }
  }
  </script>
  
