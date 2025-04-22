<template>
    <div class="p-2 fixed inset-0 bg-black/90 flex items-center justify-center z-[100000]" @click.self="$emit('cancel')">
      <div class="bg-base-200 py-10 px-6 rounded-xl w-96 text-center space-y-4">
        <div class="text-xl text-neutral text-center inline font-semibold mb-4">
          <i class="fa-solid fa-info-circle mr-2"></i>
          <span>Describe Group Goal</span>
        </div>
        <div class="text-sm text-base-content/70 mt-10">
            <p>Enter a short description/name for your new goal.</p><br>
            <p>Others in your group will see this when offered to accept the goal.</p>
        </div>
        <input type="text" placeholder="eg. eat an apple everyday for a week" class="input mt-10 mb-15" />
        <div class="w-full flex gap-3">
            <button class="btn btn-soft flex-1" style="flex: 1;" @click="$emit('cancel')">Back</button>
            <button class="btn btn-success flex-[2]" style="flex: 2;" @click="$emit('continue')">Save</button>
        </div>
      </div>
    </div>
  </template>

  

<script>
export default {
    name: 'GoalDescriptionAlert'
}
</script>