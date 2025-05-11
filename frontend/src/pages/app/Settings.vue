<template>
  <div class="flex flex-col items-center min-h-screen pb-32">
    <div class="bg-base-100 w-full max-w-2xl">
      <PageHeader :title="$route.meta.title" />
      <div class="px-4 py-3 mt-20">
        <div class="bg-base-100 rounded-box shadow">
          <div class="join join-vertical bg-base-100">
            <!-- Change Username -->
            <div class="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" checked="checked" />
              <div class="collapse-title font-semibold">
                <i class="fas fa-user text-primary w-6"></i>
                Change Username
              </div>
              <div class="collapse-content text-sm">
                <form @submit.prevent="handleUsernameChange" class="space-y-4">
                  <div v-if="usernameSuccess" class="text-success text-sm font-semibold">{{ usernameSuccess }}</div>
                  <div v-if="usernameError" class="text-error text-sm font-semibold">{{ usernameError }}</div>
                  <div class="form-control">
                    <label class="label font-semibold text-neutral-content mb-2 ml-2">Current Username</label>
                    <input v-model="currentUsername" type="text" class="input input-bordered w-full text-white"
                      :placeholder="username || 'Loading...'" required />
                  </div>
                  <div class="form-control">
                    <label class="label font-semibold text-neutral-content mb-2 ml-2">New Username</label>
                    <input v-model="newUsername" type="text" class="input input-bordered w-full" placeholder="JaneDoe"
                      required />
                  </div>
                  <div class="flex justify-center mt-10 mb-5">
                    <button type="submit" class="btn btn-primary">Update Username</button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Change Email -->
            <div class="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" />
              <div class="collapse-title font-semibold">
                <i class="fas fa-envelope text-primary w-6"></i>
                Change Email
              </div>
              <div class="collapse-content text-sm">
                <form @submit.prevent="handleEmailChange" class="space-y-4">
                  <div v-if="emailError" class="text-error text-sm font-semibold">{{ emailError }}</div>
                  <div v-if="emailSuccess" class="text-success text-sm font-semibold">{{ emailSuccess }}</div>
                  <div class="form-control">
                    <label class="label font-semibold text-neutral-content mb-2 ml-2">Current Email</label>
                    <input v-model="currentEmail" type="text" class="input input-bordered w-full text-white"
                      :placeholder="email || 'Loading...'" required />
                  </div>
                  <div class="form-control">
                    <label class="label font-semibold text-neutral-content mb-2 ml-2">New Email</label>
                    <input v-model="newEmail" type="email" class="input input-bordered w-full"
                      placeholder="JaneDoe@example.com" required />
                  </div>
                  <div class="flex justify-center mt-10 mb-5">
                    <button type="submit" class="btn btn-primary">Send Verification Code</button>
                  </div>
                </form>

                <!-- Code verification input -->
                <form @submit.prevent="handleEmailVerification" class="space-y-4 mt-4">
                  <div v-if="codeError" class="text-error text-sm font-semibold">{{ codeError }}</div>
                  <div v-if="codeSuccess" class="text-success text-sm font-semibold">{{ codeSuccess }}</div>
                  <div class="form-control">
                    <label class="label font-semibold text-neutral-content mb-2 ml-2">Verification Code</label>
                    <input v-model="emailVerificationCode" type="text" class="input input-bordered w-full"
                      placeholder="Enter verification code" required />
                  </div>
                  <p class="text-center text-red-500 mb-2 font-bold">
                    You will need to sign back in after this change. You will be logged out.
                  </p>
                  <div class="flex justify-center mt-5 mb-5">
                    <button type="submit" class="btn btn-secondary">Confirm Email Change</button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Change Password -->
            <div class="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" />
              <div class="collapse-title font-semibold">
                <i class="fas fa-key text-primary w-6"></i>
                Change Password
              </div>
              <div class="collapse-content text-sm">
                <div>
                  <a @click="$router.push('/changepassword')" class="link link-hover">Change password?</a>
                </div>
              </div>
            </div>

            <!-- FAQ -->
            <div class="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" />
              <div class="collapse-title font-semibold flex items-center gap-2">
                <i class="fas fa-headphones text-primary w-6"></i>
                FAQ
              </div>
              <div class="collapse-content text-sm space-y-4">
                <div class="border-l-4 border-secondary pl-4">
                  <p class="font-bold text-lg text-secondary">Q. Is my health data private?</p>
                  <p class="text-neutral">A. Absolutely. We use encryption and follow GDPR guidelines to ensure your
                    data is stored securely and is never shared without your consent.</p>
                </div>
                <div class="border-l-4 border-secondary pl-4">
                  <p class="font-bold text-lg text-secondary">Q. Can I set goals for weight loss or muscle gain?</p>
                  <p class="text-neutral">A. Yes. Head to the Goals section in your profile to set personalized targets
                    for weight, calorie intake, and workout frequency.</p>
                </div>
                <div class="border-l-4 border-secondary pl-4">
                  <p class="font-bold text-lg text-secondary">Q. Do I need an internet connection to use the app?</p>
                  <p class="text-neutral">A. Some features like workout tracking and goal setting are available offline,
                    but syncing data and connecting with a group may require a connection.</p>
                </div>
              </div>
            </div>

            <!-- Credits -->
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

            <!-- Privacy -->
            <div class="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" />
              <div class="collapse-title font-semibold">
                <i class="fas fa-lock text-primary w-6"></i>
                Privacy & Security
              </div>
              <div class="collapse-content text-sm">
                At Blossom Health, the protection of your personal and health-related information is of paramount
                importance...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <router-link to="/delete">
      <button class="btn btn-error btn-outline group">
        <i class="fas fa-user w-6 mr-2 text-inherit group-hover:text-error"></i>
        Delete Account
      </button>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios';
import PageHeader from '../../components/header/PageHeader.vue';
import { globalErrorMessage } from '../../components/errorBanner/ErrorBanner.vue';


export default {
  name: 'Settings',
  components: {
    PageHeader,
  },
  data() {
    return {
      username: '',
      email: '',
      currentUsername: '',
      newUsername: '',
      currentEmail: '',
      newEmail: '',
      emailVerificationCode: '',
      usernameError: '',
      emailError: '',
      emailSuccess: '',
      codeError: '',
      codeSuccess: '',
      usernameSuccess: '',
    };
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await axios.get('/user');
        this.username = response.data.username;
        this.email = response.data.email;
        this.currentUsername = response.data.username;
        this.currentEmail = response.data.email;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },

    async handleUsernameChange() {
      this.usernameError = '';
      if (this.newUsername.trim() === this.username) {
        this.usernameError = 'New username is the same as the current username.';
        return;
      }
      if (this.newUsername.length < 4 || this.newUsername.length > 16) {
        this.usernameError = 'Username must be between 4 and 16 characters.';
        return;
      }
      if (!/^[a-zA-Z0-9]+$/.test(this.newUsername)) {
        this.usernameError = 'Username can only contain letters and numbers.';
        return;
      }
      if (this.currentUsername !== this.username) {
        this.usernameError = 'Current username does not match your actual username.';
        return;
      }

      try {
        const response = await axios.post('/user/update-username', {
          newUsername: this.newUsername,
        });
        this.username = this.newUsername;
        this.currentUsername = this.newUsername;
        this.newUsername = '';
        this.usernameSuccess = 'Username successfully updated!';
      } catch (error) {
        this.usernameError = 'Failed to update username.';
        console.error('Error updating username:', error);
        if (error.response?.data?.message) {
          globalErrorMessage.value = error.response.data.message;
        } else {
          globalErrorMessage.value = 'Something went wrong.';
        }
      }

    },

    async handleEmailChange() {
      this.emailError = '';
      this.emailSuccess = '';
      if (this.newEmail.trim() === this.email) {
        this.emailError = 'New email is the same as the current email.';
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.newEmail)) {
        this.emailError = 'Please enter a valid email address.';
        return;
      }
      if (this.currentEmail !== this.email) {
        this.emailError = 'Current email does not match your actual email.';
        return;
      }

      try {
        await axios.post('/user/request-email-verification', {
          newEmail: this.newEmail
        });
        this.emailSuccess = 'A verification code has been sent to your current email. Enter it below to confirm the change.';
      } catch (error) {
        this.emailError = 'Failed to send verification code.';
        console.error('Error sending email verification:', error);
        if (error.response?.data?.message) {
          globalErrorMessage.value = error.response.data.message;
        } else {
          globalErrorMessage.value = 'Something went wrong.';
        }
      }
    },

    async handleEmailVerification() {
      this.codeError = '';
      this.codeSuccess = '';

      if (!this.emailVerificationCode || this.emailVerificationCode.length !== 6) {
        this.codeError = 'Please enter a valid verification code.';
        return;
      }

      try {
        await axios.post('/user/confirm-email-change', {
          code: this.emailVerificationCode,
        });

        this.newEmail = '';
        this.emailVerificationCode = '';
        this.codeSuccess = 'Email successfully updated! redirecting now...';

        setTimeout(() => {
          this.$router.push('/login');
        }, 4000);

      } catch (error) {
        this.codeError = 'Verification code is invalid or expired.';
        console.error('Error confirming email change:', error);
        if (error.response?.data?.message) {
          globalErrorMessage.value = error.response.data.message;
        } else {
          globalErrorMessage.value = 'Something went wrong.';
        }
      }
    }


  },
  mounted() {
    this.fetchUserData();
  },
};
</script>
