<template>
  <h1 class="flex text-4xl mt-15 justify-center font-regular">My Goals</h1>
  <div class="mt-20 px-5">
    <div class="flex flex-wrap justify-center gap-8">
      <div class="card bg-base-300 rounded-box p-4 size-36 flex flex-col justify-between shrink-0 text-xs">
        <!-- Top: Eaten + Remaining -->
        <div class="flex justify-between w-full">
          <div>
            <p class="text-success text-[10px]">Eaten</p>
            <h1 class="text-base font-semibold text-neutral/80 leading-none mt-0.5">1200</h1>
            <p class="text-[10px] text-neutral-400 leading-none mt-0.5">kcal</p>

            <p class="text-success text-[10px] mt-3">Remaining</p>
            <h1 class="text-base font-semibold text-neutral/80 leading-none mt-0.5">1300</h1>
            <p class="text-[10px] text-neutral-400 leading-none mt-0.5">kcal</p>
          </div>

          <!-- Vertical Progress Bar -->
          <div class="flex flex-col items-center justify-end">
            <p class="text-[10px] mb-1 text-neutral-400">2500</p>
            <div class="w-2 h-16 bg-neutral-200 rounded-full overflow-hidden relative">
              <div
                class="absolute bottom-0 w-full bg-gradient-to-t from-green-700 via-green-400 to-green-200 h-[48%] rounded-full">
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom: Date & Icon -->
        <div class="flex justify-between items-center text-[8px] text-neutral-400 w-full">
          <p>18/05/2028</p>
          <span>icon</span>
        </div>
      </div>



      <div class="card bg-base-300 rounded-box p-4 size-36 flex flex-col justify-between shrink-0 text-xs">
        <!-- Top: Eaten + Remaining -->
        <div class="flex justify-between w-full">
          <div>
            <p class="text-success text-[10px]">Eaten</p>
            <h1 class="text-base font-semibold text-neutral/80 leading-none mt-0.5">1200</h1>
            <p class="text-[10px] text-neutral-400 leading-none mt-0.5">kcal</p>

            <p class="text-success text-[10px] mt-3">Remaining</p>
            <h1 class="text-base font-semibold text-neutral/80 leading-none mt-0.5">1300</h1>
            <p class="text-[10px] text-neutral-400 leading-none mt-0.5">kcal</p>
          </div>

          <!-- Vertical Progress Bar -->
          <div class="flex flex-col items-center justify-end">
            <p class="text-[10px] mb-1 text-neutral-400">2500</p>
            <div class="w-2 h-16 bg-neutral-200 rounded-full overflow-hidden relative">
              <div
                class="absolute bottom-0 w-full bg-gradient-to-t from-green-700 via-green-400 to-green-200 h-[48%] rounded-full">
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom: Date & Icon -->
        <div class="flex justify-between items-center text-[8px] text-neutral-400 w-full">
          <p>18/05/2028</p>
          <span>icon</span>
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