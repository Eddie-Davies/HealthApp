<template>
  <PageHeader :title="$route.meta.title" />
  <div class="mt-20 px-4 pb-16 flex flex-col items-center">
    <NewMeal />

    <div class="mt-16 w-full max-w-md mb-20">
      <div v-if="meals.length > 0">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-semibold">Previous Meals</h2>
          <p class="text text-right text-base-content/50 cursor-default">Tap to edit</p>
        </div>

        <MealCard v-for="(meal, index) in meals" :key="index" :name="meal.mealName"
          :food="meal.foods.filter(f => !f.isDrink)" :drinks="meal.foods.filter(f => f.isDrink)" :date="meal.date"
          :id="meal._id" />
      </div>
      <div v-else class="tooltip flex justify-center items-center" data-tip="Click the button above :)">
        <button class="btn">Log some new meals to start tracking!</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
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
      meals: []
    };
  },
  watch: {
    $route() {
      this.fetchMeals();
    }
  },
  methods: {
    async fetchMeals() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/meals', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        this.meals = res.data.meals.sort((a, b) => new Date(b.date) - new Date(a.date));
      } catch (err) {
        console.error('Error fetching meals:', err);
      }
    }
  },
  async mounted() {
    await this.fetchMeals();
  }
};
</script>