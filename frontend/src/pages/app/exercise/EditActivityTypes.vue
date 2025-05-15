
<template>
  <!-- Main container -->
    <div class="flex justify-center min-h-screen items-start pt-10">
      <div v-if="isLoaded" class="px-4">
        <h1 class="text-2xl font-semibold mb-10 text-center">Select Activity Type</h1>
  
        <div class="flex justify-center">
          <input v-model="searchQuery" type="text" placeholder="Search..." class="input input-bordered w-2/3" />
        </div>
  
        <div class="mt-5 rounded-2xl">
          <div v-if="filteredTypes.length === 0" class="tooltip flex justify-center items-center p-4" data-tip="Fill out a new activity type below :)">
            <div class="btn cursor-default">Add a new activity type to start tracking!</div>
          </div>
  
          <!-- Table Headings -->
          <div v-if="filteredTypes.length !== 0" class="flex justify-between items-center px-3 py-2 font-semibold text-base-content/50">
            <div class="flex-1 flex justify-between mr-3">
              <span>Activity Type</span>
              <span class="mr-15">Unit</span>
            </div>
          </div>
  
          <!-- List of activity types with delete buttons -->
          <div v-for="type in filteredTypes" :key="type._id"
            class="flex justify-between items-center p-3 hover:bg-base-200/50 bg-base-200 cursor-pointer rounded-full mb-2">
            <div class="flex-1 flex justify-between mr-3 text-base-content/95">
              <span class="ml-3">{{ type.name }}</span>
              <span class="font-semibold">{{ type.unit }}</span>
            </div>
            <button class="btn btn-sm btn-error btn-soft btn-ghost btn-outline p-3 text-error hover:text-base-content"
              @click.stop="deleteType(type._id)">Delete</button>
          </div>
        </div>
  
        <!-- Form section -->
        <div class="mt-6 border-t border-neutral/50 pt-4">
          <h2 class="text-2xl font-semibold mb-5">Add new activity type:</h2>
          
          <div class="flex flex-col lg:flex-row justify-between">
            <div class="flex flex-col lg:flex-row gap-4 mb-5 w-full ">
              <div class="flex flex-col justify-start space-y-2">
                <label class="block text-sm text-base-content/70 font-semibold">Activity Name:</label>
                <input v-model="newType.name" placeholder="e.g. Run" class="input input-bordered w-full lg:w-auto" />
              </div>
              <div class="flex flex-col lg:ml-6 space-y-2">
                <label class="block text-sm text-base-content/70 font-semibold">Unit:</label>
                <input v-model="newType.unit" placeholder="e.g. km" class="input input-bordered w-full lg:w-auto" />
              </div>
            </div>
          </div>
  
          <!-- Action buttons -->
          <button class="btn btn-primary w-full mb-3" @click="addType">
            Add to Activity Type List
          </button>
          <button class="btn w-full btn-error btn-soft mb-25" @click="goBack">Back</button>
        </div>
      </div>
    </div>
  
    <div v-if="showDeleteModal" @click.self="showDeleteModal = false"
      class="fixed inset-0 bg-black/90 flex justify-center items-center z-50">
      <div class="bg-base-100 p-6 rounded-xl shadow-lg max-w-sm w-full">
        <h2 class="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this activity type?</p>
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
    name: 'EditActivityTypes',
    props: ['exerciseId'],
    data() {
        return {
            searchQuery: '',
            newType: {
                name: '',
                unit: '',
            },
            types: [],
            isLoaded: false,
            showDeleteModal: false,
            typeToDeleteId: null
        };
    },

    computed: {
        filteredTypes() {
            return this.types.filter(type =>
                type.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
    },

    methods: {
      // Adds a new activity type to the database
        async addType() {
            if (
                !this.newType.name ||
                !this.newType.unit
            ) return;

            // Create new activity type object
            const newEntry = {
                name: this.newType.name,
                unit: this.newType.unit
            };
            try {
                const response = await axios.post('/activityTypes', newEntry);
                // Test this code even without reload
                this.newType.name = '';
                this.newType.unit = '';
                await this.fetchTypes();
            } catch (err) {
                console.error('Error occurred during POST:', err?.message || err);
            }

        },
        // Initiates deletion process for an activity type
        async deleteType(id) {
            this.typeToDeleteId = id;
            this.showDeleteModal = true;
        },
        async confirmDelete() {
            try {
                await axios.delete(`/activityType/${this.typeToDeleteId}`);
                this.types = this.types.filter(type => type._id !== this.typeToDeleteId);
            } catch (err) {
                console.error('Error deleting type:', err.response?.data || err.message);
            } finally {
                this.showDeleteModal = false;
                this.typeToDeleteId = null;
            }
        },
        async fetchTypes() {
            try {
                const res = await axios.get('/activityTypes');
                this.types = res.data.activityTypes;
            } catch (err) {
                console.error('Error fetching activity type list:', err.response?.data || err.message);
            }
        },
        goBack() {
            if (this.activityId) {
                this.$router.push(`/home/exercise`);
            } else {
                this.$router.push('/home/exercise');
            }
        }
    },
    async mounted() {
        await this.fetchTypes();
        this.isLoaded = true;
    }
};
</script>