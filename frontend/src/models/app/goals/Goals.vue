<template>
  <h1 class="flex text-4xl mt-15 justify-center text-center font-regular">My Goals</h1>
  <div class="mt-20 md:px-3">
    <div class="flex flex-wrap justify-center gap-6 md:gap-10">
      <GoalCard :goal :goalName :goalCount :goalunit></GoalCard>
      <GoalCard :goal :goalName :goalCount :goalunit></GoalCard>

      <GoalCard :goal :goalName :goalCount :goalunit></GoalCard>
      <GoalCard :goal :goalName :goalCount :goalunit></GoalCard>
      <GoalCard :goal :goalName :goalCount :goalunit></GoalCard>
      <GoalCard :goal :goalName :goalCount :goalunit></GoalCard>

      <GoalCard :goal :goalName :goalCount :goalunit></GoalCard>
      <GoalCard :goal :goalName :goalCount :goalunit></GoalCard>
      <GoalCard :goal :goalName :goalCount :goalunit></GoalCard>
      <GoalCard :goal :goalName :goalCount :goalunit></GoalCard>

      <GoalCard :goal :goalName :goalCount :goalunit></GoalCard>
      <GoalCard :goal :goalName :goalCount :goalunit></GoalCard>



    </div>
  </div>
</template>


<script>
import GoalCard from './GoalsCard.vue';
export default {
  name: 'Goals',
  components: { GoalCard }
}
</script>
