<template>
    <h1 
      class="text-xl font-bold bg-gradient-to-r from-secondary via-primary to-warning inline-block text-transparent bg-clip-text"
      :class="position === 'center' ? 'absolute top-4 left-1/2 transform -translate-x-1/2' : ''"
    >
      Blossom
    </h1>
  </template>
  
  <script>
  export default {
    name: 'BlossomTitle',
    props: {
      position: {
        type: String,
        default: 'left'  // 'left' or 'center'
      }
    }
  }
  </script>
  