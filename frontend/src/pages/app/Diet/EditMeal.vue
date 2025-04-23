<template>
  <div class="flex flex-col items-center justify-center">
    <input type="text" v-model="mealName" :placeholder="mealName ? '' : 'Meal Name'"
      class="input input-ghost text-xl font-semibold" />

    <div class="mt-8">
      Total Calories: {{ totalCalories }} kcal
    </div>

    <div class="bg-base-200 p-6 rounded-xl w-80 mt-8">
      <h3>Food</h3>
      <div v-for="(food, index) in foodItems" :key="index" class="food-item">
        <span>{{ food.name }}</span>
        <span>{{ food.calories }} kcal</span>
      </div>
      <button class="btn btn-md" @click="goToSelect('food')">Add Food</button>
    </div>

    <div class="bg-base-200 p-6 rounded-xl w-80 mt-8">
      <h3>Drinks</h3>
      <div v-for="(drink, index) in drinks" :key="index" class="drink-item">
        <span>{{ drink.name }}</span>
        <span>{{ drink.calories }} kcal</span>
      </div>
      <button class="btn btn-md" @click="goToSelect('drink')">Add Drink</button>
    </div>

    <button class="btn mt-8 btn-success" @click="saveMeal">Save Meal</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EditMeal',

  data() {
    return {
      mealName: '',
      foodItems: [],
      drinks: [],
      mealId: this.$route.params.id,
    };
  },

  computed: {
    isNew() {
      return this.mealId === undefined || this.mealId === 'new';
    },

    totalCalories() {
      const foodCalories = this.foodItems.reduce((sum, item) => sum + (item.calories || 0), 0);
      const drinkCalories = this.drinks.reduce((sum, item) => sum + (item.calories || 0), 0);
      return foodCalories + drinkCalories;
    },
  },

  async mounted() {
    const tempMeal = JSON.parse(localStorage.getItem('tempMeal'));

    if (tempMeal) {
      this.mealName = tempMeal.name || '';
      this.foodItems = tempMeal.foodItems || [];
      this.drinks = tempMeal.drinks || [];
    }

    if (!this.isNew) {
      try {
        const res = await axios.get(`/meals/${this.mealId}`);
        const meal = res.data.meal;
        this.mealName ||= meal.name;
        this.foodItems ||= meal.food || [];
        this.drinks ||= meal.drinks || [];
      } catch (err) {
        console.error('Failed to fetch meal by ID:', err.response?.data || err);
      }
    }

    const { name, calories, type } = this.$route.query;
    if (name && calories && type) {
      const item = { name, calories: parseInt(calories) };
      if (type === 'food') this.foodItems.push(item);
      else if (type === 'drink') this.drinks.push(item);
      this.$router.replace({ path: this.$route.path, query: {} });
    }

    // Update localStorage with newly added item
    localStorage.setItem('tempMeal', JSON.stringify({
      name: this.mealName,
      foodItems: this.foodItems,
      drinks: this.drinks,
    }));
  },

  methods: {
    goToSelect(type) {
      localStorage.setItem('tempMeal', JSON.stringify({
        name: this.mealName,
        foodItems: this.foodItems,
        drinks: this.drinks,
      }));

      this.$router.push({
        path: `/home/diet/${this.mealId || 'new'}/select/${type}`,
      });
    },

    async saveMeal() {
      const payload = {
        name: this.mealName,
        food: this.foodItems,
        drinks: this.drinks,
        calories: this.totalCalories,
      };

      try {
        if (this.isNew) {
          await axios.post('/meals', payload);
        } else {
          await axios.put(`/meals/update/${this.mealId}`, payload);
        }

        this.$router.push('/home/diet');
      } catch (err) {
        console.error('Error saving meal:', err.response?.data || err);
      }
    }
  }
};
</script>
