<template>
    <div class="flex flex-col items-center min-h-screen">
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
                <div class="collapse-title font-semibold flex items-center gap-2">
                    <i class="fas fa-headphones text-primary w-6"></i>
                    FAQ
                </div>
                <div class="collapse-content text-sm space-y-4">

                    <div class="border-l-4 border-secondary pl-4">
                    <p class="font-bold text-lg text-secondary">Q. Is my health data private?</p>
                    <p class="text-neutral">A. Absolutely. We use end-to-end encryption and follow GDPR guidelines to ensure your data is stored securely and is never shared without your consent.</p>
                    </div>

                    <div class="border-l-4 border-secondary pl-4">
                    <p class="font-bold text-lg text-secondary">Q. Can I set goals for weight loss or muscle gain?</p>
                    <p class="text-neutral">A. Yes. Head to the Goals section in your profile to set personalized targets for weight, calorie intake, and workout frequency.</p>
                    </div>

                    <div class="border-l-4 border-secondary pl-4">
                    <p class="font-bold text-lg text-secondary">Q. Do I need an internet connection to use the app?</p>
                    <p class="text-neutral">A. Some features like workout tracking and goal setting are available offline, but syncing data and connecting with a group may require a connection.</p>
                    </div>
                </div>
                </div>

  
              <div class="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" />
                <div class="collapse-title font-semibold">
                  <i class="fas fa-medal text-primary w-6"></i>
                  Credits
                </div>
                <div class="collapse-content text-sm">
                <p class="font-semibold mb-2">Lead Programmers</p>
                <div class="space-y-2 mt-2">
                <div class="flex justify-between border-b border-base-300 pb-1">
                    <span>Aidan</span>
                    <span class="text-right">Full Stack</span>
                </div>
                <div class="flex justify-between border-b border-base-300 pb-1">
                    <span>Eddie</span>
                    <span class="text-right">Backend Lead</span>
                </div>
                <div class="flex justify-between border-b border-base-300 pb-1">
                    <span>Will</span>
                    <span class="text-right">Frontend Lead</span>
                </div>
                <div class="flex justify-between border-b border-base-300 pb-1">
                    <span>Mason</span>
                    <span class="text-right">Frontend Intern</span>
                </div>
                <div class="flex justify-between">
                    <span>Emil</span>
                    <span class="text-right">The Goat</span>
                </div>
                </div>
                </div>
              </div>
              <div class="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" />
                <div class="collapse-title font-semibold">
                  <i class="fas fa-lock text-primary w-6"></i>
                  Privacy & Security
                </div>
                <div class="collapse-content text-sm">
                    At Blossom Health, the protection of your personal and health-related information is of paramount importance. We process all user data in accordance with applicable data protection and privacy legislation, including, where applicable, the General Data Protection Regulation (EU) 2016/679 (“GDPR”), the UK Data Protection Act 2018, and other relevant legal frameworks.
                    All data collected through the Blossom Health application is securely stored using industry-standard encryption both at rest and in transit. Access to personal data is strictly limited to authorized personnel, and all processing activities are governed by strict confidentiality and security obligations.
                    Blossom Health does not disclose, sell, or share your personal data with third parties without your explicit and informed consent, unless required to do so by law or under a valid legal basis. Users retain the right to access, rectify, erase, or restrict the processing of their personal data, and may withdraw consent at any time, subject to legal limitations.
                    We implement robust technical and organizational measures to safeguard against unauthorized access, unlawful processing, and accidental loss or destruction of data. By using Blossom Health, you acknowledge and accept the data practices described in our Privacy Policy and Terms of Service.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <router-link to="/delete">
        <button class="btn btn-error btn-outline group ">
            <i class="fas fa-user w-6 mr-2 text-inherit group-hover:text-error"></i>
            Delete Account
        </button>
    </router-link>
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