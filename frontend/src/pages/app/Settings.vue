<template>
    <div class="flex flex-col items-center">
      <div class=" bg-base-100 w-full max-w-2xl">
        <PageHeader :title="$route.meta.title" />
        <div class="px-4 py-3 mt-20">
          <div class="bg-base-100 rounded-box shadow">
            <div class="join join-vertical bg-base-100">
              <div class="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" checked="checked" />
                <div class="collapse-title font-semibold">
                  <i class="fas fa-user text-primary w-6"></i>
                  Change Username
                </div>
                <div class="collapse-content text-sm">
                  Click the "Sign Up" button in the top right corner and follow the registration process.
                </div>
              </div>
  
              <div class="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" />
                <div class="collapse-title font-semibold">
                  <i class="fas fa-envelope text-primary w-6"></i>
                  Change Email
                </div>
                <div class="collapse-content text-sm">
                  Click on "Forgot Password" on the login page and follow the instructions sent to your email.
                </div>
              </div>
  
              <div class="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" />
                <div class="collapse-title font-semibold">
                  <i class="fas fa-key text-primary w-6"></i>
                  Change Password
                </div>
                <div class="collapse-content text-sm">
                  Go to "My Account" settings and select "Edit Profile" to make changes.
                </div>
              </div>
  
              <div class="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" />
                <div class="collapse-title font-semibold">
                  <i class="fas fa-lock text-primary w-6"></i>
                  Privacy & Security
                </div>
                <div class="collapse-content text-sm">
                  Go to "My Account" settings and select "Edit Profile" to make changes.
                </div>
              </div>
  
              <div class="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" />
                <div class="collapse-title font-semibold">
                  <i class="fas fa-headphones text-primary w-6"></i>
                  Help and Support
                </div>
                <div class="collapse-content text-sm">
                  Go to "My Account" settings and select "Edit Profile" to make changes.
                </div>
              </div>
  
              <div class="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" />
                <div class="collapse-title font-semibold">
                  <i class="fas fa-medal text-primary w-6"></i>
                  Credits
                </div>
                <div class="collapse-content text-sm">
                  Go to "My Account" settings and select "Edit Profile" to make changes.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center p-4">
              <router-link to="/delete">
                <button class="btn btn-error btn-outline">
                  <i class="fas fa-user text-primary w-6 mr-2"></i>
                  Delete Account
                </button>
              </router-link>
            </div>
    </div>
  </template>
  
  
  <script>
  import PageHeader from '../../components/header/PageHeader.vue';
  
  export default {
    name: 'Settings',
    components: {
      PageHeader,
    }
  }
  </script>