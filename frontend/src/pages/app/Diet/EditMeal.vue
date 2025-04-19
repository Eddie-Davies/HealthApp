<template>
    <div class="edit-meal">
        <h2>Edit Meal: {{ mealName }}</h2>

        <div class="calories">
            Total Calories: {{ totalCalories }} kcal
        </div>

        <div class="section">
            <h3>Food</h3>
            <button @click="addFood">Add Food</button>
        </div>

        <div class="section">
            <h3>Drinks</h3>
            <div v-for="(drink, index) in drinks" :key="index" class="drink-item">
                <span>{{ drink.name }}</span>
                <span>{{ drink.calories }} kcal</span>
            </div>
            <button @click="addDrink">Add Drink</button>
        </div>

        <button class="save-button" @click="saveMeal">Save Meal</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const mealId = route.params.id;
const isNew = mealId === undefined;

const mealName = ref('');
const totalCalories = ref(0);
const drinks = ref([]);


// Dummy fetch on mount
onMounted(() => {
    if (!isNew) {
        // fetch meal from backend
    } else {
        mealName.value = '';
        totalCalories.value = 0;
        drinks.value = [];
    }
    // TODO: Replace with API call to get meal by ID
    mealName.value = 'Dinner';
    totalCalories.value = 500;
    drinks.value = [{ name: 'Milkshake', calories: 500 }];
});

function addFood() {
    // TODO: Logic to add food
    alert('Add food clicked');
}

function addDrink() {
    // TODO: Logic to add drink
    alert('Add drink clicked');
}

function saveMeal() {
    if (isNew) {
        // POST /api/meals/ (create new)
    } else {
        // PUT /api/meals/:id (update existing)
    }
    // TODO: Save changes via API
    alert(`Saving meal ${mealId}`);
}
</script>

<style scoped>
.edit-meal {
    padding: 20px;
}

.section {
    margin-top: 20px;
}

.drink-item {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
}

.save-button {
    margin-top: 30px;
    background-color: dodgerblue;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
}
</style>