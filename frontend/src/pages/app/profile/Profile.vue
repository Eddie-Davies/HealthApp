<template>
    <div class="">
      <!-- Page Title -->
      <PageHeader :title="$route.meta.title" />
  
      <!-- Member Since -->
      <p class="text-center mt-10 text-base-content/50">
        Member since 20/05/2025
      </p>
  
      <!-- Main Card Layout -->
      <div class="mt-10 grid justify-items-center space-y-6">
        
        <!-- Top Centered Card -->
        <div class="card bg-base-200 rounded-xl h-60 w-84 lg:h-84 lg:w-174"></div>

  
        <!-- Two Side-by-Side Cards -->
        <div class="grid grid-cols-2 gap-6">
          <div class="card bg-base-200 rounded-xl size-39 lg:size-84"></div>
          <div class="card bg-base-200 rounded-xl size-39 lg:size-84"></div>
        </div>
  
        <!-- Bottom Wide Card -->
        <div class="card bg-base-200 rounded-xl h-40 w-84 mb-30 lg:h-84 lg:w-174"></div>

      </div>
    </div>
  </template>
  

<script>
import PageHeader from '../../../components/header/PageHeader.vue';

export default {
    name: 'Profile',
    components: {
        PageHeader
    }
}</script>