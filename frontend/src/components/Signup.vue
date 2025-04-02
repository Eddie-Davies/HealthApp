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
        <h1 class="text-5xl font-bold">Signup!</h1>
      </div>
      
      <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl min-w-[23rem] mt-10">
        <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <fieldset class="fieldset">
            <label class="fieldset-label">First Name</label>
            <input type="text" v-model="first_name" class="input" placeholder="First Name" />
            <label class="fieldset-label">Last Name</label>
            <input type="text" v-model="last_name" class="input" placeholder="Last Name" />
            <label class="fieldset-label">Email</label>
            <input v-model="email" type="email" class="input" placeholder="Email" />
            <label class="fieldset-label">Password</label>
            <input v-model="password" type="password" class="input" placeholder="Password" />
            <div><a class="link link-hover">Forgot password?</a></div>
            <button class="btn btn-neutral mt-4">Signup</button>
          </fieldset>
         </form>
         
        </div>
      </div>
      <div v-if="errorMessage" role="alert" class="alert alert-warning mt-12">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{{errorMessage}}</span>
            </div>
    </div>
  </div>
</template>



<script>
import axios from 'axios';

export default {
  name: 'Signup',
  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      errorMessage: '' // Store error message
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.first_name || !this.last_name || !this.email || !this.password) {
        this.errorMessage = "All fields are required.";
        return;
      }
      try {
        // POST DATA TO BACKEND
        await axios.post('signup', {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
        });
      } catch (error) {
        console.error("Signup failed:", error.response?.data || error.message);
        this.errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
      }

      // console.log(response)
      console.log("Details have been submitted!")
      this.$router.push('/login');
    }
  }


}
</script>