<template>
  <div class="fixed inset-0 bg-black/90 flex items-center justify-center z-50" @click.self="$emit('cancel')">
    <div class="bg-base-200 p-6 rounded-xl w-80 space-y-4">
      <h2 class="text-lg font-semibold text-center">{{ groupName }}</h2>
      <div class="flex flex-col gap-2">
        <button class="btn btn-sm btn-primary w-full" @click="goToMembers">View Members</button>
        <button class="btn btn-sm btn-secondary w-full" @click="showManageGoals = true">Manage Goals</button>
        <button class="btn btn-sm btn-warning w-full" @click="leaveGroup">Leave Group</button>
        <button class="btn btn-sm btn-error w-full" @click="deleteGroup">Delete Group</button>
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
  components: { GoalManagement },
  props: {
    groupName: String,
    groupId: String
  },
  data() {
    return {
      showManageGoals: false
    };
  },
  methods: {
    goToMembers() {
      this.$emit('view-members');
    },
    async leaveGroup() {
      const confirmed = window.confirm(`Leave "${this.groupName}"?`);
      if (!confirmed) return;
      try {
        await axios.put('/groupsPage/leaveGroup', { groupId: this.groupId });
        this.$emit('cancel');
        window.location.reload();
      } catch (err) {
        console.error('Leave group error:', err);
      }
    },
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
