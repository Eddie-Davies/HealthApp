<template>
  <div v-if="isLoaded" class="flex flex-col items-center justify-center px-4 pb-16 w-full max-w-md mx-auto">
    <input type="text" v-model="mealName" :placeholder="mealName ? '' : 'Meal Name'"
      class="input input-ghost text-xl font-semibold" />

    <div class="mt-8">
      Total Calories: {{ totalCalories }} kcal
    </div>

    <!-- Food List -->
    <div class="bg-base-300 rounded-xl p-6 mt-8 flex flex-col items-center justify-center px-4 w-full max-w-md mx-auto">
      <h3 class="font-bold">Food</h3>
      <div v-for="(food, index) in foodOnly" :key="index" class="food-item">
        <span>{{ food.name }}</span> <span>{{ food.calories }} kcal</span>
        <span>
          <button class="btn btn-error m-3" @click="deleteItem(index)">Delete</button>
        </span>
      </div>
      <button class="btn btn-md m-3" @click="goToSelect('food')">Add Food</button>
    </div>

    <!-- Drink List -->
    <div class="bg-base-300 rounded-xl p-6 mt-8 flex flex-col items-center justify-center px-4 w-full max-w-md mx-auto">
      <h3 class="font-bold">Drinks</h3>
      <div v-for="(drink, index) in drinkOnly" :key="index" class="drink-item">
        <span>{{ drink.name }}</span> <span>{{ drink.calories }} kcal</span>
        <span>
          <button class="btn btn-error m-3" @click="deleteItem(index, true)">Delete</button>
        </span>
      </div>
      <button class="btn btn-md m-3" @click="goToSelect('drink')">Add Drink</button>
    </div>

    <button class="btn mt-8 btn-success m-3" @click="saveMeal">Save Meal</button>
    <button v-if="!isNew" class="btn m-3 btn-error" @click="deleteMeal">Delete Meal</button>
    <button class="btn m-3 btn-outline" @click="cancelEdit">Cancel</button>

  </div>

  <div v-if="showDeleteModal" class="fixed inset-0 backdrop-blur flex justify-center items-center z-50">
    <div class="bg-base-100 p-6 rounded-xl shadow-lg max-w-sm w-full">
      <h2 class="text-lg font-semibold mb-4">Confirm Deletion</h2>
      <p>Are you sure you want to delete this meal?</p>
      <div class="flex justify-end mt-6">
        <button class="btn btn-outline mr-2" @click="showDeleteModal = false">Cancel</button>
        <button class="btn btn-error" @click="confirmDelete">Yes, Delete</button>
      </div>
    </div>
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
      isLoaded: false,
      showDeleteModal: false
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
    storageKey() {
      return this.isNew ? 'tempNewMeal' : `tempEditMeal_${this.mealId}`;
    }
  },
  async mounted() {
    const tempMeal = JSON.parse(localStorage.getItem(this.storageKey));

    if (tempMeal) {
      this.mealName = tempMeal.name || '';
      this.foodItems = tempMeal.foodItems || [];
    }

    if (!this.isNew) {
      try {
        const res = await axios.get(`/meals/${this.mealId}`);
        const meal = res.data.meal;

        this.mealName = meal.mealName || '';
        this.foodItems = meal.foods || [];
      } catch (err) {
        console.error('Failed to fetch meal by ID:', err.response?.data || err);
      }
    }

    if (!this.mealName) {
      const hour = new Date().getHours();
      if (hour < 11) {
        this.mealName = 'Breakfast';
      } else if (hour < 16) {
        this.mealName = 'Lunch';
      } else {
        this.mealName = 'Dinner';
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
      this.storageKey,
      JSON.stringify({
        name: this.mealName,
        foodItems: this.foodItems,
      })
    );
    this.isLoaded = true;
  },
  methods: {
    goToSelect(type) {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify({
          name: this.mealName,
          foodItems: this.foodItems,
        })
      );
      this.$router.push({
        path: `/home/diet/${this.mealId || 'new'}/select/${type}`,
      });
    },

    cancelEdit() {
      localStorage.removeItem(this.storageKey);
      this.$router.push('/home/diet');
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
        localStorage.removeItem(this.storageKey);
        this.$router.push('/home/diet');
      } catch (err) {
        console.error('Error saving meal:', err.response?.data || err);
      }
    },
    async deleteMeal() {
      this.showDeleteModal = true;
    },
    async confirmDelete() {
      try {
        await axios.delete(`/meals/${this.mealId}`);
        localStorage.removeItem(this.storageKey);
        this.$router.push('/home/diet');
      } catch (err) {
        console.error('Error deleting meal:', err.response?.data || err);
      } finally {
        this.showDeleteModal = false;
      }
    }
  },
};
</script>
