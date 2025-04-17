<template>
  <swiper
    ref="swiperRef"
    loop
    :pagination="{
      dynamicBullets: false,
      clickable: true,
      bulletActiveClass: '!bg-secondary !opacity-80'
    }"
    :keyboard="{
      enabled: true,
    }"
    :modules="modules"
    class="mySwiper">
    <swiper-slide>
      <div class="flex-grow flex flex-col">
      <PageHeader :title="$route.meta.title" />
      <div class="mt-20 pb-5">
        <div class="flex justify-center">
          <div v-if="personalGoals.length" class="grid max-[345px]:grid-cols-1 grid-cols-2 cols-850-3 cols-1150-4 gap-6 justify-items-center">
            <GoalCard v-for="goal in personalGoals"
              :key="goal._id"
              :target="goal.target"
              :progress="goal.progress"
              :progressLabel="goal.progressLabel"
              :remainingLabel="goal.remainingLabel"
              :unit="goal.unit"
              :type="goal.type"
              :date="goal.date"
              @edit="openEditor(goal)" />
          </div>
          <div v-else class="flex justify-center items-center text-center text-lg text-base-content/80 ">
            <div class="tooltip" data-tip="Click the button below :)">
              <button class="btn">Add some new goals to start tracking!</button>
            </div>
          </div>
        </div>
      </div>
        <div class="mt-10 mb-50 flex flex-wrap justify-center">
          <GoalNew @new-goal="createNewGoal()" />
        </div>
      </div>
    </swiper-slide>
    

  <swiper-slide v-for="group in Object.keys(groupedGoals)" :key="group">
    <div class="flex-grow flex flex-col">
    <PageHeader :title="`${group} Goals`" />
    <div class="mt-20 pb-5">
      <div class="flex justify-center">
        <div v-if="groupedGoals[group].length" class="grid max-[345px]:grid-cols-1 grid-cols-2 cols-850-3 cols-1150-4 gap-6 justify-items-center">
          <GoalCard v-for="goal in groupedGoals[group]" v-bind="goal"
            :key="goal.id"
            :target="goal.target"
            :progress="goal.progress"
            :progressLabel="goal.progressLabel"
            :remainingLabel="goal.remainingLabel"
            :unit="goal.unit"
            :type="goal.type"
            :date="goal.date"
            @edit="openEditor(goal, false, group)" />
        </div>
        <div v-else class="flex justify-center items-center text-center text-lg text-base-content/80 ">
            <div class="tooltip" data-tip="Click the button below :)">
              <button class="btn">Add some new goals to start tracking!</button>
            </div>
          </div>
        </div>
    </div>
    <div class="mt-10 mb-50 flex flex-wrap justify-center">
      <GoalNew :group="group" @new-goal="createNewGoal(group)" />
    </div>
  </div>
  </swiper-slide>
  
  </swiper>

  <GoalEdit
    v-if="editingGoal"
    :goal="editingGoal"
    :isNew="isNewGoal"
    @save="saveGoal"
    @delete="deleteGoal"
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
html, body, #app {
  height: 100%;
  margin: 0;
  overflow: hidden; /* prevent weird scroll issues */
}

.swiper {
  height: 100vh !important;
}

.swiper-slide {
  height: 100vh !important;
  overflow-y: auto; /* allow scrolling when content is taller */
  display: flex;
  flex-direction: column;
}
.swiper-pagination-bullet-active {
     background-color: bg-base-200 !important;
}
</style>


<script>
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css/pagination';
import 'swiper/css';
import { Pagination, Keyboard } from 'swiper/modules';

import GoalCard from './GoalCard.vue';
import PageHeader from '../../../components/header/PageHeader.vue';
import GoalNew from './GoalNew.vue';
import GoalEdit from './GoalEdit.vue';

export default {
  name: 'Goals',
  components: {
    Swiper,
    SwiperSlide,
    GoalCard,
    GoalNew,
    GoalEdit,
    PageHeader
  },
  setup() {
    return {
      modules: [Pagination, Keyboard],
    }
  },
  data() {
    return {
      // Example to be used with MongoDB later
      // id is temporary, mongo db provides it own. 
      goals: [],
      editingGoal: null,
      isNewGoal: false,
      user: null,
    };
  },

  // CONVERT THE GOALS PULLED INTO PERSONAL GOALS AND GROUP GOALS
  computed: {
    groupedGoals() {
      const result = {};

      this.goals.forEach(goal => {
        if (goal.group) {
          if (!result[goal.group]) result[goal.group] = [];
          result[goal.group].push(goal);
        }
      });

      return result;
    },


    // Optionally if you want "My Goals" to mean 'groupless' ones
    personalGoals() {
      return this.goals.filter(goal => !goal.group);
    }
  },
  async mounted() {
    // Get User Goals when Mounted
    try {
      const res = await axios.get('/user/goals');
      console.log('User goals:', res.data.goals);
      this.goals = res.data.goals;
    } catch (err) {
      console.error('Error fetching goals:', err.response?.data);
    }
  },

  methods: {
    toTitleCase(str) {
      return str.replace(/\w\S*/g, word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    },
    openEditor(goal, isNew = false, groupName = null) {
      this.editingGoal = { ...goal, group: groupName }; // store group info (defaults to null = indicating no group)
      this.isNewGoal = isNew;
    },

    async saveGoal(updatedGoal) {
      const alreadyExists = !!updatedGoal._id;

      try {
        let savedGoal;

        if (alreadyExists) {
          // Update existing goal in database
          const res = await axios.put(`/goals/update/${updatedGoal._id}`, updatedGoal);
          console.log("I'm here 1");
          savedGoal = res.data.goal;
        } else {
          // Create new goal in database
          const res = await axios.post('/goals/new', updatedGoal);
          savedGoal = res.data.goal;
          console.log("I'm here 2");

          updatedGoal._id = savedGoal._id;
          console.log('Full response:', res);
          console.log('Goal data:', res.data);  // Ensure that the response contains the goal data with _id
          console.log('Goal from response:', res.data.goal);  // Goal object

          // Push to local goals array since it's new
          this.goals.push(updatedGoal);
        }

        // Update or replace locally
        const index = this.goals.findIndex(g => g._id === savedGoal._id);
        if (index !== -1) {
          this.goals[index] = { ...savedGoal };  // Replace the goal in the local array
        }

        this.editingGoal = null;

      } catch (err) {
        console.error('Error saving goal:', err.response?.data || err.message);
      }
    },


    
    async deleteGoal(goalToDelete) {
      try {
        // Send delete request to backend
        console.log("Deleting goal:", goalToDelete);
        console.log("Goal ID:", goalToDelete._id);
        await axios.delete(`/goals/${goalToDelete._id}`);

        // Update local state: remove from the main goals array
        this.goals = this.goals.filter(g => g._id !== goalToDelete._id);

        // Exit editing mode
        this.editingGoal = null;
      } catch (err) {
        console.error('Error deleting goal:', err.response?.data || err);
      }
    },

    createNewGoal(groupName = null) {
    const newGoal = {
      id: Math.random().toString(36).substr(2, 9),
      target: 10,
      progress: 0,
      progressLabel: 'Progress',
      remainingLabel: 'Remaining',
      unit: 'units',
      sport: false,
      group: 'Family',
      date: new Date().toISOString().slice(0, 10),
    };
    this.openEditor(newGoal, true, groupName);
  }
}
};
</script>