<template>
  <PageHeader :title="$route.meta.title" />
  <div class="mt-20 px-4 pb-16 flex flex-col items-center">
    <div class="flex items-center justify-center py-4">
          <button class="btn btn-neutral" @click="showModal = true">Create a Group</button>
    </div>
    <div class="mt-16 w-full max-w-md">
        <div v-if="groups.length > 0">
          <h2 class="text-xl font-semibold mb-4">Your Groups</h2>
          <FamilyCard
            v-for="(group, index) in groups"
            :key="index"
            :groupName="group.name"
            :members="group.membersByID.map(m => m.username)"
            :goalsCount="group.goals?.length || 0"
          />
          <NewGroupModal 
          v-if="showModal" 
          @close="showModal = false" 
          @create="addGroup"
        />
        </div>
        <div v-else class="tooltip flex justify-center items-center" data-tip="Click the button above :)">
          <button class="btn">Create a new group to start tracking!</button>
        </div>
    </div>
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
      const response = await axios.get('/groupsPage');
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
