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
        :family-name="group.name"
        :members="group.members"
        :goals-title="group.goal || 'Goals'"
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
      groups: [
        { name: 'The Family', members: ['Light Y', 'Misa A', 'Ryuk S'], goal: 'Family Goals' },
        { name: 'Work Team', members: ['John D', 'Sarah M', 'Mike T'], goal: 'Q3 Objectives' },
        { name: 'Gym Buddies', members: ['Alex R', 'Jamie K'] }
      ],
      
    };
  },
  methods: {
    addGroup(newGroup) {
      this.groups.push(newGroup);
      this.showModal = false;
    }
  }
};
</script>