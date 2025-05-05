<template>
    <div class="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50" @click.self="$emit('go-back')">
      <div class="bg-base-200 p-6 rounded-xl w-80">
        <h2 class="text-lg font-semibold mb-4 text-center">{{ groupName }}</h2>
        <div class="flex flex-col items-center">
          <h3 class="text-md font-medium mb-2">Members</h3>
          <div class="members-list mb-4">
            <p class="member-item">
              {{ members.join(', ') }}
            </p>
          </div>
          <button class="btn btn-primary mb-2" @click="addMember">Add Member</button>
          <button class="btn btn-ghost" @click="$emit('go-back')">Go Back</button>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    name: 'MemberManagement',
    props: {
      groupName: {
        type: String,
        required: true
      },
      members: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      addMember() {
        console.log("Add Member clicked");
        // TODO
      }
    }
  }
  </script>
  
 