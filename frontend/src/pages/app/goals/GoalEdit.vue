<template>
    <div class="fixed inset-0 bg-black/90 flex items-center justify-center z-50" @click.self="$emit('cancel')">
        <div class="bg-base-200 p-6 rounded-xl w-80">
            <h2 class="text-lg font-semibold mb-4 text-center">{{ isNew ? 'Create New Goal' : 'Edit Goal' }}</h2>
            <div class="min-h-65">
            <div v-if="page === 1">
                <!-- Page 1: Main Info -->
                <label class="block text-sm mb-2">Target</label>
                <input v-model.number="editableGoal.target" :placeholder="goal.target" type="number"
                    class="input input-bordered w-full mb-2" />

                <label class="block text-sm mb-2">Progress</label>
                <input v-model.number="editableGoal.progress" :placeholder="goal.progress" type="number"
                    class="input input-bordered w-full mb-2" />

                <label class="block text-sm mb-2">Unit</label>
                <input required v-model="editableGoal.unit" :placeholder="goal.unit" type="text"
                    class="input input-bordered w-full mb-2" />
            </div>
            <div v-else class="pt-15">
                <!-- Page 2: Labels -->
                <label class="block text-sm mb-2">Progress Label</label>
                <input v-model="editableGoal.progressLabel" type="text" placeholder="Progress Label (e.g. Eaten)"
                    class="input input-bordered w-full mb-2" />

                <label class="block text-sm mb-2">Target Label</label>
                <input v-model="editableGoal.remainingLabel" type="text" placeholder="Remaining Label (e.g. Left)"
                    class="input input-bordered w-full mb-2" />
            </div>
        </div>
        <div class="flex justify-center gap-2 my-10">
                <button class="btn btn-md" :class="{ 'btn-outline btn-soft btn-primary': page === 1, 'btn-ghost': page !== 1 }"
                    @click="page = 1">
                    Goal Info
                </button>
                <button class="btn btn-md" :class="{ 'btn-outline btn-soft btn-secondary': page === 2, 'btn-ghost': page !== 2 }"
                    @click="page = 2">
                    Labels
                </button>
            </div>

            <!-- Footer group goal warning (only on edit) -->
            <p v-if="!isNew && goal.group" class="text-sm text-center text-warning mt-4 py-5">
            ⚠️ Changes to this goal won’t update for other group members.
            </p>
            <div class="flex justify-between mt-4">
                <button v-if="!isNew" class="btn btn-error" @click="$emit('delete', editableGoal)">Delete</button>
                <div v-else class="invisible btn btn-error">Placeholder</div>
                <div class="space-x-2">
                    <button class="btn btn-ghost" @click="$emit('cancel')">Cancel</button>
                    <button :disabled="!isFormValid" class="btn btn-success"
                        @click="$emit('save', editableGoal)">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
  <script>
  export default {
    name: 'GoalEdit',
    props: {
      goal: Object,
      isNew: {
        type: Boolean,
        default: false
        }
    },
    
    data() {
      return {
        editableGoal: { ...this.goal }, // clone to allow canceling
        page: 1,
      };
      
    },
    mounted() {
        document.body.style.overflow = 'hidden';
    },
    beforeUnmount() {
        document.body.style.overflow = '';
    },

    computed: {
        isFormValid() {
            // form checks: progress must be lower or same as target; both numbers must be more than zero and integers; 
            const isInt = val => Number.isInteger(val);
            return (
            this.editableGoal.unit.trim() &&
            isInt(this.editableGoal.target) && this.editableGoal.target > 0 &&
            isInt(this.editableGoal.progress) && this.editableGoal.progress >= 0 && 
            this.editableGoal.progress <= this.editableGoal.target
            );
  }
}
    
  };
  </script>
