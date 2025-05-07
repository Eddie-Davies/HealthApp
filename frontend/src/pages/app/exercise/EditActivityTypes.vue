<template>
    <div v-if="isLoaded" class="p-4 space-y-4">

        <button class="btn btn-ghost" @click="goBack">
            ← Back
        </button>

        <h1 class="text-2xl font-semibold">Select activity type</h1>

        <input v-model="searchQuery" type="text" placeholder="Search..." class="input input-bordered w-full" />

        <div class="divide-y border rounded mt-2">
            <div v-if="filteredTypes.length === 0" class="tooltip flex justify-center items-center p-4"
                data-tip="Fill out a new activity type below :)">
                <button class="btn">Add a new activity type to start tracking!</button>
            </div>
            <div v-for="type in filteredTypes" :key="type._id"
                class="flex justify-between items-center p-3 hover:bg-gray-100">
                <span>{{ type.name }}</span> <span>{{ type.unit }}</span>
                <button class="btn btn-sm btn-error ml-2 p-3" @click.stop="deleteType(type._id)">Delete</button>
            </div>
        </div>

        <div class="mt-6 border-t pt-4">
            <h2 class="font-semibold mb-2">Add new activity type:</h2>
            <input v-model="newType.name" placeholder="Name" class="input input-bordered w-full mb-2" />
            <input v-model="newType.unit" placeholder="Unit" class="input input-bordered w-full mb-4" />
            <button class="btn btn-primary w-full" @click="addType"> Add to activity type List </button>
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
        async addType() {
            if (
                !this.newType.name ||
                !this.newType.unit
            ) return;

            const newEntry = {
                name: this.newType.name,
                unit: this.newType.unit
            };
            try {
                await axios.post('/activityTypes', newEntry);
                await this.fetchTypes();
                this.newType.name = '';
                this.newType.unit = '';
            } catch (err) {
                console.error('Error adding activity type:', err.response?.data || err.message);
                if (err.response?.data?.message) {
                    globalErrorMessage.value = err.response.data.message;
                } else {
                    globalErrorMessage.value = 'Something went wrong.';
                }
            }
        },
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
                console.log(res.data)
            } catch (err) {
                console.error('Error fetching activity type list:', err.response?.data || err.message);
            }
        },
        goBack() {
            if (this.activityId) {
                this.$router.push(`/home/exercise/${this.exerciseId}`);
            } else {
                this.$router.push('/home/exercise/new');
            }
        }
    },
    async mounted() {
        await this.fetchTypes();
        this.isLoaded = true;
    }
};
// TO DO!!!! newly added items to not get added until page is reloaded
</script>