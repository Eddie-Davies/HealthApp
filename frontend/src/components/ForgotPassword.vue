<template>
    <div class="flex flex-start bg-base-200 text-neutral">
      <!-- Navbar -->
      <div class="navbar hero bg-base-200 text-primary">
        <div class="flex-1 px-2 text-lg font-bold">
          <a @click="$router.push('/')" class="link link-hover">Blossom</a>
        </div>
      </div>
    </div>
    
    <div class="hero bg-base-200 min-h-screen flex items-center justify-center">
      <div class="hero-content flex flex-col items-center w-full max-w-[90%] md:max-w-lg">
        <div class="text-center">
          <h1 class="text-5xl font-bold">Forgot Password?</h1>
        </div>
  
        <div class="card bg-base-100 w-full max-w-sm sm:w-[90%] md:w-full shadow-2xl mt-10">
          
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
            <fieldset class="fieldset">
              <label class="fieldset-label">Email</label>
              <label class="input w-full">
                <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input type="email" v-model="email" placeholder="mail@site.com" required class="w-full"/>
              </label>
              
              <button class="btn btn-neutral mt-4 w-full">Reset Password</button>
            </fieldset>
                </form>
          </div>
        </div>
  
      <div v-if="errorMessage" role="alert" class="alert alert-warning mt-12">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{{ errorMessage }}</span>
          </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  export default {
    name: 'ForgotPassword',
    data() {
      return {
        email: '',
        errorMessage: ''
      }
    },
    methods: {
  
      async handleSubmit() {
        try {
          const response = await axios.post('forgotPassword', {
            email: this.email,
          });
  
          console.log('Full backend response:', response); // Log full response
  
          if (response.data) {
            console.log("success");
          } else {
            console.error('Unexpected response format:', response);
            this.errorMessage = "Unexpected response format.";
          }
  
        } catch (error) {
          if (error.response) {
        if (error.response.status === 401) {
          console.error("Password Reset Failed:", error.response.data.message);
          this.errorMessage = "Invalid email.";
        } else if (error.response.status === 500) {
          console.error("Server error:", error.response.data.message);
          this.errorMessage = "Server error. Please try again later.";
        } else {
          this.errorMessage = error.response?.data?.message || "Something went wrong.";
        }
      } else {
        this.errorMessage = "Network error. Please check your connection.";
      }
      console.error('Error in handleSubmit():', error.response?.data || error.message);
    }
      }
    }
  }
  </script>
  

