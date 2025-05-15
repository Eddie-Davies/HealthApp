<template>
  <PageHeader :title="$route.meta.title" />
  <div v-if="isLoaded" class="mt-20 px-4 pb-16 flex flex-col items-center">
    <NewMeal />
    <!-- Container for meal history with responsive width -->
    <div class="mt-10 w-full max-w-md mb-20">
      <div v-if="meals.length > 0">

        <div class="flex-row justify-between items-center mb-4">

          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-semibold">Previous Meals</h2>
            <p class="text text-right text-base-content/50 cursor-default">Tap on a meal to edit.</p>
          </div>

          <!-- Search and filter controls -->
          <div class="flex justify-between items-center mb-4">
            <input v-model="searchQuery" type="text" placeholder="Search meals..."
              class="input input-bordered w-full max-w-xs" />

              <!-- Filter dropdown for sorting options -->
            <div class="relative ml-4">
              <div class="dropdown dropdown-bottom dropdown-end">
                <div tabindex="0" role="button" class="m-1 p-4 btn cursor-pointer rounded-full "><i
                    class="fa-solid fa-filter text-xl"></i></div>
                    <!-- Dropdown menu with sorting options -->
                <ul tabindex="0"
                  class="dropdown-content menu bg-base-200 border-secondary border-2 rounded-box z-1 w-52 p-2 shadow-sm">
                  <li>
                    <a @click="sortOption = 'date_desc'; showDropdown = false" class="">Date (Newest First)</a>
                  </li>
                  <li>
                    <a @click="sortOption = 'date_asc'; showDropdown = false" class="">Date (Oldest First)</a>
                  </li>
                  <li>
                    <a @click="sortOption = 'cal_desc'; showDropdown = false" class="">Calories (Highest First)</a>
                  </li>
                  <li>
                    <a @click="sortOption = 'cal_asc'; showDropdown = false" class="">Calories (Lowest First)</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <MealCard v-for="(meal, index) in filteredAndSortedMeals" :key="index" :name="meal.mealName"
          :food="meal.foods.filter(f => !f.isDrink)" :drinks="meal.foods.filter(f => f.isDrink)" :date="meal.date"
          :id="meal._id" />
      </div>
      <!-- Empty state shown when no meals exist -->
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
      showDropdown: false,
      isLoaded: false
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
    // Fetch meals from the API
    async fetchMeals() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/meals', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Store meals in component data
        this.meals = res.data.meals;
      } catch (err) {
        console.error('Error fetching meals:', err);
      }
    },
     // Calculate total calories for a meal (used for sorting)
    totalCalories(meal) {
      return meal.foods.reduce((sum, item) => sum + (item.calories || 0), 0);
    }
  },
  async mounted() {
    await this.fetchMeals();
    this.isLoaded = true;
  }
};
</script>