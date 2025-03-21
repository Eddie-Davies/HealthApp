<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
  username: String
})

const count = ref(0)
</script>

<template>
  
  <p> HELLO THERE</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
