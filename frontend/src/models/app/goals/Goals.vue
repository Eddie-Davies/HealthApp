<template>
  <h1 class="flex text-4xl mt-15 justify-center text-center font-regular">My Goals</h1>
  <div class="mt-20 md:px-3">
    <div class="flex flex-wrap justify-center gap-6 md:gap-10">
      <!-- Example of different goal cards with various configurations -->
      <GoalCard 
  goalName="Calories"
  :goalAim="2500"
  :progressValue="1800"
  progressLabel="Eaten"
  remainingLabel="Remaining"
  unit="kcal"
  :date="new Date()" 
/>
<GoalCard 
  goalName="Protein"
  :goalAim="150"
  :progressValue="100"
  progressLabel="Consumed"
  remainingLabel="Left"
  unit="g"
  :date="new Date()" 
/>
<GoalCard 
  goalName="Water"
  :goalAim="3000"
  :progressValue="2000"
  progressLabel="Drunk"
  remainingLabel="To Go"
  unit="ml"
  :date="new Date()" 
/>
<GoalCard 
  goalName="Steps"
  :goalAim="10000"
  :progressValue="7500"
  progressLabel="Walked"
  remainingLabel="Remaining"
  unit="steps"
  :date="new Date()" 
/>
<GoalCard 
  goalName="Sleep"
  :goalAim="8"
  :progressValue="6"
  progressLabel="Slept"
  remainingLabel="Needed"
  unit="hrs"
  :date="new Date()" 
/>
<GoalCard 
  goalName="Fats"
  :goalAim="70"
  :progressValue="55"
  progressLabel="Consumed"
  remainingLabel="Remaining"
  unit="g"
  :date="new Date()" 
/>
<GoalCard 
  goalName="Carbs"
  :goalAim="300"
  :progressValue="180"
  progressLabel="Eaten"
  remainingLabel="Left"
  unit="g"
  :date="new Date()" 
/>
<GoalCard 
  goalName="Sugar"
  :goalAim="90"
  :progressValue="60"
  progressLabel="Eaten"
  remainingLabel="Remaining"
  unit="g"
  :date="new Date()" 
/>
<GoalCard 
  goalName="Fiber"
  :goalAim="30"
  :progressValue="20"
  progressLabel="Consumed"
  remainingLabel="Left"
  unit="g"
  :date="new Date()" 
/>
<GoalCard 
  goalName="Exercise"
  :goalAim="60"
  :progressValue="45"
  progressLabel="Done"
  remainingLabel="Remaining"
  unit="mins"
  :date="new Date()" 
/>


      <!-- Later i will use v-for to dynamically render cards from mongodb : see line ~111 -->
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
          name: 'Calories', 
          goal: 2501, 
          consumed: 1300, 
          consumedLabel: 'Eaten', 
          remainingLabel: 'Remaining', 
          unit: 'kcal' 
        },
        { 
          name: 'Water', 
          goal: 3000, 
          consumed: 1750, 
          consumedLabel: 'Drunk', 
          remainingLabel: 'To drink', 
          unit: 'ml' 
        },
        // Additional goals here
      ]
      
    };
  }
}
</script>