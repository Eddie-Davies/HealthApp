<template>
  <div class="min-h-screen bg-white text-neutral">
    <!-- "Navbar" -->
    <div class="navbar bg-white text-black">
      <div class="flex-1 px-2 text-lg font-bold">Blossom</div>
      <div class="flex-none">
        <button @click="$router.push('/login')" class="btn btn-outline btn-black">Login</button>
      </div>
    </div>

    <!-- Statement -->
    <div class="hero min-h-[50vh] bg-white text-center">
      <div class="hero-content flex flex-col">
        <h1 class="text-4xl font-bold text-black">Blossom with Strength, Thrive in Health</h1>
        <p class="py-4">Set fitness goals, track meals, and manage exercise routines in one place.</p>
        <button class="btn bg-[#0e7afe] text-white mt-2 border-0">Get Started</button>
      </div>
    </div>

    <!-- Features (Can change to another component if want to) -->
    <div class="carousel w-full py-4 bg-white text-neutral">
      <div id="slide1" class="carousel-item w-full flex flex-col items-center">
        <div class="card w-80 bg-white shadow-md p-6">
          <h2 class="text-xl font-semibold text-neutral">Exercise Tracking</h2>
          <p>Log workouts, set goals, and monitor progress easily.</p>
        </div>
        <a href="#slide2" class="btn btn-circle mt-4 bg-[#0e7afe] text-white border-0">❯</a>
      </div>
      <div id="slide2" class="carousel-item w-full flex flex-col items-center">
        <div class="card w-80 bg-white shadow-md p-6">
          <h2 class="text-xl font-semibold text-neutral">Food Logging</h2>
          <p>Keep track of calories and meals to stay on top of nutrition.</p>
        </div>
        <a href="#slide3" class="btn btn-circle mt-4 bg-[#0e7afe] text-white border-0">❯</a>
      </div>
      <div id="slide3" class="carousel-item w-full flex flex-col items-center">
        <div class="card w-80 bg-white shadow-md p-6">
          <h2 class="text-xl font-semibold text-neutral">Group Management</h2>
          <p>Create and join groups to work out with friends and family.</p>
        </div>
        <a href="#slide1" class="btn btn-circle mt-4 bg-[#0e7afe] text-white border-0">❯</a>
      </div>
    </div>

    <!-- Sign up (bottom of page) -->
    <div class="text-center py-4">
      <h2 class="text-2xl font-bold text-neutral">Join Now and Stay Fit!</h2>
      <button @click="$router.push('/signup')" class="btn bg-[#0e7afe] text-white mt-2 border-0">Sign Up</button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>