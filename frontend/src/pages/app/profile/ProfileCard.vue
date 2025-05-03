<template>
    <div class="border-2 border-secondary card bg-base-200 rounded-xl lg:rounded-3xl h-60 w-84 lg:h-84 lg:w-174">
                <div class="text-center">
                    <p class="font-semibold text-xl mt-10">Current Weight<span class="text-neutral/60 ml-2">(kg)</span>
                    </p>
                    <h1 class="mt-6 font-bold text-5xl text-primary lg:text-7xl lg:mt-15">75.4</h1>
                </div>
                <div class="absolute bottom-0 w-full flex justify-evenly items-center mb-3 p-2">
                    <button class="btn btn-secondary lg:h-15 w-1/3"><i class="fa-solid fa-minus"></i></button>

                    <select class="select select-ghost font-bold text-base-content/69 text-center w-1/4">
                        <option value="0.1">0.1</option>
                        <option value="0.5">0.5</option>
                        <option value="1">1</option>
                    </select>

                    <button class="btn btn-secondary w-1/3 lg:h-15 "><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
</template>

<script>
export default {
    name: 'TrackerIncrement',
    data() {
        return {
            
        }
    }
}
</script>