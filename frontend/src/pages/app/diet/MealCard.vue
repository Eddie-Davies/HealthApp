<template>
    <div class="card bg-base-300 rounded-box p-4 flex flex-col mt-8">
        <!-- Top: Title -->
        <h1 class="text-lg font-semibold text-neutral/80">{{ name }}</h1>
        <p class="text-sm text-gray-500 mb-2">{{ formattedDateTime }}</p>

        <!-- Activity Details -->
        <div class="flex justify-between mt-2">
            <div>
                <p class="text-neutral-400">Food</p>
                <ul class="text-neutral text-sm">
                    <li v-for="(item, index) in food" :key="index">{{ item.name }}</li>
                </ul>
            </div>
            <div>
                <p class="text-neutral-400">Drinks</p>
                <ul class="text-neutral text-sm">
                    <li v-for="(item, index) in drinks" :key="index">{{ item.name }}</li>
                </ul>
            </div>
            <div>
                <p class="text-neutral-400">Calories</p>
                <h2 class="font-medium text-neutral">{{ totalCalories }} kcal</h2>
            </div>
        </div>

        <!-- Edit Icon -->
        <div class="flex justify-end mt-3">
            <button class="text-neutral hover:text-accent" @click="goToEditPage">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15.232 5.232a4 4 0 00-5.464 0L3 12.586V17h4.414l6.768-6.768a4 4 0 000-5.464z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19.428 15.342a1.5 1.5 0 00-2.121 0L16 17.293l3.414 3.414a1.5 1.5 0 002.121-2.121z" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
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
