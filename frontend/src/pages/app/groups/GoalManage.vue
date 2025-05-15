<template>
  <div class="fixed inset-0 bg-black/90 flex items-center justify-center z-50" @click.self="$emit('close')">
    <div class="bg-base-200 p-6 rounded-xl w-[90%] max-w-md space-y-4">
      <h2 class="text-lg font-semibold text-center">Manage Goals – {{ groupName }}</h2>      
      
      <!-- List of group goals -->
      <div 
        v-if="goals.length" 
        class="overflow-y-auto max-h-64 space-y-3">
        <div 
          v-for="goal in goals"
          :key="goal._id" 
          class="p-3 bg-base-100 rounded-lg shadow">
          <div class="flex justify-between items-center">
            <div>
              <div class="font-semibold">Goal Description: {{ goal.description }}</div>
              <div class="text-sm text-neutral/70">Goal Type: {{ goal.type }}</div>
              <div class="text-sm text-neutral/70">Goal Target: {{ goal.target }} {{ goal.unit }}</div>

              <!-- Conditional goal time display -->
              <div v-if="goal.type === 'activity' && goal.remainingLabel === 'Under'" class="text-sm text-neutral/70">
                Time Requirement: Under {{ goal.time }}
              </div>
              <div v-else-if="goal.type === 'activity' && goal.remainingLabel === 'Left'" class="text-sm text-neutral/70">
                Per {{ goal.time }}
              </div>
            </div>

            <!-- Action buttons: add or delete goal -->
            <div class="flex gap-3">
              <button 
                class="btn btn-success btn-soft rounded-full" 
                @click="addToMyGoals(goal._id)">
                <i class="fa-solid fa-download"></i>
              </button>
              <button 
                class="btn btn-error btn-soft rounded-full" 
                @click="deleteGoal(goal._id)">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center text-sm text-neutral-400">No group goals found.</div>

      <div class="flex w-full mt-5">
        <button class="btn btn-neutral btn-soft" @click="$emit('close')">Go Back</button>
      </div>
    </div>
  </div>
</template>



<script>
import axios from 'axios';
export default {
  // Props passed from parent component
  props: {
    groupId: String,
    groupName: String
  },
  data() {
    return {
      // Array used to store list of goals fetched for the selected group
      goals: []
    };
  },
  async mounted() {
    try {
      // Fetch all goals for given group
      const res = await axios.get(`/groupsPage/${this.groupId}/goals`);
      this.goals = res.data.goals;
    } catch (err) {
      console.error('Error fetching group goals:', err);
    }
  },
  methods: {
    // Method to add a group goal to user's personal goal
    async addToMyGoals(goalId) {
      try {
        await axios.post(`/goals/accept/${this.groupId}/${goalId}`);
        alert('Goal added to your goals!');
      } catch (err) {
        console.error('Error adding to my goals:', err);
      }
    },
    // Method used to delete goal
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
