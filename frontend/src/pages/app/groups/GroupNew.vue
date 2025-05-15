<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 " @click.self="$emit('close')">
    <div class="bg-base-200 rounded-2xl shadow-xl p-6 w-full max-w-md">
      <h3 class="text-lg font-semibold mb-4 ml-2">Create New Group</h3>

      <!-- Group Name -->
      <label class="block mb-2 ml-2 text-sm">Group Name</label>
      <input
        v-model="name"
        type="text"
        class="input input-bordered w-full mb-4"
        placeholder="Enter group name"
      />

      <!-- Add Member -->
      <label class="block mb-2 text-sm ml-2">Add Member by Username</label>
      <div class="join">
        <div>
          <label class="input validator join-item max-w">
            <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input class="w-full" v-model="newMember" placeholder="blossom123" required />
          </label>
        </div>
        <button class="mb-10 btn btn-neutral join-item" @click="addMember" >Add member</button>
      </div>

      <!-- Member List -->
      <div v-if="members.length" class="max-h-32 overflow-y-auto mb-4 rounded p-2 bg-base-100">
        <ul>
          <li
            v-for="(member, index) in members"
            :key="index"
            class="mb-2"
          >
            <div class="flex justify-between items-center">
              <span>{{ member }}</span>
              <button @click="removeMember(index)" class="text-white hover:text-gray-300">&minus;</button>
            </div>
            <div class="h-px bg-gray-300 mt-1 w-full"></div>
          </li>
        </ul>
      </div>

      <!-- Error -->
      <div v-if="errorMessage" class="text-error text-sm mb-2 text-center">{{ errorMessage }}</div>

      <!-- Action Buttons -->
      <div class="flex justify-end gap-2">
        <div class="flex w-full">
        <button class="btn btn-neutral btn-soft" @click="$emit('close')">Go Back</button>
      </div>
      <div>
        <button class="btn btn-primary" @click="createGroup">Create</button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NewGroupModal',
  data() {
    return {
      name: '', // Name of new group
      newMember: '', // Temporary input for a username to invite
      members: [], // Array of username to invite
      errorMessage: '' // Errors shown to user
    };
  },
  methods: {
    // Method that adds a new (valid) username to the list of member you want to invite
    addMember() {
      const trimmed = this.newMember.trim(); // Trim input
      // If not empty and not in members list then add
      if (trimmed && !this.members.includes(trimmed)) {
        this.members.push(trimmed);
        this.newMember = ''; // Clear input field after adding
      }
    },
    // Method that removes a member
    removeMember(index) {
      this.members.splice(index, 1);
    },

    // Method to create a new group
    async createGroup() {
      this.errorMessage = '';

      if (!this.name.trim()) {
        this.errorMessage = 'Group name is required';
        return;
      }

      try {
        // Create group (creator is added by backend via token)
        const res = await axios.post('/groups/new', { name: this.name.trim() });
        const groupId = res.data.group._id;

        // Invite additional members
        for (const username of this.members) {
          try {
            await axios.put('/groupsPage/addMember', {
              groupId,
              newMemberUsername: username
            });
          } catch (err) {
            console.warn(`❌ Failed to invite ${username}:`, err.response?.data?.message || err);
          }
        }

        this.$emit('close');
        window.location.reload();
      } catch (err) {
        console.error('Group creation failed:', err);
        this.errorMessage = err.response?.data?.message || 'Error creating group';
      }
    }
  }
};
</script>
