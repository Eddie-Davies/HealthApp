<template>
  <swiper
    loop
    :pagination="{
      dynamicBullets: false,
      clickable: true,
      bulletActiveClass: '!bg-secondary !opacity-100'
    }"
    :keyboard="{
      enabled: true,
    }"
    :touchEventsTarget="'container'"
    :modules="modules"
    class="mySwiper">
    
    <!-- Single swiper-slide that shows all types of goals -->
    <swiper-slide v-for="(slide, index) in slides" :key="index">
      <div class="flex-grow flex flex-col">
        <PageHeader :title="slide.title" />
        <div class="mt-20 pb-5">
          <div class="flex justify-center">
            <div v-if="slide.goals.length" class="grid max-[345px]:grid-cols-1 grid-cols-2 cols-850-3 cols-1150-4 gap-6 justify-items-center">
              <GoalCard 
                v-for="goal in slide.goals"
                :key="goal._id"
                :target="goal.target"
                :progress="goal.progress"
                :progressLabel="goal.progressLabel"
                :remainingLabel="goal.remainingLabel"
                :unit="goal.unit"
                :type="goal.type"
                :date="goal.date"
                :sport="goal.sport"
                :colour="slide.colour"
                @edit="openEditor(goal, false, slide.group)" />
            </div>
            <div v-else class="flex justify-center items-center text-center text-lg text-base-content/80 ">
              <div class="tooltip" data-tip="Click the button below :)">
                <div class="btn cursor-default">Add some new goals to start tracking!</div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-10 mb-40 flex flex-wrap justify-center">
          <GoalNew :group="slide.group" @new-goal="createNewGoal(slide.group)" />
        </div>
      </div>
    </swiper-slide>
  </swiper>

  <GoalGroupAlert v-if="showAlert" @continue="confirmSaveApproved" @cancel="cancelSave" />
  <GoalDescriptionAlert v-if="showDescriptionBox" @continue="confirmDescriptionApproved" @cancel="cancelDescription"></GoalDescriptionAlert>
  <GoalDeleteAlert v-if="confirmingDelete" @confirm="confirmDeleteApproved" @cancel="cancelDelete"></GoalDeleteAlert>

  <GoalEdit
    v-if="editingGoal"
    :goal="editingGoal"
    :isNew="isNewGoal"
    @save="descriptionPrompt"
    @confirm-delete="confirmDeleteGoal"
    @cancel="editingGoal = null"
  />

</template>

<style>
@media (min-width: 600px) {
  .cols-850-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (min-width: 1150px) {
  .cols-1150-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
html, body {
  -webkit-overflow-scrolling: touch;
}

/* DEBUG: */
/* .swiper {
 background-color: rgb(64, 114, 62);
} */

.swiper-slide {
  /* overflow-y: visible; allow scrolling when content is taller */
  display: flex;
  flex-direction: column;
}
/* .swiper-pagination-bullet-active {
     background-color: bg-green !important;
} */

/* MAYBE */
/* .swiper-pagination-bullet {
  background-color: rgb(160, 160, 160) !important;
  opacity: 100% !important;
} */
.swiper-pagination {
  margin-top: 100px;
  margin-bottom: 100px
}
</style>

<script>
import axios from 'axios';

import GoalCard from './GoalCard.vue';
import PageHeader from '../../../components/header/PageHeader.vue';
import GoalNew from './GoalNew.vue';
import GoalEdit from './GoalEdit.vue';
import GoalGroupAlert from './GoalGroupAlert.vue';
import GoalDeleteAlert from './GoalDeleteAlert.vue';
import GoalDescriptionAlert from './GoalDescriptionAlert.vue';


import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';

export default {
  name: 'Goals',
  components: {
    Swiper,
    SwiperSlide,
    GoalCard,
    GoalNew,
    GoalEdit,
    GoalGroupAlert,
    GoalDeleteAlert,
    GoalDescriptionAlert,
    PageHeader
  },
  setup() {
    return {
      modules: [Pagination, Keyboard],
    }
  },
  data() {
    return {
      user: null,
      goals: [],
      groups: [],
      editingGoal: null,
      pendingGoal: null,
      goalPendingDelete: null,
      isNewGoal: false,
      confirmingDelete: false,
      showAlert: false,
      showDescriptionBox: false,
      goalDescription: false
    };
  },
  computed: {
    // Create slides array for the swiper
    slides() {
      const slides = [];
      
      // Add personal goals slide
      slides.push({
        title: this.$route.meta.title,
        goals: this.personalGoals,
        group: null,
        colour: 'text-secondary'
      });

      const colourList = [
        'text-success', // bright-green
        'text-info', // bright-blue
        'text-warning', // dark-orange
        'text-error', // dark-red

      ];
      
      // Add group slides
      this.groups.forEach((group, index) => {
        const colour = colourList[index % colourList.length]; 
        console.log(group._id)
        slides.push({
          title: `${group.name} Goals`,
          goals: this.groupedGoals[group._id] || [],
          group: group._id,
          colour: colour
        });
      });
      
      return slides;
    },
    // Creates grouped goals and personal for use in slider.
    groupedGoals() {
      const result = {};
      this.groups.forEach(group => {
        result[group._id] = this.goals.filter(goal => String(goal.group) === String(group._id));
      });
      return result;
    },
    
    personalGoals() {
      return this.goals.filter(goal => !goal.group);
    }
  },

  async mounted() {
    // Get user Goals
    try {
      const res = await axios.get('/goals');
      this.goals = res.data.goals;
    } catch (err) {
      console.error('Error fetching goals:', err.response?.data);
    }
    console.log('GOALS:', this.goals.map(g => ({ id: g._id, group: g.group })));


    // Get user Groups
    try {
      const res = await axios.get('/groups')
      this.groups = res.data.groups;
      console.log('Groups:',this.groups)
    } catch(err) {
      console.error('Error fetching groups:', err.response?.data)
    }
    
  },
  methods: {
    toTitleCase(str) { // for use to convert poorly formatted group names. Possibly move this to backend checking when choosing group name in the first place.
      return str.replace(/\w\S*/g, word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    },

    continueToGoalEditor() {
      this.editingGoal = { ...this.pendingGoal };
      this.pendingGoal = null;
      this.showAlert = false;
    },

    openEditor(goal, isNew = false, groupId = null) {
      this.editingGoal = { ...goal, group: groupId }; // sets editing goal to NOT null, meaning the edit page shows. Group name ensures its saved to correct location, defaults to NULL = no group
      this.isNewGoal = isNew;
    },
// GOAL SAVING
    async saveGoal(updatedGoal) {
      console.log('Save Goal (description):', this.description)
      console.log('Updated goal group', updatedGoal.group)
      const alreadyExists = !!updatedGoal._id;
      try {
        let savedGoal;
        if (alreadyExists) {
          // Update existing goal in database
          const res = await axios.put(`/goals/update/${updatedGoal._id}`, updatedGoal);
          savedGoal = res.data.goal;
        } else {
          // Create new goal in database
          const res = await axios.post('/goals/new', updatedGoal);
          savedGoal = res.data.goal;
          updatedGoal._id = savedGoal._id;

          if (updatedGoal.group){
            // If a new group goal, also update the Group Goal Database.
            try {
              const groupGoal = {
                ...updatedGoal,
                description: this.description
              };
              delete groupGoal.progress // Progress isn't synced for group goals.
              const groupId = groupGoal.group
              const res = await axios.post(`/groups/${groupId}/new-goal`, groupGoal)
              console.log('Posted new group goal:', res.data)
            } catch (err){
              console.error('Error posting group goal:', err.response?.data || err);
            }
          }
          // Push to local goals array since it's new
          this.goals.push(updatedGoal);
        }

        // Update or replace locally if already in array
        const index = this.goals.findIndex(g => g._id === savedGoal._id);
        if (index !== -1) {
          this.goals[index] = { ...savedGoal };
        }
        this.editingGoal = null;
      } catch (err) {
        console.error('Error saving goal:', err.response?.data || err.message);
      }
    },
    descriptionPrompt(goal){
      console.log(goal)
      if (goal.group && this.isNewGoal){      
        this.pendingGoal = goal
        this.editingGoal = null;
        console.log(this.pendingGoal)
        this.showDescriptionBox = true;}
      else {
      console.log('Saving goal with group ID:', goal.group);

        this.confirmSaveGoal(goal)
      }

    },

    cancelDescription() {
      this.editingGoal = this.pendingGoal
      this.pendingGoal = null;
      this.showDescriptionBox = false;
    },

    confirmDescriptionApproved(description){
      this.showDescriptionBox = false;
      this.description = description
      this.confirmSaveGoal(this.pendingGoal)

    },

    confirmSaveGoal(goal) {
      this.editingGoal = null;

      if (goal.group && this.isNewGoal){ 
        this.pendingGoal = goal;
        this.showDescriptionBox = false
        this.showAlert = true;
      } else {
        this.showAlert = false;
        this.saveGoal(goal)
      }
    },
    confirmSaveApproved() {
      this.saveGoal(this.pendingGoal);
      this.pendingGoal = null;
      this.showAlert = false;
    },

    cancelSave() {
      this.editingGoal = this.pendingGoal
      this.pendingGoal = null;
      this.showAlert = false;
    },

    // GOAL DELETION
    confirmDeleteGoal(goal) {
      this.editingGoal = null;

      if (goal.group) {
        // Show group goal warning 
        this.goalPendingDelete = goal;
        this.confirmingDelete = true;
      } else {
        // Personal goal – skip deletion warning
        this.deleteGoal(goal);
      }
    },

    confirmDeleteApproved() {
      this.deleteGoal(this.goalPendingDelete);
      this.goalPendingDelete = null;
      this.confirmingDelete = false;
    },

    cancelDelete() {
      this.editingGoal = this.goalPendingDelete
      this.goalPendingDelete = null;
      this.confirmingDelete = false;
    },

    async deleteGoal(goalToDelete) {
      try {
        // Pass goal id to backend for deletion.
        await axios.delete(`/goals/${goalToDelete._id}`);

        // Remove goal from local array.
        this.goals = this.goals.filter(g => g._id !== goalToDelete._id);

        // Exit editing mode
        this.editingGoal = null;
      } catch (err) {
        console.error('Error deleting goal:', err.response?.data || err);
      }
    },

    // GOAL CREATION
    createNewGoal(groupId = null) {
  
      const newGoal = {
        target: 10,
        progress: 0,
        progressLabel: 'Progress',
        remainingLabel: 'Remaining',
        unit: 'units',
        sport: false,
        group: groupId,
        date: new Date()
      };
      this.openEditor(newGoal, true, groupId);
    }
      }
    };
</script>