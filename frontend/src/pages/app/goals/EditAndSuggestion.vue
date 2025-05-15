<template>
    <div v-if="goal" class="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
        @click.self="$emit('cancel')">
        <div class="flex gap-6 items-start max-w-[95vw] max-h-[95vh] overflow-auto p-4">

            <!-- GOAL EDIT CARD -->
            <div class="bg-base-200 p-6 rounded-xl w-[24rem] max-h-[90vh] overflow-y-auto">
                <template v-if="goal.type === 'activity'">
                    <div class="text-lg font-semibold mb-4 text-center">{{ activityConfig.title }}</div>

                    <label v-if="activityConfig.focus === 'Consistency'" class="text-left block text-sm mb-2">
                        {{ activityConfig.activity }} Count
                    </label>
                    <label v-else class="text-left block text-sm mb-2">
                        Amount to {{ activityConfig.activity }} ({{ activityConfig.unit }})
                    </label>

                    <input v-model.number="editableGoal.target" :placeholder="goal.target" type="number"
                        class="input input-bordered w-full mb-2" />

                    <label class="text-left block text-sm mb-2">Override Deadline:</label>
                    <input v-model="editableGoal.date" type="date" class="input input-bordered w-full" />

                    <div
                        class="flex-col items-center justify-center text-center p-5 rounded-3xl bg-base-100 mt-5 mb-10">
                        <div v-if="isTodaySelected" class="text-sm">Default Deadline (today's Date):</div>
                        <div v-else class="text-sm">Deadline currently set to:</div>
                        <h1 class="font-semibold text-2xl text-primary">{{ formattedDate }}</h1>
                    </div>
                </template>

                <template v-else-if="goal.type === 'diet'">
                    <h2 class="text-lg font-semibold mb-4 text-center">{{ editableGoal.progressLabel }}</h2>

                    <div v-if="isWeightGoal" class="flex items-baseline justify-center">
                        <p class="text-sm opacity-70 mr-1">{{ isNew ? 'Starting Weight:' : 'Started at:' }}</p>
                        <span class="font-semibold text-lg">{{ editableGoal.trackFrom }}</span>
                        <span class="text-sm font-semibold text-neutral/90">{{ editableGoal.unit }}</span>
                    </div>

                    <div class="flex items-baseline justify-center mb-3">
                        <span class="text-sm opacity-70 mr-1">Change by:</span>
                        <span class="font-semibold text-lg">{{ sliderDisplay }}</span>
                        <span class="text-sm font-semibold text-neutral/90">{{ editableGoal.unit }}</span>
                    </div>

                    <div v-if="isCalorieGoal" class="text-sm text-neutral/80 mb-3 text-center">
                        For a total of <span class="font-semibold text-lg text-neutral">{{ totalDailyCals }}</span> kcal
                        per day
                    </div>

                    <div class="flex flex-col gap-4">
                        <div class="collapse bg-base-100 border border-base-300">
                            <input type="radio" name="diet-slider" checked />
                            <div class="collapse-title font-semibold">
                                Reasonable {{ dietConfig.goalType.toLowerCase() }} target
                            </div>
                            <div class="collapse-content text-sm">
                                <input type="range" step="1" :min="dietConfig.min" :max="dietConfig.max"
                                    v-model.number="sliderDisplay" class="w-full" />
                            </div>
                        </div>

                        <div class="collapse bg-base-100 border border-base-300">
                            <input type="radio" name="diet-slider" />
                            <div class="collapse-title font-semibold">Custom Figure</div>
                            <div class="collapse-content text-sm">
                                <input type="number" step="1" :min="dietConfig.min" :max="dietConfig.max"
                                    v-model.number="sliderDisplay" class="input input-bordered w-full" />
                            </div>
                        </div>
                    </div>

                    <label class="block text-sm mt-4 mb-2">Override Deadline:</label>
                    <input v-model="editableGoal.date" type="date" class="input input-bordered w-full" />

                    <div class="text-center mt-5">
                        <h1 class="font-semibold text-2xl text-primary">{{ formattedDate }}</h1>
                    </div>
                </template>


                <template v-else>
                    <h2 class="text-lg font-semibold mb-4 text-center">{{ goalTitle }}</h2>
                    <label class="block text-sm mb-2">Target</label>
                    <input v-model.number="editableGoal.target" type="number"
                        class="input input-bordered w-full mb-2" />

                    <label class="block text-sm mb-2">Progress</label>
                    <input v-model.number="editableGoal.progress" type="number"
                        class="input input-bordered w-full mb-2" />

                    <label class="block text-sm mb-2">Unit</label>
                    <input v-model="editableGoal.unit" type="text" class="input input-bordered w-full mb-4" />

                    <label class="block text-sm mb-2">Progress Label</label>
                    <input v-model="editableGoal.progressLabel" type="text" class="input input-bordered w-full mb-2" />

                    <label class="block text-sm mb-2">Target Label</label>
                    <input v-model="editableGoal.remainingLabel" type="text" class="input input-bordered w-full mb-4" />

                    <label class="block text-sm mb-2">Override Deadline</label>
                    <input v-model="editableGoal.date" type="date" class="input input-bordered w-full mb-2" />

                    <div class="text-center mt-4">
                        <h1 class="font-semibold text-2xl text-primary">{{ formattedDate }}</h1>
                    </div>
                </template>

                <!-- Action Buttons -->
                <div class="space-y-3 mt-6">
                    <div class="flex md:space-x-3 space-y-2">
                        <button @click="$emit('cancel')" class="btn w-full md:w-auto block md:flex-1 btn-error">Quit</button>
                        <button :disabled="!isFormValid" class="btn w-full md:w-auto block md:flex-2 btn-success"
                            @click="$emit('save', editableGoal)">Confirm</button>
                    </div>
                    <button v-if="!isNew" class="btn btn-error btn-soft w-full"
                        @click="$emit('confirm-delete', editableGoal)">Delete</button>
                </div>
            </div>

            <div class="bg-base-100 p-6 rounded-xl w-[24rem] max-h-[90vh] overflow-y-auto shadow-xl">
                <h2 class="text-xl font-semibold mb-4 text-center text-warning">
                    <i class="fa-solid fa-lightbulb mr-2"></i>Suggested New Goals
                </h2>
                <div class="space-y-4">
                    <div v-for="(suggestion, index) in generatedSuggestions" :key="index"
                        class="p-4 bg-base-300 rounded-lg">
                        <p class="font-semibold">{{ suggestion.title }}</p>
                        <p class="text-sm text-neutral/70">{{ suggestion.description }}</p>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>


<script>
export default {
    name: 'EditAndSuggestion',
    props: {
        goal: {
            type: Object,
            required: true
        },
        suggestions: {
            type: Array,
            default: () => [
                {
                    title: 'Increase reps to 30',
                    description: 'Based on your performance, try pushing your limit slightly further.',
                },
                {
                    title: 'Try 3x/week consistency',
                    description: 'Switch to a weekly consistency-based target to stay active.',
                },
                {
                    title: 'Reduce time goal by 10%',
                    description: 'You’ve beaten your time easily – make it more challenging!',
                },
            ],
        },
        isNew: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            editableGoal: { ...this.goal },
            page: 1
        };
    },
    computed: {
        isTodaySelected() {
            const today = new Date().toISOString().split('T')[0];
            return this.editableGoal.date?.split('T')[0] === today;
        },
        formattedDate() {
            if (!this.editableGoal.date) return 'No deadline set';
            const date = new Date(this.editableGoal.date);
            return date.toLocaleDateString(undefined, {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        },
        isFormValid() {
            return (
                this.editableGoal.target !== null &&
                this.editableGoal.unit &&
                (!this.editableGoal.type || this.editableGoal.type === 'custom' || this.editableGoal.time || this.editableGoal.date)
            );
        },
        isWeightGoal() {
            return this.goal?.progressLabel?.includes('Weight');
        },
        isCalorieGoal() {
            return this.goal?.progressLabel?.includes('Calories');
        },
        dietConfig() {
            return {
                min: this.isWeightGoal ? 0 : 100,
                max: this.isWeightGoal ? 200 : 1000,
                goalType: this.goal?.progressLabel?.includes('Gain') ? 'Gain' : 'Lose'
            };
        },
        activityConfig() {
            return {
                activity: 'Running',
                focus: this.goal?.time ? 'Speed' : 'Consistency',
                unit: this.goal?.unit || 'units',
                title: 'Adjust your activity goal'
            };
        },
        sliderDisplay: {
            get() {
                return this.editableGoal.target;
            },
            set(val) {
                this.editableGoal.target = val;
            }
        },
        goalTitle() {
            return this.goal?.progressLabel || 'Edit Goal';
        },
        generatedSuggestions() {
            const suggestions = [];

            if (!this.goal) return suggestions;

            const roundedTarget = Math.round(this.goal.target || 0);
            const nextIncrement = roundedTarget + Math.max(1, Math.round(roundedTarget * 0.1));
            const smallReduction = roundedTarget - Math.max(1, Math.round(roundedTarget * 0.1));

            if (this.goal.type === 'activity') {
                suggestions.push({
                    title: `Try ${nextIncrement} ${this.goal.unit}`,
                    description: `You completed your activity! Consider increasing your target to ${nextIncrement} ${this.goal.unit}.`
                });

                if (this.goal.time) {
                    suggestions.push({
                        title: 'Reduce your time limit slightly',
                        description: `You hit your speed target. Try shaving off 10% to challenge yourself further.`
                    });
                } else {
                    suggestions.push({
                        title: 'Increase weekly frequency',
                        description: `Try aiming for 3–4 sessions a week for improved consistency.`
                    });
                }
            } else if (this.goal.type === 'diet') {
                const direction = this.goal.progressLabel?.includes('Gain') ? 'Gain' : 'Lose';
                suggestions.push({
                    title: `Adjust your ${direction.toLowerCase()} goal`,
                    description: `You successfully met your diet goal. Consider a gradual adjustment for continued progress.`
                });
                suggestions.push({
                    title: 'Reassess calorie targets',
                    description: `If you're maintaining results, review if a new intake plan could help push further.`
                });
            } else {
                //custom goals
                suggestions.push({
                    title: `Try a target of ${nextIncrement} ${this.goal.unit}`,
                    description: `You hit your target — consider increasing it slightly to ${nextIncrement}.`
                });
                suggestions.push({
                    title: 'Keep the momentum',
                    description: 'Stay on track by setting a slightly more ambitious follow-up goal.'
                });
            }

            return suggestions;
        }
    },
    mounted() {
        console.log('EditAndSuggestion mounted with goal:', this.goal);
    }
};
</script>


<style scoped>
/* resonsive to mobile view, puts the suggestions below the goal */
@media (max-width: 768px) {
    .flex {
        flex-direction: column;
        align-items: center;
    }
}
</style>