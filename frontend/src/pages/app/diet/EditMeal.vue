<template>
  <div class="flex flex-col items-center justify-center">
    <input type="text" v-model="mealName" :placeholder="mealName ? '' : 'Meal Name'"
      class="input input-ghost text-xl font-semibold" />

    <div class="mt-8">
      Total Calories: {{ totalCalories }} kcal
    </div>

    <!-- Food List -->
    <div class="bg-base-200 p-6 rounded-xl w-80 mt-8">
      <h3>Food</h3>
      <div v-for="(food, index) in foodOnly" :key="index" class="food-item">
        <span>{{ food.name }}</span> <span>{{ food.calories }} kcal</span>
        <span>
          <button class="btn" @click="deleteItem(index)">Delete</button>
        </span>
      </div>
      <button class="btn btn-md" @click="goToSelect('food')">Add Food</button>
    </div>

    <!-- Drink List -->
    <div class="bg-base-200 p-6 rounded-xl w-80 mt-8">
      <h3>Drinks</h3>
      <div v-for="(drink, index) in drinkOnly" :key="index" class="drink-item">
        <span>{{ drink.name }}</span> <span>{{ drink.calories }} kcal</span>
        <span>
          <button class="btn" @click="deleteItem(index, true)">Delete</button>
        </span>
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
      mealId: this.$route.params.id,
    };
  },
  computed: {
    isNew() {
      return this.mealId === undefined || this.mealId === 'new';
    },
    foodOnly() {
      return this.foodItems.filter(item => !item.isDrink);
    },
    drinkOnly() {
      return this.foodItems.filter(item => item.isDrink);
    },
    totalCalories() {
      return this.foodItems.reduce((sum, item) => sum + (item.calories || 0), 0);
    },
  },
  async mounted() {
    const tempMeal = JSON.parse(localStorage.getItem('tempMeal'));

    if (tempMeal) {
      this.mealName = tempMeal.name || '';
      this.foodItems = tempMeal.foodItems || [];
    }

    if (!this.isNew) {
      try {
        const res = await axios.get(`/meals/${this.mealId}`);
        const meal = res.data.meal;

        this.mealName = meal.name || '';
        this.foodItems = meal.food || [];
      } catch (err) {
        console.error('Failed to fetch meal by ID:', err.response?.data || err);
      }
    }


    const { name, calories, type } = this.$route.query;
    if (name && calories && type) {
      const item = {
        name,
        calories: parseInt(calories),
        isDrink: type === 'drink',
      };
      this.foodItems.push(item);
      this.$router.replace({ path: this.$route.path, query: {} });
    }

    localStorage.setItem(
      'tempMeal',
      JSON.stringify({
        name: this.mealName,
        foodItems: this.foodItems,
      })
    );
  },
  methods: {
    goToSelect(type) {
      localStorage.setItem(
        'tempMeal',
        JSON.stringify({
          name: this.mealName,
          foodItems: this.foodItems,
        })
      );
      this.$router.push({
        path: `/home/diet/${this.mealId || 'new'}/select/${type}`,
      });
    },
    deleteItem(index, isDrink = false) {
      const list = isDrink ? this.drinkOnly : this.foodOnly;
      const item = list[index];
      const actualIndex = this.foodItems.findIndex(
        f => f.name === item.name && f.calories === item.calories && f.isDrink === item.isDrink
      );
      if (actualIndex !== -1) this.foodItems.splice(actualIndex, 1);
      localStorage.setItem(
        'tempMeal',
        JSON.stringify({
          name: this.mealName,
          foodItems: this.foodItems,
        })
      );
    },
    async saveMeal() {
      const payload = {
        mealName: this.mealName,
        foods: this.foodItems,
      };
      try {
        if (this.isNew) {
          await axios.post('/meals', payload);
        } else {
          await axios.put(`/meals/update/${this.mealId}`, payload);
        }
        localStorage.removeItem('tempMeal');
        this.$router.push('/home/diet');
      } catch (err) {
        console.error('Error saving meal:', err.response?.data || err);
      }
    },
  },
};
</script>
