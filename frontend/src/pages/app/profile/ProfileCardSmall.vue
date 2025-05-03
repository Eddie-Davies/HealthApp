<template>
                    <div class="card bg-base-200 rounded-xl lg:rounded-3xl border-2 border-secondary text-center size-39 lg:size-84">
                    <p id="title" class="relative top-5 pb-5 self-center text-xl font-semibold lg:mt-10">Calorie Intake
                    </p>

                    <div class="flex flex-col items-center justify-center my-6 mt-2 lg:mt-12 ">
                        <div class="text-xl font-bold text-primary lg:text-5xl">
                            2300
                        </div>
                        <div class="text-neutral/60 lg:text-2xl">
                            kcal
                        </div>
                    </div>
                    <p id="subtitle"
                        class="absolute bottom-0 right-0 p-2 text-sm text-base-content/60 lg:text-lg lg:p-5">
                        (last 24hrs)
                    </p>
                </div>
</template>

<script>
export default {
    name: 'ProfileCardSmall',
}
</script>