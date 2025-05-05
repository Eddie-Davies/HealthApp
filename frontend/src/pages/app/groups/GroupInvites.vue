<template>
    <div class="mt-12 w-full max-w-md px-4 mx-auto">
      <h2 class="text-xl font-semibold mb-4 text-center">Group Invites</h2>
  
      <div v-if="invites.length > 0" class="space-y-4">
        <div
          v-for="invite in invites"
          :key="invite._id"
          class="card bg-base-200 p-4 rounded-xl shadow flex flex-col gap-3"
        >
          <div class="text-center">
            <h3 class="font-semibold text-lg">{{ invite.name }}</h3>
            <p class="text-sm text-neutral-500">
              {{ invite.membersByID.length }} member(s)
            </p>
          </div>
          <div class="flex justify-center gap-4">
            <button class="btn btn-success btn-sm w-24" @click="logAccept(invite._id)">
              Accept
            </button>
            <button class="btn btn-error btn-sm w-24" @click="logDeny(invite._id)">
              Deny
            </button>
          </div>
        </div>
      </div>
  
      <div v-else class="text-center text-neutral-400 text-sm mt-4">
        You have no pending invites.
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GroupInvites',
    props: {
      invites: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      logAccept(groupId) {
        console.log(`✅ Accept clicked for group ID: ${groupId}`);
      },
      logDeny(groupId) {
        console.log(`❌ Deny clicked for group ID: ${groupId}`);
      }
    }
  };
  </script>
  