<template>
  <div class="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50" @click.self="$emit('go-back')">
    <div class="bg-base-200 p-6 rounded-xl w-96">
      <h2 class="text-lg font-semibold mb-4 text-center">{{ groupName }}</h2>

      <!-- Members List -->
      <div class="max-h-32 overflow-y-auto mb-4 rounded p-2 w-full bg-base-100 shadow-inner">
        <ul>
          <li
            v-for="(member, index) in members"
            :key="index"
            class="mb-2 border-b border-base-300 pb-1"
          >
            {{ member }}
          </li>
        </ul>
      </div>

      <!-- Add Member Input -->
      <div class="w-full mb-3">
        <label class="block text-sm mb-1 font-medium ml-2">Add Member by Username</label>
        <input
          v-model="newMemberUsername"
          type="text"
          class="input input-bordered w-full"
          placeholder="Enter username"
        />
      </div>

      <!-- Error or Success -->
      <div v-if="statusMessage" :class="statusClass" class="text-sm mb-3 text-center">
        {{ statusMessage }}
      </div>

      <!-- Buttons -->
      <div class="flex justify-between w-full">
        <button class="btn btn-primary" @click="addMember">Add Member</button>
        <button class="btn btn-ghost" @click="$emit('go-back')">Go Back</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MemberManagement',
  props: {
    groupName: {
      type: String,
      required: true
    },
    members: {
      type: Array,
      default: () => []
    },
    groupId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      newMemberUsername: '',
      statusMessage: '',
      isError: false
    };
  },
  computed: {
    statusClass() {
      return this.isError ? 'text-error' : 'text-success';
    }
  },
  methods: {
    async addMember() {
      if (!this.newMemberUsername) {
        this.statusMessage = 'Please enter a username.';
        this.isError = true;
        return;
      }

      try {
        const res = await axios.put('/groupsPage/addMember', {
          groupId: this.groupId,
          newMemberUsername: this.newMemberUsername
        });
        this.statusMessage = res.data.message;
        this.isError = false;
        this.newMemberUsername = '';
      } catch (err) {
        console.error('❌ Failed to add member:', err);
        this.statusMessage = err.response?.data?.message || 'Error adding member';
        this.isError = true;
      }
    }
  }
};
</script>
