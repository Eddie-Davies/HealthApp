<template>
    <div class="fixed inset-0 bg-black/90 flex items-center justify-center z-50" @click.self="$emit('cancel', localGoal.group)">
        <div class="bg-base-200 p-6 rounded-xl w-80 text-center">
            <h2 class="text-lg font-semibold mb-4">Choose Run Goal Type</h2>
            <div class="flex justify-center gap-4">
                <select v-model="choice" class="select font-bold text-base-content/69 text-center w-3/4 mb-4">
                    <option disabled value="">Select a activity type (from your activity list)</option> 
                    <option>Standard</option>
                    <option>Under</option>
                    <option>Reps</option>
                </select>
            </div>
            <div class="space-x-3">
                <button @click="$emit('cancel' , goal.group)" class="btn w-1/4 btn-error btn-soft">Back</button>
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
export default {
    name: 'ActivityGoalRefine',
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
        };
    },
    mounted() {
        console.log(this.goal)
    },
    methods: {

        // Set unit and Choice to goal object values.
        confirm(choice) {
            this.localGoal.remainingLabel = choice
            console.log(this.localGoal)
            // set unit to activity.unit
            // console.log(this.localGoal.unit)
            this.$emit('confirm', this.localGoal);

        },
    }
}
</script>