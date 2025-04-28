<template>
    <div class="flex flex-col items-center">
        <button class="btn btn-primary w-16 h-16 rounded-full" @click="$emit('new-goal', this.group)">
            <i class="fa-solid fa-plus text-primary-content text-2xl"></i>
        </button>
        <div class="mt-2 text-base-content/90 ">
            <p v-if="!group">New Goal</p>
            <p v-else >New Group Goal</p>
        </div>

    </div>
</template>




<script>
export default {
    name: 'GoalNew',
    props: {
        group: {
            type: String,
            default: null
        }
    }

}
</script>