<template>
    <div class="p-2 fixed inset-0 bg-black/90 flex items-center justify-center z-50" @click.self="$emit('cancel')">
      <div class="bg-base-200 py-10 px-6 rounded-xl w-96 text-center space-y-4">
        <h2 class="text-xl font-bold">Creating Group Goal</h2>
        <p class="text-sm text-base-content/70 my-10">
          This goal will be shared with your group members via email.<br><br>Individual progress won't be shared.
        </p>
        <button class="btn btn-warning w-full" @click="$emit('continue')">I'm sure!</button>
        <button class="btn btn-soft w-full" @click="$emit('cancel')">Cancel</button>
      </div>
    </div>
  </template>

  

<script>
export default {
    name: 'GoalGroupAlert'
}
</script>