<template>
    <!-- The main container -->
    <div class="card bg-base-200 rounded-box p-4 flex flex-col mt-4 cursor-pointer hover:bg-base-200/60" @click="goToEditPage">
        <div class="flex justify-between items-center mb-2">
            <h1 class="text-lg font-bold text-base-content/95">
                {{ totalCalories }} kcal {{ name }}
            </h1>
            <p class="text-sm text-neutral/50">{{ formattedDateTime }}</p>
        </div>

        <!-- Food items and their calorie count -->
        <div class="grid grid-cols-2 text-sm">
            <div>
                <p class="text-base-content/55 font-semibold" v-if="food.length">Food</p>
                <ul class="text-neutral mt-0.5 text-base">
                    <li v-for="(item, index) in food" :key="'food-' + index">{{ item.name }}</li>
                </ul>
            </div>
            <div class="text-right">
                <p class="text-base-content/55 font-semibold" v-if="food.length">Calories</p>
                <ul class="text-neutral mt-0.5 text-base">
                    <li v-for="(item, index) in food" :key="'food-cal-' + index">{{ item.calories || 0 }} kcal</li>
                </ul>
            </div>
        </div>
        <!-- Drinks section and their calorie count -->
        <div v-if="food.length" class="mt-4"></div>
        <div v-if="drinks.length" class="grid grid-cols-2 text-sm">
            <div>
                <p class="text-base-content/55 font-semibold">Drinks</p>
                <ul class="text-neutral mt-0.5 text-base">
                    <li v-for="(item, index) in drinks" :key="'drink-' + index">{{ item.name }}</li>
                </ul>
            </div>
            <div class="text-right">
                <p class="text-base-content/55 font-semibold" :class="{'opacity-0': food.length}">Calories</p>
                <ul class="text-neutral mt-0.5 text-base">
                    <li v-for="(item, index) in drinks" :key="'drink-cal-' + index">{{ item.calories || 0 }} kcal</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        // Navigates to the edit page for the given diet entry
        goToEditPage() {
            this.$router.push(`/home/diet/${this.id}`)
        }
    },
    name: 'DietCard',
    props: {
        name: {
            type: String,
            default: 'Meal Name'
        },
        food: {
            type: Array,
            default: () => []
        },
        drinks: {
            type: Array,
            default: () => []
        },
        date: [String, Date],
        id: {
            type: String,
            required: true
        }
    },
    computed: {
        totalCalories() {
            const sumCalories = (items) =>
                items.reduce((acc, item) => acc + (item.calories || 0), 0);
            return sumCalories(this.food) + sumCalories(this.drinks);
        },
        formattedDateTime() {
            if (!this.date) return 'Unknown Date';
            const date = new Date(this.date);
            if (isNaN(date)) return 'Invalid Date';

            return date.toLocaleString(undefined, {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        }
    }
}
</script>
