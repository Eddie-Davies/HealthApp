<template>
    <div v-if="errorMessage" class="alert alert-error shadow-lg my-2 mx-2 p-4">
      <div class="flex flex-wrap items-center justify-between w-full">
        <span class="text-left break-words max-w-full">
          {{ errorMessage }}
        </span>
        <button class="btn btn-sm ml-4 mt-2 sm:mt-0" @click="clearError">
          Dismiss
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  export const globalErrorMessage = ref('');
  
  export default {
    setup() {
      const clearError = () => {
        globalErrorMessage.value = '';
      };
  
      return { errorMessage: globalErrorMessage, clearError };
    }
  };
  </script>
  
  