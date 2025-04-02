<template>
  <div class="flex flex-start bg-base-200 text-neutral">
    <!-- "Navbar" -->
    <div class="navbar hero bg-base-200 text-primary">
      <div class="flex-1 px-2 text-lg font-bold">
        <a @click="$router.push('/')" class="link link-hover">Blossom</a>
      </div>
    </div>
  </div>
  
  <div class="hero bg-base-200 min-h-screen flex items-center justify-center">
    <div class="hero-content flex flex-col items-center w-full max-w-[90%] md:max-w-lg"> 
      <div class="text-center">
        <h1 class="text-5xl font-bold">Sign up!</h1>
      </div>

      <div class="card bg-base-100 w-full max-w-sm sm:w-[90%] md:w-full shadow-2xl mt-10">
        <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <fieldset class="fieldset">
            <label class="fieldset-label">First Name</label>
            <input v-model="first_name" @input="validateField('first_name')" type="text" required placeholder="First Name" minlength="2" pattern="^[a-zA-Z]{2,30}$" class="input validator w-full"/>
            <div v-if="errors.first_name" class="validator-hint">{{errors.first_name}}</div>

            <label class="fieldset-label">Last Name</label>
            <input v-model="last_name" @input="validateField('last_name')" type="text" required placeholder="Last Name" minlength="2" pattern="^[a-zA-Z]{2,30}$" class="input validator w-full"/>
            <div v-if="errors.last_name" class="validator-hint">{{errors.last_name}}</div>

            <label class="fieldset-label">Email</label>
            <label class="input validator w-full">
              <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input v-model="email" @input="validateField('email')" type="email" placeholder="mail@site.com" required class="w-full"/>
            </label>
            <div v-if="errors.email" class="validator-hint hidden">{{errors.email}}</div>

            <label class="fieldset-label">Password</label>
            <label class="input validator w-full">
              <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                </g>
              </svg>
              <input v-model="password" @input="validateField('password')" type="password" required placeholder="Password" minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" class="w-full" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"/>
            </label>
            <div v-if="errors.password" class="validator-hint">{{errors.password}}</div>
            <div><a class="link link-hover">Forgot password?</a></div>
            <button class="btn btn-neutral mt-4 w-full">Sign up</button>
            <div><a @click="$router.push('/login')" class="link link-hover">Already have an account?</a></div>
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
      
      errors: {
        first_name: null,
        last_name: null,
        email: null,
        password: null,
      },
    }
  },
  methods: {
    validateField(field) {
      if (field === "first_name") {
        if (!this.first_name.match(/^[a-zA-Z]{2,30}$/)) {
          this.errors.first_name = "First name must be 2-30 letters";
        } else {
          this.errors.first_name = null;
        }
      }

      if (field === "last_name") {
        if (!this.last_name.match(/^[a-zA-Z]{2,30}$/)) {
          this.errors.last_name = "Last name must be 2-30 letters";
        } else {
          this.errors.last_name = null;
        }
      }

      if (field === "email") {
        if (!this.email.match(/^[\w.-]+@[\w.-]+\.(com)$/)) {
          this.errors.email = "Enter a valid email address";
        } else {
          this.errors.email = null;
        }
      }

      if (field === "password") {
        if (!this.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
          this.errors.password = "Password must be 8+ characters, including 1 number, 1 uppercase, and 1 lowercase letter";
        } else {
          this.errors.password = null;
        }
      }
    },

    async handleSubmit() {
      // POST DATA TO BACKEND
      const response = await axios.post('signup', {
        first_name: this.first_name,
        last_name: this.first_name,
        email: this.email,
        password: this.password,
      });

      console.log(response)
      console.log("Details have been submitted!")
      this.$router.push('/login');
    }
  }
}
</script>