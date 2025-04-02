<template>
  <div class="flex flex-start bg-base-200 text-neutral">
    <!-- "Navbar" -->
    <div class="navbar hero bg-base-200 text-primary">
      <div class="flex-1 px-2 text-lg font-bold">Blossom</div>
    </div>
  </div>
  
  <div class="hero bg-base-200 min-h-screen">
    <div class="hero-content flex-col lg:flex-col"> <!-- Changed to flex-col for vertical stacking -->
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Login!</h1>
      </div>
      <form @submit.prevent="handleSubmit">
      <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl min-w-[23rem] mt-10">
        <div class="card-body">
          <fieldset class="fieldset">
            <label class="fieldset-label">Email</label>
            <input type="email" v-model="email" class="input" placeholder="Email" />
            <label class="fieldset-label">Password</label>
            <input type="password" v-model="password" class="input" placeholder="Password" />
            <div><a class="link link-hover">Forgot password?</a></div>
            <button class="btn btn-neutral mt-4">Login</button>
          </fieldset>
        </div>
      </div>
      </form>
    </div>
  </div>
  <div v-if="errorMessage" role="alert" class="alert alert-warning mt-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>{{errorMessage}}</span>
      </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },
methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('login', {
          email: this.email,
          password: this.password
        });

        console.log('Full backend response:', response); // Log full response

        if (response.data && response.data.token) {
          localStorage.setItem('token', response.data.token);
          console.log('Token stored successfully:', response.data.token);
          this.$router.push('/home');
        } else {
          console.error('Token not received from backend', response.data);
        }

      } catch (error) {
          if (error.response && error.response.status === 401) {
              console.error("Login failed:", error.response.data.message);
              this.errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
          } else {
              console.error("An error occurred:", error);
              alert("Something went wrong. Please try again later.");
              this.errorMessage = "Something went wrong. Please try again later.";
          }
        
        console.error('Error in handleSubmit():', error.response?.data || error.message);
      }
    }
}
