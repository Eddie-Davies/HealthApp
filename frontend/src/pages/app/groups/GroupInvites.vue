<template>
    <div class="mt-12 w-full max-w-md px-4 mx-auto">
      <h2 class="text-xl font-semibold mb-4 text-center">Group Invites</h2>
      
      <!-- If there are invites, list them -->
      <div v-if="invites.length > 0" class="space-y-4">
        <div
          v-for="invite in invites"
          :key="invite._id"
          class="card bg-base-200 p-4 rounded-xl shadow flex flex-col gap-3"
        >
          <!-- Group name and member count -->
          <div class="text-center">
            <h3 class="font-semibold text-lg">{{ invite.name }}</h3>
            <p class="text-sm text-neutral-500">
              {{ invite.membersByID.length }} member(s)
            </p>
          </div>
          <!-- Accept/Deny buttons -->
          <div class="flex justify-center gap-4">
            <button class="btn btn-success btn-sm w-24" @click="acceptInvite(invite._id)">
            Accept
            </button>
            <button class="btn btn-error btn-sm w-24" @click="denyInvite(invite._id)">
            Deny
            </button>
          </div>
        </div>
      </div>
  
      <div v-else class="text-center text-neutral-400 text-sm mt-4">
        You have no pending invites.
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';

export default {
  name: 'GroupInvites',
  props: {
    // Invite prop from parent component, expected to be an array of group invatation objects
    invites: {
      type: Array,
      default: () => []
    }
  },
  // Component can emit custom events
  emits: ['accepted', 'denied'],
  methods: {
    // Method that allows a user to accept an invite 
    async acceptInvite(groupId) {
      try {
        // Send req to backend to accept inv for given group ID
        const res = await axios.put('/groupsPage/acceptInvite', {
          groupId
        });
        console.log('✅ Accepted:', res.data.message);
        this.$emit('accepted', groupId);
        window.location.reload();
      } catch (err) {
        console.error('❌ Error accepting invite:', err.response?.data?.message || err.message);
      }
    },
    // Method that allows a user to decline an invite
    async denyInvite(groupId) {
      try {
        const res = await axios.put('/groupsPage/declineInvite', {
          groupId
        });
        console.log('❌ Denied:', res.data.message);
        this.$emit('denied', groupId);
        window.location.reload();
      } catch (err) {
        console.error('❌ Error denying invite:', err.response?.data?.message || err.message);
      }
    }
  }
};
</script>

  