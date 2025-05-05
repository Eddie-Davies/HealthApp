<template>
<div v-if="isLoaded" class="w-full max-w-md mx-auto pb-16">
  <input type="text" v-model="mealName" :placeholder="mealName ? '' : 'Meal Name'"
    class="input input-primary input-ghost text-3xl font-semibold rounded-xl w-full" />

  <div class="flex flex-col items-center justify-center mt-8">
    <div class="text-base-content/70">
      Total Calories: {{ totalCalories }} kcal
    </div>
  

    <div class="bg-base-200 rounded-box p-6 mt-4 flex border-2 border-secondary/70 flex-col items-center justify-center px-4 w-full max-w-md mx-auto">
  <h3 class="font-bold text-xl mb-5">Food</h3>
  <div
    v-for="(food, index) in foodOnly"
    :key="index"
    class="food-item w-full mb-5 flex items-center justify-between"
  >
    <div class="flex flex-col flex-grow pr-2">
      <div class="flex justify-between text-base-content/95">
        <span>{{ food.name }}</span>
        <span class="font-semibold">{{ food.calories }} kcal</span>
      </div>
      <div class="border-b-1 border-neutral/30 mt-1"></div>
    </div>
    <button class="btn btn-xs btn-error btn-soft ml-3" @click="deleteItem(index)">
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>
  <button class="btn btn-neutral btn-soft btn-md rounded-xl mt-7" @click="goToSelect('food')">Add Food</button>
</div>




<div class="bg-base-200 rounded-box p-6 mt-4 flex border-2 border-secondary/70 flex-col items-center justify-center px-4 w-full max-w-md mx-auto">
  <h3 class="font-bold text-xl mb-5">Drinks</h3>
  <div
    v-for="(drink, index) in drinkOnly"
    :key="index"
    class="drink-item w-full mb-5 flex items-center justify-between"
  >
    <div class="flex flex-col flex-grow pr-2">
      <div class="flex justify-between text-base-content/95">
        <span>{{ drink.name }}</span>
        <span class="font-semibold">{{ drink.calories }} kcal</span>
      </div>
      <div class="border-b-1 border-neutral/30 mt-1"></div>
    </div>
    <button class="btn btn-xs btn-error btn-soft ml-3" @click="deleteItem(index, true)">
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>
  <button class="btn btn-neutral btn-soft btn-md rounded-xl mt-7" @click="goToSelect('drink')">Add Drink</button>
</div>


    <div class="mt-10 flex w-full space-x-3">
  <button class="btn btn-error flex-1" @click="cancelEdit">Cancel</button>
  <button class="btn btn-success flex-2" @click="saveMeal">Save Meal</button>
</div>

    <button v-if="!isNew" class="btn m-20 btn-error btn-soft w-full rounded-xl" @click="deleteMeal"><i class="fa-solid fa-xmark"></i>Delete Meal</button>
  </div>
</div>

  <div v-if="showDeleteModal" @click.self="showDeleteModal = false" class="fixed inset-0 bg-black/90 flex justify-center items-center z-50">
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
    } else if (!this.isNew) {
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
        this.st,
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
