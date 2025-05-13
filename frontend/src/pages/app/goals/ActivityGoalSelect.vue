<template>
    <div class="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
        @click.self="$emit('cancel', localGoal.group)">
        <div class="bg-base-200 p-6 rounded-xl w-80 text-center">
            <h2 class="text-lg font-semibold mb-4">Choose Activity Goal Type</h2>
            <div class="flex justify-center gap-4">
                <select v-model="choice" class="select font-bold text-base-content/69 text-center w-3/4 mb-4">
                    <option disabled value="">Select an activity type (from your activity list)</option>
                    <option v-for="activity in activityList" :key="activity._id" :value="activity">
                        {{ activity.name }} ({{ activity.unit }})
                    </option>
                </select>

            </div>
            <div class="space-x-3">
                <button @click="$emit('cancel', localGoal.group)" class="btn w-1/4 btn-error btn-soft">Back</button>
                <button @click="confirm(choice)" class="btn w-2/4 btn-success" :disabled="!choice">
                    Confirm
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'ActivityGoalSelect',
    props: {
        goal: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            localGoal: { ...this.goal },
            choice: '',
            activityList: null,
        };
    },
    async mounted() {
        try {
            const res = await axios.get('/activities');
            this.activityList = res.data.activities; // fixed typo here
            console.log(this.activityList);
        } catch (err) {
            console.error('Error fetching activities:', err.response?.data);
        }
    },
    methods: {
        // Set unit and Choice to goal object values.
        confirm(selectedActivity) {
            this.localGoal.progressLabel = selectedActivity.name;
            this.localGoal.unit = selectedActivity.unit;
            console.log(this.localGoal);
            this.$emit('confirm', this.localGoal);
        }
    }

}
</script>
