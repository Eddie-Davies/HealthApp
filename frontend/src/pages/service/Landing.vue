<template>
  <div class="min-h-screen text-neutral">
    <!-- "Navbar" -->
    <div class="navbar bg-base-100 text-base">
      <div class="flex-1 px-2 text-lg font-bold text-primary">Blossom</div>
      <div class="flex-none">
        <router-link to="/login" class="btn btn-outline btn-black">
          Login
        </router-link>
      </div>
    </div>

    <!-- Statement -->
    <div class="hero min-h-[50vh] bg-base-100 text-center">
      <div class="hero-content flex flex-col">
        <h1 class="text-4xl font-bold text-base-content/95"><span class="bg-gradient-to-r from-secondary via-primary to-warning inline-block text-transparent bg-clip-text">Blossom</span> with Strength, Thrive in Health</h1>
        <p class="py-4">Set fitness goals, track meals, and manage exercise routines in one place.</p>
        <router-link to="/signup" class="btn bg-secondary text-secondary-content mt-2 border-0">
          Get Started
        </router-link>
      </div>
    </div>

    <!-- Features (Can change to another component if want to) -->
    <div class="carousel w-full py-4 bg-base-100 text-neutral">
      <div id="slide1" class="carousel-item w-full flex flex-col items-center">
        <div class="card w-80 bg-base-200 shadow-md p-6">
          <h2 class="text-xl font-semibold text-primary">Exercise Tracking</h2>
          <p class="text-base-content/80">Log workouts, set goals, and monitor progress easily.</p>
        </div>
        <a href="#slide2" class="btn btn-circle mt-4 bg-secondary text-secondary-content border-0">❯</a>
      </div>

      <div id="slide2" class="carousel-item w-full flex flex-col items-center">
        <div class="card w-80 bg-base-200 shadow-md p-6">
          <h2 class="text-xl font-semibold text-primary">Food Logging</h2>
          <p class="text-base-content/80">Keep track of calories and meals to stay on top of nutrition.</p>
        </div>
        <a href="#slide3" class="btn btn-circle mt-4 bg-secondary text-secondary-content border-0">❯</a>
      </div>

      <div id="slide3" class="carousel-item w-full flex flex-col items-center">
        <div class="card w-80 bg-base-200 shadow-md p-6">
          <h2 class="text-xl font-semibold text-primary">Group Management</h2>
          <p class="text-base-content/80">Create and join groups to work out with friends and family.</p>
        </div>
        <a href="#slide1" class="btn btn-circle mt-4 bg-secondary text-secondary-content border-0">❯</a>
      </div>
    </div>

    <!-- Sign up (bottom of page) -->
    <div class="text-center py-4 mt-12">
      <h2 class="text-2xl font-bold text-neutral">Let's track!</h2>
      <router-link to="/home" class="btn bg-secondary text-secondary-content mt-7 border-0">
        Go to my Home
      </router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Landing'
}
</script>