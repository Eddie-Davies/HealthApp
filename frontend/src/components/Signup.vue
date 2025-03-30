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
          <fieldset class="fieldset">
            <label class="fieldset-label">First Name</label>
            <input type="text" class="input" placeholder="First Name" />
            <label class="fieldset-label">Last Name</label>
            <input type="text" class="input" placeholder="Last Name" />
            <label class="fieldset-label">Email</label>
            <input type="email" class="input" placeholder="Email" />
            <label class="fieldset-label">Password</label>
            <input type="password" class="input" placeholder="Password" />
            <div><a class="link link-hover">Forgot password?</a></div>
            <button class="btn btn-neutral mt-4">Signup</button>
          </fieldset>
        </div>
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
      password: ''
    }
  },
  methods: {
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
    }
  }


}
</script>