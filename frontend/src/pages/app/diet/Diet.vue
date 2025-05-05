<template>
  <PageHeader :title="$route.meta.title" />
  <div class="mt-20 px-4 pb-16 flex flex-col items-center">
    <NewMeal />
    <div class="mt-16 w-full max-w-md">
      <div v-if="meals.length > 0">
        <div class="flex justify-between items-center mb-4">
          <input v-model="searchQuery" type="text" placeholder="Search meals..."
            class="input input-bordered w-full max-w-xs" />
          <div class="relative">
            <button @click="showDropdown = !showDropdown" class="ml-4">
              <i class="fa-solid fa-filter text-xl"></i>
            </button>
            <div v-if="showDropdown"
              class="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <ul class="py-2 text-sm text-gray-700">
                <li @click="sortOption = 'date_desc'; showDropdown = false" class="dropdown-item">Date (Newest First)
                </li>
                <li @click="sortOption = 'date_asc'; showDropdown = false" class="dropdown-item">Date (Oldest First)
                </li>
                <li @click="sortOption = 'cal_desc'; showDropdown = false" class="dropdown-item">Calories (Highest
                  First)</li>
                <li @click="sortOption = 'cal_asc'; showDropdown = false" class="dropdown-item">Calories (Lowest First)
                </li>
              </ul>
            </div>
          </div>
        </div>
        <MealCard v-for="(meal, index) in filteredAndSortedMeals" :key="index" :name="meal.mealName"
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
    NewMeal,
  },
  data() {
    return {
      meals: [],
      searchQuery: '',
      sortOption: 'date_desc',
      showDropdown: false
    };
  },
  computed: {
    filteredAndSortedMeals() {
      let meals = [...this.meals];
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        meals = meals.filter(meal => meal.mealName.toLowerCase().includes(query));
      }
      switch (this.sortOption) {
        case 'date_asc':
          meals.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        case 'date_desc':
          meals.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case 'cal_asc':
          meals.sort((a, b) => this.totalCalories(a) - this.totalCalories(b));
          break;
        case 'cal_desc':
          meals.sort((a, b) => this.totalCalories(b) - this.totalCalories(a));
          break;
      }
      return meals;
    }
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
    },
    totalCalories(meal) {
      return meal.foods.reduce((sum, item) => sum + (item.calories || 0), 0);
    }
  },
  async mounted() {
    await this.fetchMeals();
  }
};
</script>