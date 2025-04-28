<template>
    <div class="fixed inset-0 bg-black/90 z-[1000] flex items-center justify-center" @click.self="$emit('cancel')">
        <div class="bg-base-200 rounded-xl p-6 w-[90%] max-w-sm">
            <div class="flex justify-center items-center text-xl text-warning font-semibold mb-4">
                <i class="fa-solid fa-triangle-exclamation mr-2"></i>
                <span>Group Goal Deletion</span>
            </div>

            <p class="text-sm text-center text-base-content/80 mb-6">
                Deleting this goal will only remove it for you. Other group members will still see it in their list.
            </p>
            <div class="flex justify-center gap-3">
                <button class="btn btn-ghost" @click="$emit('cancel')">Cancel</button>
                <button class="btn btn-error" @click="$emit('confirm')">Delete Anyway</button>
            </div>
        </div>
    </div>
</template>