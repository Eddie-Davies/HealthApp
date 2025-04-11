<template>
    <div
      class="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
      @click.self="$emit('cancel')"
    >
      <div class="bg-base-200 p-6 rounded-xl w-80">
        <h2 class="text-lg font-semibold mb-4 text-center">Edit Goal</h2>
  
        <label class="block text-sm mb-2">Target</label>
        <input v-model.number="editableGoal.target" :placeholder="goal.target" type="number" class="input input-bordered w-full mb-2" />
  
        <label class="block text-sm mb-2">Progress</label>
        <input v-model.number="editableGoal.progress" :placeholder="goal.progress" type="number" class="input input-bordered w-full mb-2" />
  
        <label class="block text-sm mb-2">Unit</label>
        <input required v-model="editableGoal.unit" :placeholder="goal.unit" type="text" class="input input-bordered w-full mb-2" />
  
        <div class="flex justify-between mt-4">
          <button class="btn btn-error" @click="$emit('delete', editableGoal)">Delete</button>
          <div class="space-x-2">
            <button class="btn btn-ghost" @click="$emit('cancel')">Cancel</button>
            <button :disabled="!isFormValid" class="btn btn-success" @click="$emit('save', editableGoal)">Save</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GoalEdit',
    props: {
      goal: Object
    },
    
    data() {
      return {
        editableGoal: { ...this.goal } // clone to allow canceling
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
