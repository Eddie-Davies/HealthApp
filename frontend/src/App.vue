<script setup>
// import Login from './components/Login.vue'
// import Signup from './components/Signup.vue'
// import router from './router.js';
</script>

<!-- OLD COMPONENTS (no router) -->
    <!-- <Signup/> -->
    <!-- <HelloWorld msg="Hello" /> -->

<template>
  <div id="app">
    <div class="auth-wrapper">
      <div class="auth-inner">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
// LATER USE THIS TO EXPORT navbar AND THINGS THAT ARE EACH AND EVERY PAGE
// export default {
//   name: 'App',
//     components: {
//       Signup,
//       Login
    
//     }
//   }
</script>