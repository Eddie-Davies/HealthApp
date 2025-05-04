<template>
    <div class="card bg-base-300 rounded-box p-4 flex flex-col mt-4">
        <div class="flex justify-between items-center mb-2">
            <h1 class="text-lg font-bold text-neutral">
                {{ totalCalories }} kcal {{ name }}
            </h1>
            <button class="text-neutral hover:text-accent" @click="goToEditPage">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15.232 5.232a4 4 0 00-5.464 0L3 12.586V17h4.414l6.768-6.768a4 4 0 000-5.464z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19.428 15.342a1.5 1.5 0 00-2.121 0L16 17.293l3.414 3.414a1.5 1.5 0 002.121-2.121z" />
                </svg>
            </button>
        </div>

        <div class="grid grid-cols-2 text-sm mb-2">
            <div>
                <p class="text-neutral-400 font-semibold">Food</p>
                <ul class="text-neutral mt-1">
                    <li v-for="(item, index) in food" :key="'food-' + index">{{ item.name }}</li>
                </ul>
            </div>
            <div class="text-right">
                <p class="text-neutral-400 font-semibold">Calories</p>
                <ul class="text-neutral mt-1">
                    <li v-for="(item, index) in food" :key="'food-cal-' + index">{{ item.calories || 0 }} kcal</li>
                </ul>
            </div>
        </div>

        <div class="grid grid-cols-2 text-sm">
            <div>
                <p class="text-neutral-400 font-semibold">Drinks</p>
                <ul class="text-neutral mt-1">
                    <li v-for="(item, index) in drinks" :key="'drink-' + index">{{ item.name }}</li>
                </ul>
            </div>
            <div class="text-right">
                <p class="text-neutral-400 font-semibold invisible">Calories</p> <!-- hidden label for alignment -->
                <ul class="text-neutral mt-1">
                    <li v-for="(item, index) in drinks" :key="'drink-cal-' + index">{{ item.calories || 0 }} kcal</li>
                </ul>
            </div>
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
