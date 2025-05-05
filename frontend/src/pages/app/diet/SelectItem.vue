<template>
  <div v-if="isLoaded" class="p-4 space-y-4">
    <h1 class="text-2xl font-semibold">Select {{ capitalizedType }}</h1>

    <input v-model="searchQuery" type="text" placeholder="Search..." class="input input-bordered w-full" />

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
        <button class="btn btn-sm btn-error ml-2 p-3" @click.stop="deleteItem(item._id)">Delete</button>
      </div>
    </div>

    <div class="mt-6 border-t pt-4">
      <h2 class="font-semibold mb-2">Add new {{ capitalizedType }}:</h2>
      <input v-model="newItem.name" placeholder="Name" class="input input-bordered w-full mb-2" />
      <input v-model="newItem.calories" placeholder="Calories" type="number" class="input input-bordered w-full mb-4" />
      <button class="btn btn-primary w-full" @click="addItem">
        Add to {{ capitalizedType }} List
      </button>
    </div>
  </div>

  <div v-if="showDeleteModal" @click.self="showDeleteModal = false"
    class="fixed inset-0 bg-black/90 flex justify-center items-center z-50">
    <div class="bg-base-100 p-6 rounded-xl shadow-lg max-w-sm w-full">
      <h2 class="text-lg font-semibold mb-4">Confirm Deletion</h2>
      <p>Are you sure you want to delete this item?</p>
      <div class="flex justify-end mt-6">
        <button class="btn btn-outline mr-2" @click="showDeleteModal = false">Cancel</button>
        <button class="btn btn-error" @click="confirmDelete">Yes, Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { globalErrorMessage } from '../../../components/errorBanner/ErrorBanner.vue';
export default {
  name: 'SelectItem',
  props: ['type', 'mealId'],
  data() {
    return {
      searchQuery: '',
      newItem: {
        name: '',
        calories: '',
      },
      items: [],
      isLoaded: false,
      showDeleteModal: false,
      itemToDeleteId: null
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
      const returnPath = this.$route.path.split('/select')[0];
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
        await axios.post('/food', newEntry);
        await this.fetchItems();
        this.newItem.name = '';
        this.newItem.calories = '';
      } catch (err) {
        console.error('Error adding food item:', err.response?.data || err.message);
        if (err.response?.data?.message) {
          globalErrorMessage.value = err.response.data.message;
        } else {
          globalErrorMessage.value = 'Something went wrong.';
        }
      }
    },
    async deleteItem(id) {
      this.itemToDeleteId = id;
      this.showDeleteModal = true;
    },
    async confirmDelete() {
      try {
        await axios.delete(`/food/${this.itemToDeleteId}`);
        this.items = this.items.filter(item => item._id !== this.itemToDeleteId);
      } catch (err) {
        console.error('Error deleting item:', err.response?.data || err.message);
      } finally {
        this.showDeleteModal = false;
        this.itemToDeleteId = null;
      }
    },
    async fetchItems() {
      try {
        const res = await axios.get('/foods');
        this.items = res.data.foods.filter(food => food.isDrink === (this.type === 'drink'));
      } catch (err) {
        console.error('Error fetching food list:', err.response?.data || err.message);
      }
    }
  },
  async mounted() {
    await this.fetchItems();
    this.isLoaded = true;
  }
};
</script>