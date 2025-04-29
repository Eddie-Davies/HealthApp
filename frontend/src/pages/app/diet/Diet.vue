<template>
  <PageHeader :title="$route.meta.title" />
  <div class="mt-20 px-4 pb-16 flex flex-col items-center">
    <NewMeal />

    <div class="mt-16 w-full max-w-md">
      <h2 class="text-xl font-semibold mb-4">Previous Meals</h2>
      <MealCard v-for="(meal, index) in meals" :key="index" :name="meal.mealName" :food="meal.foods.filter(f => !f.isDrink)" :drinks="meal.foods.filter(f => f.isDrink)" :date="meal.date" :id="meal._id" />
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
        this.meals = res.data.meals;
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