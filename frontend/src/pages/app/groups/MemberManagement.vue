<template>
  <div class="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50" @click.self="$emit('go-back')">
    <div class="bg-base-200 p-6 rounded-xl w-96 space-y-6">
      <h2 class="text-lg font-semibold text-center">{{ groupName }}</h2>

      <!-- Members List -->
      <div class="max-h-40 overflow-y-auto mb-4 p-4 bg-base-100 shadow-inner rounded-lg">
        <ul class="space-y-2">
          <li
            v-for="(member, index) in members"
            :key="index"
            class="flex items-center justify-between py-2 px-4 bg-base-300 rounded-lg shadow-sm"
          >
            <span class="font-medium">{{ member }}</span>
          </li>
        </ul>
      </div>

      <!-- Add Member Input -->
      <div class="w-full mb-3">
        <label class="block text-sm font-medium ml-2 mb-3">Add Member by Username</label>
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
            <input v-model="newMemberUsername" placeholder="blossom123" required />
          </label>
        </div>
        <button class="btn btn-neutral join-item" @click="addMember" >Add member</button>
      </div>
      </div>

      <!-- Error or Success -->
      <div v-if="statusMessage" :class="statusClass" class="text-sm mb-3 text-center">
        {{ statusMessage }}
      </div>

      <!-- Buttons -->
      <div class="flex w-full mt-5">
        <button class="btn btn-neutral btn-soft" @click="$emit('go-back')">Go Back</button>
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
