<template>
  <form @submit.prevent="handleSubmit">
    <div class="flex items-center justify-center min-h-screen bg-[#191830]">
      <div class="box">
        <!-- <h1 class=" prose-xl font-bold flex items-center justify-center pb-5">Log in to {{username}}</h1> -->
        <h1 class="text-white prose-xl font-bold flex items-center justify-center pb-5">Log in to Account</h1>

        <fieldset class="fieldset">
          <legend class="fieldset-legend text-white">Email</legend>
          <input type="text" class="input" v-model="email" placeholder="Enter Email" />
          <!-- <p class="fieldset-label">Email works too!</p> -->
        </fieldset>
        <fieldset class="fieldset">
          <legend class="fieldset-legend text-white">Password</legend>
          <input type="password" class="input" v-model="password" placeholder="Enter Password" />
        </fieldset>
        <button class="btn">Log In</button>
        <button class="btn block mt-2">I forgot my password</button>

        <button class="btn bg-white text-black">
          <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
              <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
              <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
              <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
            </g>
          </svg>
          Login with Google
        </button>
        <div v-if="errorMessage" role="alert" class="alert alert-warning mt-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>{{errorMessage}}</span>
      </div>
      </div>
    </div>
  </form>
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


  
};
</script>