<template>
  <div class="p-4 space-y-4">
    <h1 class="text-2xl font-semibold">Select {{ capitalizedType }}</h1>

    <!-- Search -->
    <input v-model="searchQuery" type="text" placeholder="Search..." class="input input-bordered w-full" />

    <!-- List -->
    <div class="divide-y border rounded mt-2">
      <div v-if="filteredItems.length === 0" class="tooltip flex justify-center items-center p-4"
        data-tip="Fill out a new food item below :)">
        <button class="btn">Add a new food item to start tracking!</button>
      </div>
      <div v-for="item in filteredItems" :key="item._id"
        class="flex justify-between items-center p-3 hover:bg-gray-100">
        <div @click="selectItem(item)" class="flex-1 cursor-pointer">
          <span>{{ item.name }}</span> <span>{{ item.calories }} kcal</span>
        </div>
        <button class="btn btn-sm btn-error ml-2" @click.stop="deleteItem(item._id)">Delete</button>
      </div>
    </div>



    <!-- Add New -->
    <div class="mt-6 border-t pt-4">
      <h2 class="font-semibold mb-2">Add new {{ capitalizedType }}:</h2>
      <input v-model="newItem.name" placeholder="Name" class="input input-bordered w-full mb-2" />
      <input v-model="newItem.calories" placeholder="Calories" type="number" class="input input-bordered w-full mb-4" />
      <button class="btn btn-primary w-full" @click="addItem">
        Add to {{ capitalizedType }} List
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'SelectItem',
  props: ['type'],
  data() {
    return {
      searchQuery: '',
      newItem: {
        name: '',
        calories: '',
      },
      items: []
    };
  },

  computed: {
    capitalizedType() {
      return this.type.charAt(0).toUpperCase() + this.type.slice(1);
    },
    filteredItems() {
      return this.items.filter(item =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },

  methods: {
    selectItem(item) {
      const returnPath = this.$route.path.split('/select')[0]; // go back to EditMeal.vue path
      this.$router.push({
        path: returnPath,
        query: {
          name: item.name,
          calories: item.calories,
          type: this.type,
        }
      });
    },
    async addItem() {
      if (
        !this.newItem.name ||
        this.newItem.calories === '' ||
        this.newItem.calories === null
      ) return;

      const parsedCalories = parseInt(this.newItem.calories);
      const newEntry = {
        name: this.newItem.name,
        calories: parsedCalories,
        isDrink: this.type === 'drink',
      };
      try {
        const res = await axios.post('/food', newEntry);
        this.items.push(res.data);
        this.newItem.name = '';
        this.newItem.calories = '';
      } catch (err) {
        console.error('Error adding food item:', err.response?.data || err.message);
        console.log('Sending food:', newEntry);
      }
    },
    async deleteItem(id) {
      if (!confirm('Are you sure you want to delete this item?')) return;
      try {
        await axios.delete(`/food/${id}`);
        this.items = this.items.filter(item => item._id !== id);
      } catch (err) {
        console.error('Error deleting item:', err.response?.data || err.message);
      }
    }
  },
  async mounted() {
    try {
      const res = await axios.get('/foods');
      this.items = res.data.foods.filter(food => food.isDrink === (this.type === 'drink'));
    } catch (err) {
      console.error('Error fetching food list:', err.response?.data || err.message);
    }
  }
};
</script>