<template>
    <div class="flex justify-end p-3">
        <button @click="toggleDropdown()" class="cursor-pointer z-50 avatar avatar-placeholder">
            <div class="bg-base-200 text-neutral-content w-12 rounded-full">
                <span class="text-1xl font-bold text-secondary">{{ initials }}</span>
            </div>
        </button>
    </div>
    <AvatarDropdown v-if="dropdownOpen" @close="dropdownOpen=false"/>
</template>
  
<script>
import AvatarDropdown from './AvatarDropdown.vue';

export default {
    name: 'Avatar',
    data() {
    return {
      dropdownOpen: false,
        }
    },
    methods: {
        toggleDropdown(){
            return this.dropdownOpen = !this.dropdownOpen
        }
    },
    components: {
        AvatarDropdown
    },
    props: {
        initials: {
            type: String,
            default: 'Me'
            }
  }
}
</script>
  
