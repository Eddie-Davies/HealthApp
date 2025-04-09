<template>
  <h1 class="flex text-4xl mt-15 justify-center text-center font-regular">My Goals</h1>
  <div class="mt-20 md:px-3">
    <div class="flex flex-wrap justify-center gap-6 md:gap-10">
      <GoalCard v-for="goal in goals" 
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
</template>

<script>
import GoalCard from './GoalCard.vue';

export default {
  name: 'Goals',
  components: { GoalCard },
  data() {
    return {
      // example to be used with mongodb later
      goals: [
        { 
          target: 4000, 
          progress: 1300, 
          progressLabel: 'Eaten', 
          remainingLabel: 'Remaining', 
          unit: 'kcal' ,
          type: true, // indicating food goal
          date: '2025-06-18'
        }
        // Additional goals here
      ]
    };
  }
}
</script>