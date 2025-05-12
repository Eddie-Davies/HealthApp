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
            <div v-if="slide.goals.length">
              <TransitionGroup
                name="goal-tiles"
                tag="div"
                class="grid max-[345px]:grid-cols-1 grid-cols-2 cols-850-3 cols-1150-4 gap-6 justify-items-center">
                <GoalCard
                  v-for="goal in slide.goals"
                  :key="goal._id"
                  :target="goal.target"
                  :progress="goal.progress"
                  :trackFrom="goal.trackFrom"
                  :progressLabel="goal.progressLabel"
                  :remainingLabel="goal.remainingLabel"
                  :unit="goal.unit"
                  :type="goal.type"
                  :date="goal.date"
                  :colour="slide.colour"
                  :maintainanceKcal="this.kcalIntake"
                  :currentWeight="this.weight"
                  @edit="openEditor(goal, false, slide.group)" />
              </TransitionGroup>
            </div>
            <div v-else class="flex justify-center items-center text-center text-lg text-base-content/80 ">
              <div class="tooltip" data-tip="Click the button below :)">
                <div class="btn cursor-default">Add some new goals to start tracking!</div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-10 mb-40 flex flex-wrap justify-center">
          <GoalNew :group="slide.group" @new-goal="showTypeSelect = slide.group" />
        </div>
      </div>
    </swiper-slide>
  </swiper>

  <GoalGroupAlert v-if="showAlert" @continue="confirmSaveApproved" @cancel="cancelSave" />
  <GoalDescriptionAlert v-if="showDescriptionBox" @continue="confirmDescriptionApproved" @cancel="cancelDescription">
  </GoalDescriptionAlert>
  <GoalDeleteAlert v-if="confirmingDelete" @confirm="confirmDeleteApproved" @cancel="cancelDelete"></GoalDeleteAlert>

  <GoalTypeSelect v-if="showTypeSelect || showTypeSelect == null" 
    :group="showTypeSelect"
    @cancel="showTypeSelect = false"
    @custom="createNewGoal"
    @diet="createNewGoal" />

  <DietGoalSelect v-if="showDietGoalSelect" 
  @cancel="showDietGoalSelect = false; showTypeSelect = true"
  @confirm="handleDietConfigComplete"
  :goal="tempGoal"/>

  <GoalEdit v-if="editingGoal" :goal="editingGoal" :isNew="isNewGoal" @save="descriptionPrompt"
    @confirm-delete="confirmDeleteGoal" @cancel="editingGoal = null" />
</template>

<style>
/* CUSTOM MEDIA QUERIES/SCREEN SIZES. CONTROLS HOW MANY TILES IN A LINE. */
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

html,
body {
  -webkit-overflow-scrolling: touch;
}

.swiper-slide {
  display: flex;
  flex-direction: column;
  /* OLD: overflow-y: visible; allow scrolling when content is taller */
}
.swiper-pagination {
  margin-top: 100px;
  margin-bottom: 100px
}
/* ANIMATION FOR TILES */
.goal-tiles-move, .goal-tiles-enter-active,.goal-tiles-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.goal-tiles-enter-from, .goal-tiles-leave-to {
  transform: scale(0);
  opacity: 0;
}

.goal-tiles-enter-to, .goal-tiles-leave-from {
  transform: scale(1);
  opacity: 1;
}

.goal-tiles-move {
  position: relative;
}

/* Ensure leaving elements stay in place during their exit animation */
.goal-tiles-leave-active {
  position: absolute;
}

/* Small delay so leaving elements start their animation first */
.goal-tiles-leave-active + .goal-tiles-move {
  transition-delay: 0.05s;
}
/* DEBUG: */
/* .swiper {
 background-color: rgb(64, 114, 62);
} */

/* .swiper-pagination-bullet-active {
     background-color: bg-green !important;
} */

/* MAYBE */
/* .swiper-pagination-bullet {
  background-color: rgb(160, 160, 160) !important;
  opacity: 100% !important;
} */

</style>

<script>
import axios from 'axios';
import { globalErrorMessage } from '../../../components/errorBanner/ErrorBanner.vue';

import GoalCard from './GoalCard.vue';
import PageHeader from '../../../components/header/PageHeader.vue';
import GoalNew from './GoalNew.vue';
import GoalEdit from './GoalEdit.vue';
import GoalGroupAlert from './GoalGroupAlert.vue';
import GoalDeleteAlert from './GoalDeleteAlert.vue';
import GoalDescriptionAlert from './GoalDescriptionAlert.vue';
import GoalTypeSelect from './GoalTypeSelect.vue';



import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
import DietGoalSelect from './DietGoalSelect.vue';

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
    GoalTypeSelect,
    DietGoalSelect,
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
      goalDescription: false,
      showTypeSelect: false,
      showDietGoalSelect: false,
      tempGoal: null,
      tempGroupId: null,
      kcalIntake: 0,
      weight: 0,
      errorMessage: ''
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

    try {
      const res = await axios.get('/weights');
      const weights = res.data;
      this.weight = weights.weight
      console.log('front weight', this.weight);
    } catch (err) {
      console.error('Error fetching user weight:', err.response?.data || err.message);
    }
    // Get user Groups
    try {
      const res = await axios.get('/groups')
      this.groups = res.data.groups;
      console.log('Groups:', this.groups)
    } catch (err) {
      console.error('Error fetching groups:', err.response?.data)
    }

    // GET DAILY MAINTAINANCE KCAL
    try {
        const res = await axios.get('/kcal-intake')
        this.kcalIntake = res.data;
        // console.log('Kcal Intake Reccommendation:', this.kcalIntake)
      } catch (err) {
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
    handleDietConfigComplete(configuredGoal) {
      this.showDietGoalSelect = false
      console.log(configuredGoal)
      // TODO: REVERT BACK TO THE LINE BELOW IF IT BREAKS LATER
      // this.openEditor(configuredGoal, true, this.tempGroupId);
      this.openEditor(configuredGoal, true, configuredGoal.group);
    },

    openEditor(goal, isNew = false, groupId = null) {
      this.editingGoal = { ...goal, group: groupId }; // sets editing goal to NOT null, meaning the edit page shows. Group name ensures its saved to correct location, defaults to NULL = no group
      this.isNewGoal = isNew;
    },
    // GOAL SAVING
    async saveGoal(updatedGoal) {
      console.log('Save Goal (description):', this.description);
      console.log('Updated goal group', updatedGoal.group);

      const alreadyExists = !!updatedGoal._id;

      try {
        let savedGoal;

        if (alreadyExists) {
          const res = await axios.put(`/goals/update/${updatedGoal._id}`, updatedGoal);
          savedGoal = res.data.goal;
        } else {
          try {
            const res = await axios.post('/goals/new', updatedGoal);
            savedGoal = res.data.goal;
            updatedGoal._id = savedGoal._id;

            if (updatedGoal.group) {
              const groupGoal = { ...updatedGoal, description: this.description };
              delete groupGoal.progress;

              const groupId = groupGoal.group;
              await axios.post(`/groups/${groupId}/new-goal`, groupGoal);
              console.log('Posted new group goal successfully.');
            }

            this.goals.push(updatedGoal);

          } catch (err) {
            console.error('Error during goal creation:', err.response?.data || err.message);

            if (updatedGoal && updatedGoal._id) {
              try {
                await axios.delete(`/goals/${updatedGoal._id}`);
                console.log('Rolled back personal goal creation due to group error.');
              } catch (deleteErr) {
                console.error('Failed to rollback personal goal:', deleteErr.response?.data || deleteErr.message);
              }
            }

            throw err; //rethrow to catch blok so error banner displays message
          }
        }

        const index = this.goals.findIndex(g => g._id === savedGoal._id);
        if (index !== -1) {
          this.goals[index] = { ...savedGoal };
        }

        this.editingGoal = null;

      } catch (err) {
        console.error('Error saving goal overall:', err.response?.data || err.message);

        if (err.response?.data?.message) {
          globalErrorMessage.value = err.response.data.message;
        } else {
          globalErrorMessage.value = 'Something went wrong.';
        }
      }
    },
    descriptionPrompt(goal) {
      console.log(goal)
      if (goal.group && this.isNewGoal) {
        this.pendingGoal = goal
        this.editingGoal = null;
        console.log(this.pendingGoal)
        this.showDescriptionBox = true;
      }
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

    confirmDescriptionApproved(description) {
      this.showDescriptionBox = false;
      this.description = description
      this.confirmSaveGoal(this.pendingGoal)

    },

    confirmSaveGoal(goal) {
      this.editingGoal = null;

      if (goal.group && this.isNewGoal) {
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
    createNewGoal(groupId = null, goalType = 'custom') {
      console.log(groupId, goalType)
      this.showTypeSelect = false
      const newGoal = {
        target: 10,
        progress: 0,
        trackFrom: null,
        progressLabel: 'Progress',
        remainingLabel: 'Remaining',
        unit: 'units',
        type: goalType,
        group: groupId,
        date: new Date()
      };
      console.log(goalType)
      if (goalType == 'custom') {
        console.log('custom detected')
        this.openEditor(newGoal, true, groupId); 
      } else if (goalType == 'diet') { 
          this.tempGoal = { ...newGoal };
          this.tempGroupId = groupId;
          this.showDietGoalSelect = true;
      } else if (goalType == 'exercise') { 
         this.openEditor(newGoal, true, groupId); 
      } 
      
    }
  }
};
</script>