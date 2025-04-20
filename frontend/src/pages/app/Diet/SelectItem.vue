<template>
    <div class="p-4 space-y-4">
      <h1 class="text-2xl font-semibold">Select {{ capitalizedType }}</h1>
  
      <!-- Search -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search..."
        class="input input-bordered w-full"
      />
  
      <!-- List -->
      <div class="divide-y border rounded mt-2">
        <div
          v-for="item in filteredItems"
          :key="item.name"
          class="flex justify-between items-center p-3 hover:bg-gray-100 cursor-pointer"
          @click="selectItem(item)"
        >
          <span>{{ item.name }}</span>
          <span>{{ item.calories }}kcal</span>
        </div>
      </div>
  
      <!-- Add New -->
      <div class="mt-6 border-t pt-4">
        <h2 class="font-semibold mb-2">Add new {{ capitalizedType }}:</h2>
        <input
          v-model="newItem.name"
          placeholder="Name"
          class="input input-bordered w-full mb-2"
        />
        <input
          v-model="newItem.calories"
          placeholder="Calories"
          type="number"
          class="input input-bordered w-full mb-4"
        />
        <button class="btn btn-primary w-full" @click="addItem">
          Add to {{ capitalizedType }} List
        </button>
      </div>
    </div>
  </template>
  
  <script>
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
        foods: [
          { name: 'Sausage Roll', calories: 532 },
          { name: 'Pizza', calories: 504 },
          { name: 'Tuna', calories: 602 },
          { name: 'Spag Bol', calories: 301 },
          { name: 'Uranium Chair', calories: 60087 },
          { name: 'Chips', calories: 297 },
        ],
        drinks: [
          { name: 'Milkshake', calories: 500 },
          { name: 'Water', calories: 0 },
          { name: 'Tea', calories: 30 },
        ],
      };
    },
    computed: {
      capitalizedType() {
        return this.type.charAt(0).toUpperCase() + this.type.slice(1);
      },
      itemList() {
        return this.type === 'food' ? this.foods : this.drinks;
      },
      filteredItems() {
        return this.itemList.filter(item =>
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods: {
      selectItem(item) {
        // Example: push data to edit meal page (this is a placeholder)
        console.log(`Selected ${this.type}:`, item);
        this.$router.back(); // Or emit an event to pass data back
      },
      addItem() {
        if (!this.newItem.name || !this.newItem.calories) return;
  
        const parsedCalories = parseInt(this.newItem.calories);
        const newEntry = {
          name: this.newItem.name,
          calories: parsedCalories,
        };
  
        if (this.type === 'food') {
          this.foods.push(newEntry);
        } else {
          this.drinks.push(newEntry);
        }
  
        this.newItem.name = '';
        this.newItem.calories = '';
      },
    },
  };
  </script>
  