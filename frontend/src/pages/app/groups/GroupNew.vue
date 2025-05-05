<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="$emit('close')">
    <div class="bg-base-200 rounded-2xl shadow-xl p-6 w-full max-w-md">
      <h3 class="text-lg font-semibold mb-4">Create New Group</h3>

      <label class="block mb-2 text-sm">Group Name</label>
      <input v-model="name" type="text" class="input input-bordered w-full mb-4" placeholder="Enter group name" />

      <label class="block mb-2 text-sm">Members</label>
      <input v-model="newMember" type="text" class="input input-bordered w-full mb-4" placeholder="e.g. John, Sarah, Mike" />

      <div v-if="showMembers" class="max-h-32 overflow-y-auto mb-4 rounded p-2">
        <ul>
          <li v-for="(member, index) in members" :key="index" class="mb-2">
            <div class="flex justify-between items-center">
              <span>{{ member }}</span>
              <button @click="removeMember(index)" class="text-white hover:text-gray-300">&minus;</button>
            </div>
            <div class="h-px bg-gray-300 mt-1 w-full"></div>
          </li>
        </ul>
      </div>

      <div class="flex justify-center mb-4">
        <button class="btn btn-sm" @click="addMember">Add Member</button>
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
      newMember: '',
      members: [],
      showMembers: false,
      goal: ''
    };
  },
  methods: {
    addMember() {
      if (this.newMember.trim()) {
        this.members.push(this.newMember.trim());
        this.newMember = ''; // Clear input after adding
        this.showMembers = true; // Show the members list
      }
    },
    removeMember(index) {
      this.members.splice(index, 1); // Remove the member from the list
      if (this.members.length === 0) {
        this.showMembers = false; // Hide the members list if empty
      }
    },
    createGroup() {
      if (!this.name || !this.members.length) return;
      const newGroup = {
        name: this.name.trim(),
        members: this.members,
        goal: this.goal.trim() || undefined
      };
      this.$emit('create', newGroup);
    }
  }
};
</script>