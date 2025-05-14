<template>
    <div class="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
        @click.self="$emit('cancel', localGoal.group)">
        <div class="bg-base-200 p-6 rounded-xl w-80 text-center">
            <h2 class="text-lg font-semibold mb-4">Focus of {{ activity}} Goal</h2>
            <div class="flex justify-center gap-4">
                <select v-model="choice" class="select font-bold text-base-content/69 text-center w-3/4 mb-4">
                    <option disabled value="">Select a goal type</option>
                    <option v-for="(label, key) in specificGoal" :key="key" :value="key">
                        {{ label }}
                    </option>
                </select>

            </div>
            <div class="space-x-3">
                <button @click="$emit('cancel' , goal.group)" class="btn w-1/4 btn-error btn-soft">Back</button>
                <button @click="confirm(choice)" class="btn w-2/4 btn-success" :disabled="!choice">
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
            activity: this.goal.progressLabel,
            unit: this.goal.unit,
            choice: '',
        };
    },
    computed: {
        specificGoal() {
            return {
                Standard: `${this.activity} a set amount of ${this.unit}`,
                Speed: `${this.activity} ${this.unit} within a time limit`,
                Consistency: `${this.activity} regularly (weekly/daily/etc.)`
            };
        }
    },
    mounted() {
        console.log(this.goal.progressLabel)
    },
    methods: {
        // Set unit and Choice to goal object values.
        confirm(choice) {
            const labelMap = {
                Standard: 'Remaining',
                Speed: 'Under',
                Consistency: 'Left'
            };

            this.localGoal.remainingLabel = labelMap[choice] || '';
            console.log(this.localGoal)
            // Emit or handle the updated goal as needed
            this.$emit('confirm', this.localGoal);
        }
    }
}
</script>