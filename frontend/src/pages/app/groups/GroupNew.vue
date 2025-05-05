<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="$emit('close')">
      <div class="bg-base-200 rounded-2xl shadow-xl p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold mb-4">Create New Group</h3>
  
        <label class="block mb-2 text-sm">Group Name</label>
        <input v-model="name" type="text" class="input input-bordered w-full mb-4" placeholder="Enter group name" />
  
        <label class="block mb-2 text-sm">Members (comma-separated)</label>
        <input v-model="members" type="text" class="input input-bordered w-full mb-4" placeholder="e.g. John, Sarah, Mike" />
        
        <div class="flex justify-center mb-4" >
          <button class="btn btn-sm" @click="$emit('close')">Add Member</button>
        </div>
  
  
        <div class="flex justify-end gap-2">
          <button class="btn btn-sm" @click="$emit('close')">Cancel</button>
          <button class="btn btn-sm btn-primary" @click="createGroup">Create</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NewGroupModal',
    data() {
      return {
        name: '',
        members: '',
        goal: ''
      };
    },
    methods: {
      createGroup() {
        if (!this.name || !this.members) return;
        const newGroup = {
          name: this.name.trim(),
          members: this.members.split(',').map(m => m.trim()),
          goal: this.goal.trim() || undefined
        };
        this.$emit('create', newGroup);
      }
    }
  };
  </script>
  