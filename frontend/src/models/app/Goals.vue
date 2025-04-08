<template>
  <h1 class="flex text-4xl mt-15 justify-center text-center font-regular">My Goals</h1>
  <div class="mt-20 md:px-3">
    <div class="flex flex-wrap justify-center gap-6 md:gap-10">
      <!-- Goals Card -->
      <div class="card bg-base-300 rounded-box p-4 size-38 lg:size-50 flex flex-col justify-between shrink-0 lg:text-lg text-sm">
        <!-- Top: Eaten + Remaining -->
        <div class="flex justify-between w-full">
          <div>
            <p class="text-success ">Eaten</p>
            <h1 class="lg:text-lg text-base font-semibold text-neutral/80 leading-none mt-0.5">1200</h1>
            <p class="text-neutral-400 leading-none mt-0.5 lg:mt-1">kcal</p>

            <p class="text-success  mt-3">Remaining</p>
            <h1 class="lg:text-lg text-base font-semibold text-neutral/80 leading-none mt-0.5">1300</h1>
            <p class=" text-neutral-400 leading-none mt-0.5 lg:mt-1">kcal</p>
          </div>

          <!-- Vertical Progress Bar -->
          <div class="flex flex-col items-center justify-end">
            <p class=" mb-1 text-neutral-400">2500</p>
            <div class="w-4 h-20 bg-neutral-200 rounded-full overflow-hidden relative">
              <div
                class="absolute bottom-0 w-full bg-gradient-to-t from-green-700 via-green-400 to-green-200 h-[48%] rounded-full">
              </div>
            </div>
            <span>0</span>
          </div>
        </div>

        <!-- Bottom: Date -->
        <div class="flex justify-start items-center text-xs text-neutral-400 lg:mt-2 mt-5">
          <p>18/05/2028</p>
        </div>
      </div>
      <!-- Goals Card -->
      <div
        class="card bg-base-300 rounded-box p-4 size-38 lg:size-50 flex flex-col justify-between shrink-0 lg:text-lg text-sm">
        <!-- Top: Eaten + Remaining -->
        <div class="flex justify-between w-full">
          <div>
            <p class="text-success ">Eaten</p>
            <h1 class="lg:text-lg text-base font-semibold text-neutral/80 leading-none mt-0.5">1200</h1>
            <p class="text-neutral-400 leading-none mt-0.5 lg:mt-1">kcal</p>

            <p class="text-success  mt-3">Remaining</p>
            <h1 class="lg:text-lg text-base font-semibold text-neutral/80 leading-none mt-0.5">1300</h1>
            <p class=" text-neutral-400 leading-none mt-0.5 lg:mt-1">kcal</p>
          </div>

          <!-- Vertical Progress Bar -->
          <div class="flex flex-col items-center justify-end">
            <p class=" mb-1 text-neutral-400">2500</p>
            <div class="w-4 h-20 bg-neutral-200 rounded-full overflow-hidden relative">
              <div
                class="absolute bottom-0 w-full bg-gradient-to-t from-green-700 via-green-400 to-green-200 h-[48%] rounded-full">
              </div>
            </div>
            <span>0</span>
          </div>
        </div>

        <!-- Bottom: Date -->
        <div class="flex justify-start items-center text-xs text-neutral-400 lg:mt-2 mt-5">
          <p>18/05/2028</p>
        </div>
      </div>
      <!-- Goals Card -->
      <div
        class="card bg-base-300 rounded-box p-4 size-38 lg:size-50 flex flex-col justify-between shrink-0 lg:text-lg text-sm">
        <!-- Top: Eaten + Remaining -->
        <div class="flex justify-between w-full">
          <div>
            <p class="text-success ">Eaten</p>
            <h1 class="lg:text-lg text-base font-semibold text-neutral/80 leading-none mt-0.5">1200</h1>
            <p class="text-neutral-400 leading-none mt-0.5 lg:mt-1">kcal</p>

            <p class="text-success  mt-3">Remaining</p>
            <h1 class="lg:text-lg text-base font-semibold text-neutral/80 leading-none mt-0.5">1300</h1>
            <p class=" text-neutral-400 leading-none mt-0.5 lg:mt-1">kcal</p>
          </div>

          <!-- Vertical Progress Bar -->
          <div class="flex flex-col items-center justify-end">
            <p class=" mb-1 text-neutral-400">2500</p>
            <div class="w-4 h-20 bg-neutral-200 rounded-full overflow-hidden relative">
              <div
                class="absolute bottom-0 w-full bg-gradient-to-t from-green-700 via-green-400 to-green-200 h-[48%] rounded-full">
              </div>
            </div>
            <span>0</span>
          </div>
        </div>

        <!-- Bottom: Date -->
        <div class="flex justify-start items-center text-xs text-neutral-400 lg:mt-2 mt-5">
          <p>18/05/2028</p>
        </div>
      </div>
    </div>
    
    
    
  </div>
</template>


<script>
export default {
  name: 'Goals'
}
</script>
