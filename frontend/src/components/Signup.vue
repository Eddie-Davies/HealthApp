<template>
    <div>
    <fieldset class="fieldset">
        <legend class="fieldset-legend">First Name</legend>
        <input type="text" v-model="firstname" class="input" placeholder="Enter First Name" />
    </fieldset>
    <fieldset class="fieldset">
        <legend class="fieldset-legend">Last Name</legend>
        <input type="text" v-model="lastname" class="input" placeholder="Enter Last Name" />
    </fieldset>
    <fieldset class="fieldset">
        <legend class="fieldset-legend">Email</legend>
        <input type="text" v-model="email" class="input" placeholder="Enter Email Address" />
    </fieldset>
    <button class="btn" @click="signup">Signup</button>
      {{ error }}
    </div>
  </template>

  <script></script>