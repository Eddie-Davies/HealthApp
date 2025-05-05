<template>
  <PageHeader :title="$route.meta.title" />
  <div class="mt-20 px-4 pb-16 flex flex-col items-center">
    <div class="w-full max-w-md space-y-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold">Your Groups</h2>
        <button class="btn btn-sm btn-primary" @click="showModal = true">
          + New Group
        </button>
      </div>

      <FamilyCard
        v-for="(group, index) in groups"
        :key="index"
        :groupName="group.name"
        :members="group.members.map(m => `${m.first_name} ${m.last_name}`)"
        :goalsCount="group.goals?.length || 0"
      />
    </div>

    <!-- New Group Modal -->
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
import axios from 'axios';

export default {
  name: 'Groups',
  components: {
    PageHeader,
    FamilyCard,
    NewGroupModal
  },
  data() {
    return {
      showModal: false,
      groups: [],
      members: [],
      goals : 0,
    };
  },
  methods: {
    // addGroup(newGroup) {
    //   this.groups.push(newGroup);
    //   this.showModal = false;
    // },  
  },
  async mounted() {
    try {
      const response = await axios.get('/groups');
      console.log(response.data);
      this.groups = response.data.groups;
      this.members = response.data.members;
      this.goals = response.data.goals.count;
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  },
};
</script>