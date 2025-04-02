<template>
  <div>
    <!-- NOTE: V-MODEL CAUSING THE CONSOLE ERRORS without the returns-->
    <form @submit.prevent="handleSubmit">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">First Name</legend>
        <input type="text" v-model="first_name" class="input" placeholder="Enter First Name" />
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Last Name</legend>
        <input type="text" v-model="last_name" class="input" placeholder="Enter Last Name" />
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Email</legend>
        <input type="text" v-model="email" class="input" placeholder="Enter Email Address" />
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Password</legend>
        <input type="password" v-model="password" class="input" placeholder="Enter a strong password" />
      </fieldset>
      <!-- <button class="btn" @click="signup">Signup</button>
      {{ error }} -->

      <button class="btn">Signup</button>
      <div v-if="errorMessage" role="alert" class="alert alert-warning mt-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>{{errorMessage}}</span>
      </div>
      
    </form>
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