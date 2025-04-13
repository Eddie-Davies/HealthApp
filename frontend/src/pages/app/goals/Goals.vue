<template>
  <div class="mt-20 pb-16">
    <!-- Grid container for the goal cards -->
    <div class="flex justify-center">
      <div class="grid max-[345px]:grid-cols-1 grid-cols-2 cols-850-3 cols-1150-4 gap-6 justify-items-center">
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
    </div>

    <!-- Edit Goal -->
    <GoalEdit
      v-if="editingGoal"
      :goal="editingGoal"
      @save="saveGoal"
      @delete="deleteGoal"
      @cancel="editingGoal = null"
    />


    <!-- Add new goal section -->
    <div class="mt-16 mb-16 flex flex-wrap justify-center">
      <GoalNew @new-goal="createNewGoal()" />
    </div>
  </div>
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
</style>

<script>
import GoalCard from './GoalCard.vue';
import GoalNew from './GoalNew.vue';
import GoalEdit from './GoalEdit.vue';

export default {
  name: 'Goals',
  components: {
    GoalCard,
    GoalNew,
    GoalEdit
  },
  data() {
    return {
      // Example to be used with MongoDB later
      // id is temporary, mongo db provides it own. 
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
      editingGoal: null
    };
    
  },
  methods: {
  openEditor(goal) {
    this.editingGoal = { ...goal };
  },
  saveGoal(updatedGoal) {
    const index = this.goals.findIndex(g => g.id === updatedGoal.id);
    if (index !== -1) {
      this.goals.splice(index, 1, { ...updatedGoal });
    }
    this.editingGoal = null;
  },
  deleteGoal(goalToDelete) {
    this.goals = this.goals.filter(g => g.id !== goalToDelete.id);
    this.editingGoal = null;
  },
  createNewGoal() {
    const newGoal = {
      id: Math.random().toString(36).substr(2, 9),
      target: 10,
      progress: 0,
      progressLabel: 'Progress',
      remainingLabel: 'Remaining',
      unit: 'units',
      sport: false,
      date: new Date().toISOString().slice(0, 10), // today's date in YYYY-MM-DD
    };
    this.goals.push(newGoal);
    this.editingGoal = {...newGoal}
  }
}
};
</script>
