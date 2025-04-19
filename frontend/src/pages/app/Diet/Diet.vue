<template>
<PageHeader :title="$route.meta.title" />
<div class="mt-20 px-4 pb-16 flex flex-col items-center">
    <NewMeal /> 

    <div class="mt-16 w-full max-w-md">
      <h2 class="text-xl font-semibold mb-4">Previous Meals</h2>
      <MealCard
        v-for="(meal, index) in meals"
        :key="index"
        :name="meal.name"
        :food="meal.food"
        :drinks="meal.drinks"
        :calories="meal.calories"
      />
    </div>

</div>
</template>

<script>
import PageHeader from '../../../components/header/PageHeader.vue';
import MealCard from './MealCard.vue';
import NewMeal from './NewMeal.vue';

export default {
    name: 'Diet',
    components: {
        PageHeader,
        MealCard,
        NewMeal
    },
    data() {
    return {
      meals: [
        { name: 'Big Dinner', food: ['Chips', 'Burrito'], drinks: ['Water', 'Orange juice'], calories: '300kcal' },
        { name: 'Big Dinner', food: ['Chips', 'Burrito'], drinks: ['Water', 'Orange juice'], calories: '300kcal' },
      ]
    }
  }
}
</script>