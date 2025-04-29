<template>
  <div class="fixed inset-0 bg-black/90 flex items-center justify-center z-50" @click.self="$emit('cancel')">
    <div class="bg-base-200 p-6 rounded-xl w-80">
      <h2 class="text-lg font-semibold mb-4 text-center">{{ groupName }}</h2>
      <div class="flex flex-col items-center">
        <button class="btn btn-ghost mb-2" @click="goToMembers">Members</button>
        <button class="btn btn-ghost mb-2" @click="updateGroupInfo">Goals</button>
        <button class="btn btn-ghost mb-2" @click="$emit('cancel')">Leave</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupOptions',
  props: {
    groupName: {
      type: String,
      required: true
    }
  },
  methods: {
    goToMembers() {
      this.$emit('view-members');
    }
  }
}
</script>

