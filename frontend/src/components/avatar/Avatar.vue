<template>
    <div v-if="!hideAvatar" class="flex justify-end p-3">
      <div class="avatar avatar-placeholder">
        <div class="bg-neutral text-neutral-content w-12 rounded-full">
          <span class="text-1xl">{{ initials }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import emitter from '/src/eventBus';
  
  export default {
    name: 'Avatar',
    props: {
      initials: {
        type: String,
        default: 'Me'
      }
    },
    data() {
      return {
        hideAvatar: false
      };
    },
    mounted() {
      emitter.on('toggle-navbar', (hide) => {
        // When navbar is hidden, also hide the avatar
        this.hideAvatar = hide;
      });
    },
    beforeUnmount() {
      emitter.off('toggle-navbar');
    }
  }
  </script>