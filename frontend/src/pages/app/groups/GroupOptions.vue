<template>
  <div class="fixed inset-0 bg-black/90 flex items-center justify-center z-50" @click.self="$emit('cancel')">
    <div class="bg-base-200 p-6 rounded-xl w-80 space-y-4">
      <h2 class="text-lg font-semibold text-center">{{ groupName }}</h2>

      <div class="flex flex-col gap-2">
        <button class="btn btn-sm btn-primary w-full" @click="goToMembers">View Members</button>
        <button class="btn btn-sm btn-secondary w-full" @click="updateGroupInfo">Manage Goals</button>
        <button class="btn btn-sm btn-warning w-full" @click="leaveGroup">Leave Group</button>
        <button class="btn btn-sm btn-error w-full" @click="deleteGroup">Delete Group</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'GroupOptions',
  props: {
    groupName: {
      type: String,
      required: true
    },
    groupId: {
      type: String,
      required: true
    }
  },
  methods: {
    goToMembers() {
      this.$emit('view-members');
    },
    updateGroupInfo() {
      console.log('Goals button clicked');
    },
    async leaveGroup() {
      const confirmed = window.confirm(`Are you sure you want to leave "${this.groupName}"?`);
      if (!confirmed) return;

      try {
        await axios.put('/groupsPage/leaveGroup', {
          groupId: this.groupId
        });
        console.log(`Left group: ${this.groupId}`);
        this.$emit('cancel');
        window.location.reload();
      } catch (err) {
        console.error('Failed to leave group:', err);
      }
    },
    async deleteGroup() {
      const confirmed = window.confirm(`⚠️ Are you sure you want to delete "${this.groupName}"? This cannot be undone.`);
      if (!confirmed) return;

      try {
        const res = await axios.put('/groupsPage/deleteGroup', {
          groupId: this.groupId
        });
        console.log(`Group deleted: ${this.groupId}`, res.data.message);
        this.$emit('cancel');
        window.location.reload();
      } catch (err) {
        console.error('Failed to delete group:', err.response?.data?.message || err);
        alert(err.response?.data?.message || 'Failed to delete group.');
      }
    }
  }
};
</script>
