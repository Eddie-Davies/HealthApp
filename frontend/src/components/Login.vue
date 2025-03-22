<script setup>
import { ref } from 'vue'

defineProps({
  username: String
})
const count = ref(0)
</script>

<template>
<div class="flex items-center justify-center min-h-screen">
  <div class="card">
    <h1 class=" prose-xl font-bold justify-center">Log in to {{username}}</h1>

  <fieldset class="fieldset">
    <legend class="fieldset-legend">Username</legend>
    <input type="text" class="input" placeholder="Enter Username" />
    <p class="fieldset-label">Email works too!</p>
  </fieldset>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">Password</legend>
    <input type="password" class="input" placeholder="Enter Password" />
  </fieldset>
    </div>
    
</div>



</template>