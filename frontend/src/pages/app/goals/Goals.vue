<template>
  <div class="mt-20 md:px-3 pb-16">
    <!-- Grid container for the goal cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center mx-48">
      <GoalCard v-for="goal in goals" :key="goal.date" 
        :target="goal.target"
        :progress="goal.progress"
        :progressLabel="goal.progressLabel"
        :remainingLabel="goal.remainingLabel"
        :unit="goal.unit"
        :type="goal.type"
        :date="goal.date"
      />
    </div>
   
    <div class="mt-16 mb-16 flex flex-wrap justify-center">
      <GoalNew></GoalNew>
    </div>
  </div>
</template>

<script>
import GoalCard from './GoalCard.vue';
import GoalNew from './GoalNew.vue'

export default {
  name: 'Goals',
  components: { GoalCard, GoalNew },
  data() {
    return {
            // example to be used with mongodb later
      goals: [
        { target: 4000, progress: 1300, progressLabel: 'Eaten', remainingLabel: 'Remaining', unit: 'kcal', type: true, date: '2025-06-18' },
        { target: 4000, progress: 1300, progressLabel: 'Eaten', remainingLabel: 'Remaining', unit: 'kcal', type: true, date: '2025-06-18' },
        { target: 4000, progress: 1300, progressLabel: 'Eaten', remainingLabel: 'Remaining', unit: 'kcal', type: true, date: '2026-06-18' },
        { target: 4000, progress: 1300, progressLabel: 'Eaten', remainingLabel: 'Remaining', unit: 'kcal', type: true, date: '2025-06-18' },
        { target: 4000, progress: 1300, progressLabel: 'Eaten', remainingLabel: 'Remaining', unit: 'kcal', type: true, date: '2025-06-18' },

        // Additional goals here
      ]
    };
  }
}
</script>