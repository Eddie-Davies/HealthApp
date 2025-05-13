<template>
  <div class="flex justify-center min-h-screen items-start pt-10">
    <div v-if="isLoaded" class="px-4">
      <h1 class="text-2xl font-semibold mb-10 text-center">Select {{ capitalizedType }}</h1>
      <div class="flex justify-center">
        <input v-model="searchQuery" type="text" placeholder="Search my list..." class="input input-bordered w-2/3" />
      </div>
      <div class="mt-5 rounded-2xl">

        <div v-if="filteredItems.length === 0" class="tooltip flex justify-center items-center p-4"
          data-tip="Fill out a new food item below :)">
          <div class="btn cursor-default">Add a new food item to start tracking!</div>
        </div>
        <!-- Table Headings -->
        <div v-if="filteredItems.length !== 0" class="flex justify-between items-center px-3 py-2 font-semibold text-base-content/50">
          <div class="flex-1 flex justify-between mr-3">
            <span class="">{{ capitalizedType }}</span>
            <span class="mr-15">Calories</span>
          </div>
        </div>

        <div v-for="item in filteredItems" :key="item._id"
          class="flex justify-between items-center p-3 hover:bg-base-200/50 bg-base-200 cursor-pointer rounded-full mb-2"
          @click="selectItem(item)">
          <div class="flex-1 flex justify-between mr-3 text-base-content/95">
            <span class="ml-3">{{ item.name }}</span>
            <span class="font-semibold">{{ item.calories }} kcal</span>
          </div>
          <button class="btn btn-sm btn-error btn-soft btn-ghost btn-outline p-3 text-error hover:text-base-content"
            @click.stop="deleteItem(item._id)">Delete</button>
        </div>

      </div>


      <div class="mt-6 border-t border-neutral/50 pt-4">
        <h2 class="text-2xl font-semibold mb-5">Add new {{ capitalizedType }}:</h2>
        
        <div class="flex flex-col lg:flex-row justify-between">
          <div class="flex flex-col lg:flex-row gap-4 mb-5 w-full ">
            <div class="flex flex-col justify-start space-y-2">
              <label class="block text-sm text-base-content/70 font-semibold">Name of {{ capitalizedType }}:</label>
              <input v-model="newItem.name" :placeholder="capitalizedType === 'Drink' ? 'Cappuccino' : 'Sandwich'" class="input input-bordered w-full lg:w-auto" />
            </div>
            <div class="flex flex-col lg:ml-6 space-y-2">
              <label class="block text-sm text-base-content/70 font-semibold">Calories:</label>
              <input v-model="newItem.calories" :placeholder="capitalizedType === 'Drink' ? '40 kcal' : '650 kcal'" type="number" class="input  w-full lg:w-auto" />
            </div>
          </div>
        </div>

        <button class="btn btn-primary w-full mb-3" @click="addItem">
          Add to {{ capitalizedType }} List
        </button>
      <button class="btn w-full btn-error btn-soft mb-25" @click="$router.push(this.$route.path.split('/select')[0])">Back</button>
      </div>
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