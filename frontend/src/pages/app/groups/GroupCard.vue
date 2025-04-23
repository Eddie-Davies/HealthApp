<template>
    <div class="card bg-base-300 rounded-box p-4 flex flex-col gap-3">
      <!-- Top Row: Family Name and Members Count -->
      <div class="flex justify-between items-center">
        <h1 class="text-lg font-semibold text-neutral/80">{{ familyName }}</h1>
        <div class="flex items-center text-sm text-neutral-400 gap-1">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M12 12a4 4 0 100-8 4 4 0 000 8z" />
          </svg>
          <span>{{ members.length }} members</span>
        </div>
      </div>
  
      <!-- Middle Row: Goals, Members, and Options Button -->
      <div class="flex justify-between items-start gap-4">
        <!-- Goals -->
        <div>
          <h2 class="text-md font-medium text-neutral-500 mb-1">Goals</h2>
          <div class="text-neutral-400">{{ goalsCount }}</div>
        </div>
  
        <!-- Members List -->
        <div class="flex-1">
          <h2 class="text-md font-medium text-neutral-500 mb-1">Members</h2>
          <div class="flex flex-wrap gap-x-4 gap-y-1 text-neutral">
            <span v-for="(member, idx) in members" :key="idx" class="whitespace-nowrap">
              {{ member }}
            </span>
          </div>
        </div>
  
        <!-- Options Button -->
        <div class="flex items-start">
          <button class="rounded px-3 py-1 text-sm hover:text-accent" @click="$emit('options-click')">
            Options
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GroupCard',
    props: {
      familyName: {
        type: String,
        default: 'The Family'
      },
      goalsCount: {
        type: Number,
        default: 4
      },
      members: {
        type: Array,
        default: () => ['Light Y', 'Misa A', 'Ryuk S', 'Misa A']
      }
    }
  }
  </script>