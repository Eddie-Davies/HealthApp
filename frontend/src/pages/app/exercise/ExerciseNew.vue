<!-- Component button for creating new Exercise -->
<template>
  <div class="flex items-center justify-center py-4"> 
    <button class="btn btn-neutral" @click="$emit('start')">
      Start Exercise
    </button>
  </div>
</template>

<script>
export default {
  name: 'ExerciseNew',
};
</script>