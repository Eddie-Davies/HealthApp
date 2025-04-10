<template>
  <div class="mt-20 pb-16">
    <!-- Grid container for the goal cards -->
    <div class="flex justify-center">
      <div class="grid max-[345px]:grid-cols-1 grid-cols-2 cols-850-3 cols-1150-4 gap-6 justify-items-center">
        <GoalCard
          v-for="goal in goals"
          :key="goal.date"
          :target="goal.target"
          :progress="goal.progress"
          :progressLabel="goal.progressLabel"
          :remainingLabel="goal.remainingLabel"
          :unit="goal.unit"
          :type="goal.type"
          :date="goal.date"
        />
      </div>
    </div>

    <!-- Add new goal section -->
    <div class="mt-16 mb-16 flex flex-wrap justify-center">
      <GoalNew />
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

export default {
  name: 'Goals',
  components: {
    GoalCard,
    GoalNew,
  },
  data() {
    return {
      // Example to be used with MongoDB later
      goals: [
        {
          target: 4000,
          progress: 1300,
          progressLabel: 'Eaten',
          remainingLabel: 'Remaining',
          unit: 'kcal',
          type: true,
          date: '2025-06-18',
        },
        {
          target: 4000,
          progress: 1300,
          progressLabel: 'Eaten',
          remainingLabel: 'Remaining',
          unit: 'kcal',
          type: true,
          date: '2025-06-18',
        },
        {
          target: 4000,
          progress: 1300,
          progressLabel: 'Eaten',
          remainingLabel: 'Remaining',
          unit: 'kcal',
          type: true,
          date: '2026-06-18',
        },
        {
          target: 4000,
          progress: 1300,
          progressLabel: 'Eaten',
          remainingLabel: 'Remaining',
          unit: 'kcal',
          type: true,
          date: '2025-06-18',
        },
        {
          target: 4000,
          progress: 1300,
          progressLabel: 'Eaten',
          remainingLabel: 'Remaining',
          unit: 'kcal',
          type: true,
          date: '2025-06-18',
        },
        // Additional goals can be added here
      ],
    };
  },
};
</script>
