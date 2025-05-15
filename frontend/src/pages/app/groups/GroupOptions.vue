<template>
  <div class="fixed inset-0 bg-black/90 flex items-center justify-center z-50 " @click.self="$emit('cancel')">
    
    <div class="bg-base-200 p-8 rounded-2xl space-y-8 w-full max-w-md ">
      <h2 class="text-xl font-bold text-center">{{ groupName }}</h2>
      <!-- Action buttons: view members and manage goals -->
      <div class="flex flex-col space-y-4">
        <button class="btn btn-neutral btn-soft rounded-2xl" @click="goToMembers">View Members</button>
        <button class="btn btn-neutral btn-soft rounded-2xl" @click="showManageGoals = true">Manage Goals</button>
      </div>

      <!-- Go back and leave group -->
      <div class="flex justify-end">
        <div class="flex w-full">
        <button class="btn btn-neutral btn-soft" @click.self="$emit('cancel')">Go Back</button>
        </div>
        <button class="btn btn-error" @click="leaveGroup">Leave Group</button>
      </div>
    </div>
    <GoalManagement
      v-if="showManageGoals"
      :groupId="groupId"
      :groupName="groupName"
      @close="showManageGoals = false"
    />
  </div>
</template>

<script>
import axios from 'axios';
import GoalManagement from './GoalManage.vue';

export default {
  // Register GoalManagement to be used in the template
  components: { GoalManagement }, 
  props: {
    groupName: String, // Name of the group
    groupId: String // ID of the group
  },
  data() {
    return {
      showManageGoals: false
    };
  },
  methods: {
    // Method that emits an event to show members
    goToMembers() {
      this.$emit('view-members');
    },
    // Method to leave the current group
    async leaveGroup() {
      const confirmed = window.confirm(`Leave "${this.groupName}"?`); // Open confirm window
      if (!confirmed) return;
      try {
        await axios.put('/groupsPage/leaveGroup', { groupId: this.groupId });
        this.$emit('cancel'); // Close modal
        window.location.reload(); // Reload to update UI
      } catch (err) {
        console.error('Leave group error:', err);
      }
    },

    // Method to delete thr group after user confirmation
    async deleteGroup() {
      const confirmed = window.confirm(`Delete "${this.groupName}"?`);
      if (!confirmed) return;
      try {
        await axios.put('/groupsPage/deleteGroup', { groupId: this.groupId });
        this.$emit('cancel');
        window.location.reload();
      } catch (err) {
        console.error('Delete group error:', err);
      }
    }
  }
};
</script>
