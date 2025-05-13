<template>
    <div class="fixed inset-0 bg-black/90 flex items-center justify-center z-50" @click.self="$emit('cancel', localGoal.group)">
        <div class="bg-base-200 p-6 rounded-xl w-80 text-center">
            <h2 class="text-lg font-semibold mb-4">Choose Diet Goal Type</h2>
            <div class="flex justify-center gap-4">
                <select v-model="choice" class="select font-bold text-base-content/69 text-center w-3/4 mb-4">
                    <option disabled value="">Select a goal</option> 
                    <option>Lose Weight</option>
                    <option>Gain Weight</option>
                    <option>Eat More Calories</option>
                    <option>Eat Less Calories</option>
                </select>
            </div>
            <div class="space-x-3">
                <button @click="$emit('cancel' , localGoal.group)" class="btn w-1/4 btn-error btn-soft">Back</button>
                <button 
                    @click="confirm(choice)"
                    class="btn w-2/4 btn-success" 
                    :disabled="!choice"
                >
                    Confirm
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'DietGoalSelect',
    props: {
        goal: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            localGoal: { ...this.goal },
            choice: '',
            weight: 0,
        };
    },
    async mounted() {
        console.log('GROUP', this.localGoal.group)
        // Get user weight
        try {
            const res = await axios.get('/weights');
            const weights = res.data;
            this.weight = weights.weight
            console.log(this.weight);
        } catch (err) {
            console.error('Error fetching user weight:', err.response?.data || err.message);
        }
    },
    methods: {
        // Set unit and Choice to goal object values.
        confirm(choice) {
            this.localGoal.progressLabel = choice
            if (choice == 'Lose Weight' || choice == 'Gain Weight') {
                this.localGoal.progressLabel = choice
                this.localGoal.trackFrom = this.weight // TODO: LOAD WEIGHT AT THE TIME FROM THE BACKEND
                this.localGoal.unit = 'kg'
            }
            else if (choice == 'Eat More Calories' || choice == 'Eat Less Calories') {
                this.localGoal.progressLabel = choice.replace('Eat ', '');
                this.localGoal.unit = 'kcal'
            }
            console.log(this.localGoal.unit)
            this.$emit('confirm', this.localGoal);

        },
    }
    
}
</script>
