<template>
    <div class="fixed inset-0 bg-black/90 flex items-center justify-center z-50" @click.self="$emit('cancel')">
        <div class="bg-base-200 p-6 rounded-xl w-80 text-center">
            <h2 class="text-lg font-semibold mb-4">Select Goal Type</h2>
            <div class="flex justify-center gap-4">
                <button
                    class="btn btn-neutral btn-soft hover:btn-success border-2 w-20 h-20 flex flex-col items-center justify-center rounded-xl">
                    <i class="fas fa-running"></i>
                    <p>Activity</p>
                </button>
                <button @click="$emit('diet', group, 'diet')"
                    class="btn btn-neutral btn-soft hover:btn-warning w-20 h-20 flex flex-col items-center justify-center rounded-xl">
                    <i class="fa-solid fa-utensils"></i>
                    <p>Diet</p>
                </button>
                <button @click="$emit('custom', group)"
                    class="btn btn-neutral btn-soft w-20 h-20 flex flex-col items-center justify-center rounded-xl">
                    <i class="fa-solid fa-hammer"></i>
                    <p>Custom</p>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    group: {
      type: [String, Object],
      default: null
    }
  },
  // Disable scrolling, and leave room for it to stop page jittering.
  mounted() {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.marginRight = `${scrollBarWidth}px`;
    },
    beforeUnmount() {
        document.documentElement.style.overflow = '';
        document.documentElement.style.marginRight = '';
    },
  
}
</script>
