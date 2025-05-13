<template>
  <div class="card bg-base-300 rounded-box p-4 flex flex-col gap-3 mb-4">
    <!-- Top Row: Family Name and Members Count -->
    <div class="flex justify-between items-center">
      <h1 class="text-lg font-semibold text-neutral/80">{{ groupName }}</h1>
      <div class="flex items-center text-sm text-neutral-400 gap-1">
        <i class="mr-1 fa-solid fa-flag"></i>
        <span>{{ goalsCount }} Goals </span>
      </div>
    </div>

    <!-- Middle Row: Goals, Members, and Options Button -->
    <div class="flex justify-between items-start gap-4">
      <!-- Goals -->
      <div>
        <h2 class="text-md font-medium text-neutral-500 mb-1">No.</h2>
        <div class="text-neutral-400">{{ members.length }}</div>
      </div>

      <!-- Members List -->
      <div class="flex-1">
        <h2 class="text-md font-medium text-neutral-500 mb-1">Members</h2>
        <div class="flex flex-wrap gap-x-4 gap-y-1 text-neutral">
          <span
            v-for="(member, idx) in members"
            :key="idx"
            class="whitespace-nowrap"
          >
            {{ member }}
          </span>
        </div>
      </div>

      <!-- Options Button -->
      <div class="flex items-start">
        <button class="btn btn-neutral btn-soft rounded-3xl px-3 py-1 text-sm" @click="goToOptionsPage">
          Options
        </button>
      </div>
    </div>
  </div>

  <!-- Modals -->
  <GroupOptions
    v-if="showOptions"
    :groupName="groupName"
    :groupId="groupId"
    @cancel="showOptions = false"
    @view-members="showMembers = true; showOptions = false"
  />

  <MemberManagement
  v-if="showMembers"
  :groupName="groupName"
  :groupId="groupId"
  :members="members"
  @go-back="showMembers = false; showOptions = true"
/>
</template>

<script>
import GroupOptions from './GroupOptions.vue';
import MemberManagement from './MemberManagement.vue';

export default {
  name: 'GroupCard',
  components: {
    GroupOptions,
    MemberManagement
  },
  props: {
    groupName: {
      type: String,
      required: true
    },
    groupId: {
      type: String,
      required: true
    },
    goalsCount: {
      type: Number,
      default: 2
    },
    members: {
      type: Array,
      default: () => ['']
    }
  },
  data() {
    return {
      showOptions: false,
      showMembers: false
    };
  },
  methods: {
    goToOptionsPage() {
      this.showOptions = true;
    }
  }
};
</script>
