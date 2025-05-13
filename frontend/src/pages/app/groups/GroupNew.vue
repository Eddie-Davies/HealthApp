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

      <label class="block mb-2 text-sm ml-2">Add Member by Username</label>
      <div class="join w-full mb-10">
        <input 
          class="input input-bordered join-item w-full" 
          v-model="newMember" 
          placeholder="blossom123" 
          required />
        <button class="btn btn-neutral join-item" @click="addMember">Add member</button>
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
      name: '',
      newMember: '',
      members: [],
      errorMessage: ''
    };
  },
  methods: {
    addMember() {
      const trimmed = this.newMember.trim();
      if (trimmed && !this.members.includes(trimmed)) {
        this.members.push(trimmed);
        this.newMember = '';
      }
    },
    removeMember(index) {
      this.members.splice(index, 1);
    },
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
