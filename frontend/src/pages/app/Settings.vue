<template>
    <div class="min-h-screen bg-base-100">
      <PageHeader :title="$route.meta.title" />
      <div class="px-4 py-3 mt-20">
        <!-- Settings Menu Items -->
        <div class="bg-base-100 rounded-box shadow">

          <router-link to="/username" class="flex items-center justify-between p-4 border-b border-base-200 cursor-pointer">
            <div class="flex items-center">
              <i class="fas fa-user text-primary w-6"></i>
              <span class="ml-4 text-base-content">Change Username</span>
            </div>
            <i class="fas fa-chevron-right text-base-content opacity-50"></i>
          </router-link>
          
          <router-link to="/email" class="flex items-center justify-between p-4 border-b border-base-200 cursor-pointer">
            <div class="flex items-center">
                <i class="fas fa-envelope text-primary w-6"></i>
              <span class="ml-4 text-base-content">Change Email</span>
            </div>
            <i class="fas fa-chevron-right text-base-content opacity-50"></i>
          </router-link>
          
          <router-link to="/password" class="flex items-center justify-between p-4 border-b border-base-200 cursor-pointer">
            <div class="flex items-center">
              <i class="fas fa-key text-primary w-6"></i>
              <span class="ml-4 text-base-content">Change Password</span>
            </div>
            <i class="fas fa-chevron-right text-base-content opacity-50"></i>
          </router-link>
          
          <router-link to="/privacy" class="flex items-center justify-between p-4 border-b border-base-200 cursor-pointer">
            <div class="flex items-center">
              <i class="fas fa-lock text-primary w-6"></i>
              <span class="ml-4 text-base-content">Privacy & Security</span>
            </div>
            <i class="fas fa-chevron-right text-base-content opacity-50"></i>
          </router-link>
          
          <router-link to="/support" class="flex items-center justify-between p-4 border-b border-base-200 cursor-pointer">
            <div class="flex items-center">
              <i class="fas fa-headphones text-primary w-6"></i>
              <span class="ml-4 text-base-content">Help and Support</span>
            </div>
            <i class="fas fa-chevron-right text-base-content opacity-50"></i>
          </router-link>
          
          <router-link to="/about" class="flex items-center justify-between p-4 border-b border-base-200 cursor-pointer">
            <div class="flex items-center">
              <i class="fas fa-info-circle text-primary w-6"></i>
              <span class="ml-4 text-base-content">About</span>
            </div>
            <i class="fas fa-chevron-right text-base-content opacity-50"></i>
          </router-link>
          
          <router-link to="/delete" class="flex items-center justify-between p-4 border-b border-base-200 cursor-pointer">
            <div class="flex items-center">
              <i class="fas fa-circle-user text-primary w-6"></i>
              <span class="ml-4 text-error">Delete Account</span>
            </div>
            <i class="fas fa-chevron-right text-base-content opacity-50"></i>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import PageHeader from '../../components/header/PageHeader.vue';
  
  export default {
    name: 'Settings',
    components: {
      PageHeader,
    }
  }
  </script>