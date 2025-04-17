<template>
    <div class="card bg-base-300 rounded-box p-4 flex flex-col">
      <!-- Top: Title -->
      <h1 class="text-lg font-semibold text-neutral/80">{{ title }}</h1>
      
      <!-- Activity Details -->
      <div class="flex text-center mt-3">
        <div class="pr-20">
          <p class="text-neutral-400">Value</p>
          <div v-if="isEditing">
            <input
              v-model="editedValue"
              class="input input-sm"
              type="text"
            />
          </div>
          <h2 v-else class="font-medium text-neutral">{{ editedValue }}</h2>
        </div>
        <div>
          <p class="text-neutral-400">Unit</p>
          <div v-if="isEditing">
            <input
              v-model="editedUnit"
              class="input input-sm"
              type="text"
            />
          </div>
          <h2 v-else class="font-medium text-neutral">{{ editedUnit }}</h2>
        </div>
      </div>
  
      <!-- Edit Icon -->
      <div class="flex justify-end mt-3">
        <button @click="toggleEdit" class="text-neutral hover:text-accent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15.232 5.232a4 4 0 00-5.464 0L3 12.586V17h4.414l6.768-6.768a4 4 0 000-5.464z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19.428 15.342a1.5 1.5 0 00-2.121 0L16 17.293l3.414 3.414a1.5 1.5 0 002.121-2.121z" />
          </svg>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ExerciseTrackCard',
    props: {
      title: {
        type: String,
        default: 'Distance'
      },
      value: {
        type: String,
        default: '0'
      },
      unit: {
        type: String,
        default: 'km'
      }
    },
    data() {
      return {
        isEditing: false,
        editedValue: this.value,
        editedUnit: this.unit
      };
    },
    methods: {
      toggleEdit() {
        this.isEditing = !this.isEditing;
      }
    }
  };
  </script>
  