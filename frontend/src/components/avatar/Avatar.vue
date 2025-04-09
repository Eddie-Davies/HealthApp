<template>
    <div class="flex justify-end px-3 pt-3">
        <div class="avatar avatar-placeholder">
            <div class="bg-neutral text-neutral-content w-12 rounded-full">
                <span class="text-1xl">{{ initials }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Avatar',
    props: {
        initials: {
            type: String,
            default: 'Me'
            }
  }
}
</script>