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
    class="mySwiper mb-30">
    <swiper-slide>
      <PageHeader :title="$route.meta.title" />
      <div class="mt-20 pb-5">
        <div class="flex justify-center">
          <div v-if="goals.length" class="grid max-[345px]:grid-cols-1 grid-cols-2 cols-850-3 cols-1150-4 gap-6 justify-items-center">
            <GoalCard v-for="goal in goals" v-bind="goal"
              :key="goal.id"
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
        <div class="mt-10 mb-17 flex flex-wrap justify-center">
    <GoalNew @new-goal="createNewGoal()" />
  </div>
    </swiper-slide>

  <swiper-slide v-for="group in groups" :key="group">
    <PageHeader :title="`${group} Goals`" />
    <div class="mt-20 pb-5">
      <div class="flex justify-center">
        <div v-if="groupGoals[group].length" class="grid max-[345px]:grid-cols-1 grid-cols-2 cols-850-3 cols-1150-4 gap-6 justify-items-center">
          <GoalCard v-for="goal in groupGoals[group]" v-bind="goal"
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
    <div class="mt-10 mb-0 flex flex-wrap justify-center">
      <GoalNew :group="group" @new-goal="createNewGoal" />
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
.swiper-slide {
  min-height: 100vh; /* This fixes it so you can swipe from anywhere on the page. */
}
.swiper-pagination-bullet-active {
     background-color: bg-base-200 !important;
}
</style>

<script>
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
      groups: ['Family', 'School Mates'],
      goals: [
        {
          id: () => Math.random().toString(36).substr(2, 9),
          target: 4000,
          progress: 1300,
          progressLabel: 'Eaten',
          remainingLabel: 'Remaining',
          unit: 'kcal',
          sport: false,
          date: '2025-06-18',
        },
        {
          id: () => Math.random().toString(36).substr(2, 9),
          target: 2500,
          progress: 2000,
          progressLabel: 'Consumed',
          remainingLabel: 'Left',
          unit: 'ml',
          sport: false,
          date: '2025-06-17',
        },
        {
          id: () => Math.random().toString(36).substr(2, 9),
          target: 10000,
          progress: 7400,
          progressLabel: 'Steps Taken',
          remainingLabel: 'To Go',
          unit: 'steps',
          sport: true,
          date: '2025-06-16',
        },
        {
          id: () => Math.random().toString(36).substr(2, 9),
          target: 8,
          progress: 5,
          progressLabel: 'Hours Slept',
          remainingLabel: 'Remaining',
          unit: 'hrs',
          sport: false,
          date: '2025-06-15',
        },
        {
          id: () => Math.random().toString(36).substr(2, 9),
          target: 300,
          progress: 100,
          progressLabel: 'Pages Read',
          remainingLabel: 'Left',
          unit: 'pages',
          sport: false,
          date: '2025-06-14',
        },
        {
          id: () => Math.random().toString(36).substr(2, 9),
          target: 3,
          progress: 1,
          progressLabel: 'Workouts Done',
          remainingLabel: 'To Go',
          unit: 'sessions',
          sport: true,
          date: '2025-06-13',
        },
        {
          id: () => Math.random().toString(36).substr(2, 9),
          target: 2000,
          progress: 1800,
          progressLabel: 'Words Written',
          remainingLabel: 'Remaining',
          unit: 'words',
          sport: false,
          date: '2025-06-12',
        }
      ],
      groupGoals: {
        'Family': [{
          id: () => Math.random().toString(36).substr(2, 9),
          target: 4000,
          progress: 1300,
          progressLabel: 'Eaten',
          remainingLabel: 'Remaining',
          unit: 'kcal',
          sport: false,
          date: '2025-06-18',
        }],

        'School Mates': [
          {
            id: () => Math.random().toString(36).substr(2, 9),
            target: 10000,
            progress: 7400,
            progressLabel: 'Steps Taken',
            remainingLabel: 'To Go',
            unit: 'steps',
            sport: true,
            date: '2025-06-16',
          }
        ]
      },
      editingGoal: null,
      isNewGoal: false
    };
  },
  methods: {
    openEditor(goal, isNew = false, groupName = null) {
      this.editingGoal = { ...goal, group: groupName }; // store group info (defaults to null = indicating no group)
      this.isNewGoal = isNew;
    },

    saveGoal(updatedGoal) {
      const group = updatedGoal.group;
      
      let targetArray;
      if (group) {
        targetArray = this.groupGoals[group];
      } else {
        targetArray = this.goals;
      }
      
      const index = targetArray.findIndex(g => g.id === updatedGoal.id); // select the correct goal to change
      // Either add a new entry if not found, or update existing one.
      if (index !== -1) {
        targetArray[index] = { ...updatedGoal };
      } else {
        targetArray.push({ ...updatedGoal });
      }
      this.editingGoal = null;
    },

    
    deleteGoal(goalToDelete) {
      const group = goalToDelete.group;

      if (group) {
        if (this.groupGoals[group]) {
          this.groupGoals[group] = this.groupGoals[group].filter(g => g.id !== goalToDelete.id);
        }
      } else {
        this.goals = this.goals.filter(g => g.id !== goalToDelete.id);
      }
      this.editingGoal = null;
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
      date: new Date().toISOString().slice(0, 10),
    };
    this.openEditor(newGoal, true, groupName);
  }
}
};
</script>