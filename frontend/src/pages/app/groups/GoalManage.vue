<template>
    <div class="fixed inset-0 bg-black/90 flex items-center justify-center z-50" @click.self="$emit('close')">
      <div class="bg-base-200 p-6 rounded-xl w-[90%] max-w-md space-y-4">
        <h2 class="text-lg font-semibold text-center">Manage Goals – {{ groupName }}</h2>
        <div v-if="goals.length">
          <div v-for="goal in goals" :key="goal._id" class="p-3 bg-base-100 rounded-lg mb-3 shadow">
            <div class="font-semibold">{{ goal.description }}</div>
            <div class="text-sm text-neutral-500">Target: {{ goal.target }} {{ goal.unit }}</div>
            <div class="text-sm">{{ goal.type }}</div>

            <div class="flex justify-end gap-2 mt-2">
              <button class="btn btn-sm btn-success" @click="addToMyGoals(goal._id)">⬇️</button>
              <button class="btn btn-sm btn-error" @click="deleteGoal(goal._id)">🗑️</button>
            </div>
          </div>
        </div>
        <div v-else class="text-center text-sm text-neutral-400">No group goals found.</div>
        <div class="text-center mt-4">
          <button class="btn btn-sm btn-ghost" @click="$emit('close')">Close</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    props: {
      groupId: String,
      groupName: String
    },
    data() {
      return {
        goals: []
      };
    },
    async mounted() {
      try {
        const res = await axios.get(`/groupsPage/${this.groupId}/goals`);
        this.goals = res.data.goals;
      } catch (err) {
        console.error('Error fetching group goals:', err);
      }
    },
    methods: {
      async addToMyGoals(goalId) {
        try {
          await axios.post(`/goals/accept/${this.groupId}/${goalId}`);
          alert('Goal added to your goals!');
        } catch (err) {
          console.error('Error adding to my goals:', err);
        }
      },
      async deleteGoal(goalId) {
        if (!confirm('Delete this goal from the group? This will delete it for Everyone who has not downloaded it!')) return;
        try {
          await axios.delete(`/groups/${this.groupId}/goal/${goalId}`);
          this.goals = this.goals.filter(g => g._id !== goalId);
        } catch (err) {
          console.error('Error deleting group goal:', err);
        }
      }
    }
  };
  </script>
  