<template>
    <div class="flex flex-col items-center justify-center">
        <input type="text" v-model="mealName" :placeholder="mealName ? '' : 'Edit Meal'" class="input input-ghost text-xl font-semibold" />

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
export default {
  name: 'EditMeal',

  data() {
    return {
      mealName: '',
      totalCalories: 0,
      foodItems: [],
      drinks: [],
      mealId: this.$route.params.id,
    };
  },

  computed: {
    isNew() {
      return this.mealId === undefined;
    }
  },

  mounted() {
    if (!this.isNew) {
      // TODO: Fetch meal data from backend by ID
      this.mealName = 'Dinner';
      this.totalCalories = 500;
      this.drinks = [{ name: 'Milkshake', calories: 500 }];
    } else {
      this.mealName = '';
      this.totalCalories = 0;
      this.drinks = [];
    }
  },

  methods: {
    goToSelect(type) {
      this.$router.push(`/home/diet/${this.mealId}/select/${type}`);
    },

    addFood() {
      alert('Add food clicked');
    },

    addDrink() {
      alert('Add drink clicked');
    },

    saveMeal() {
      if (this.isNew) {
        // POST /api/meals/
      } else {
        // PUT /api/meals/:id
      }

      alert(`Saving meal ${this.mealId}`);
    }
  }
};
</script>
