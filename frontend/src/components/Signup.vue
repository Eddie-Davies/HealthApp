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
  </form>
    </div>
  </template>

  <script>
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
      handleSubmit(){
        const data = {
          first_name: this.first_name,
          last_name: this.first_name,
          email: this.email,
          password: this.password,
        }
        console.log(data)
        console.log("Details have been submitted!")
      }
    }
  }
</script>