<template>
  <div class="min-h-screen overflow-y-auto bg-base-100 px-4">
    <PageHeader :title="$route.meta.title" />
    
    <div class="mt-20 pb-16 flex flex-col items-center">
      <div class="flex items-center justify-center py-4">
        <button class="btn btn-neutral" @click="showModal = true">Create a Group</button>
      </div>

      <div class="mt-8 w-full max-w-md">
        <div v-if="groups.length > 0">
          <h2 class="text-xl font-semibold mb-4">Your Groups</h2>
          <FamilyCard
            v-for="(group, index) in groups"
            :key="index"
            :groupName="group.name"
            :groupId="group._id"
            :members="group.membersByID.map(m => m.username)"
            :goalsCount="group.goals?.length || 0"
          />
        </div>
        <div v-else class="tooltip flex justify-center items-center" data-tip="Click the button above :)">
          <button class="btn">Create a new group to start tracking!</button>
        </div>

        <!-- Group Invites Section -->
        <GroupInvites
          :invites="invites"
          @accept="acceptInvite"
          @deny="denyInvite"
        />
      </div>
    </div>

    <NewGroupModal 
      v-if="showModal" 
      @close="showModal = false" 
      @create="addGroup"
    />
  </div>
</template>

<script>
import PageHeader from '../../../components/header/PageHeader.vue';
import FamilyCard from './GroupCard.vue';
import NewGroupModal from './GroupNew.vue';
import GroupInvites from './GroupInvites.vue';

import axios from 'axios';

export default {
  name: 'Groups',
  components: {
    PageHeader,
    FamilyCard,
    NewGroupModal,
    GroupInvites,
  },
  data() {
    return {
      showModal: false,
      groups: [],
      members: [],
      goals : 0,
      invites: []
    };
  },
  methods: {
    async acceptInvite(groupId) {
    try {
      await axios.post(`/groups/accept/${groupId}`);
      this.invites = this.invites.filter(invite => invite._id !== groupId);
      // Optionally refresh groups
      const res = await axios.get('/groupsPage');
      this.groups = res.data.groups;
    } catch (err) {
      console.error('Error accepting invite:', err);
    }
  },
  async denyInvite(groupId) {
    try {
      await axios.post(`/groups/deny/${groupId}`);
      this.invites = this.invites.filter(invite => invite._id !== groupId);
    } catch (err) {
      console.error('Error denying invite:', err);
    }
  }
  },
  async mounted() {
  try {
    const response = await axios.get('/groupsPage');
    console.log(response.data);
    this.groups = response.data.groups;

    const inviteRes = await axios.get('/groupInvites');
    console.log(inviteRes.data);
    this.invites = inviteRes.data.invites;
  } catch (error) {
    console.error('Error fetching groups:', error);
  }
}

};
</script>
