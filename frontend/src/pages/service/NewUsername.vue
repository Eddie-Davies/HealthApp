<template>
    <div class="flex flex-start bg-base-200 text-neutral">
        <!-- Navbar -->
        <div class="navbar hero bg-base-200 text-primary">
            <div class="flex-1 px-2 text-lg font-bold">
                <a @click="$router.push('/')" class="link link-hover">Blossom</a>
            </div>
        </div>
    </div>

    <div class="hero bg-base-200 min-h-screen flex items-center justify-center">
        <div class="hero-content flex flex-col items-center w-full max-w-[90%] md:max-w-lg">
            <div class="text-center">
                <h1 class="text-5xl font-bold">Set New Username</h1>
            </div>

            <div class="card bg-base-100 w-full max-w-sm sm:w-[90%] md:w-full shadow-2xl mt-10">
                <div class="card-body">
                    <form @submit.prevent="handleSubmit">
                        <fieldset class="fieldset">
                            <label class="fieldset-label">Email</label>
                            <label class="input w-full">
                                <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none"
                                        stroke="currentColor">
                                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                    </g>
                                </svg>
                                <input type="email" v-model="email" placeholder="mail@site.com" required
                                    class="w-full" />
                            </label>

                            <label class="fieldset-label">New Username</label>
                            <label class="input w-full">
                                <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0H4.5z" />
                                </svg>
                                <input type="text" v-model="newUsername" required placeholder="New Username"
                                    class="w-full" />
                            </label>


                            <label class="fieldset-label">Code</label>
                            <label class="input w-full">
                                <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>
                                <input type="text" v-model="code" required placeholder="Enter verification code"
                                    class="w-full" />
                            </label>

                            <button class="btn btn-neutral mt-4 w-full">Set Username</button>
                        </fieldset>
                    </form>
                </div>
            </div>

            <div v-if="errorMessage" role="alert" class="alert alert-warning mt-12">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{{ errorMessage }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'NewUsername',
    data() {
        return {
            email: '',
            newUsername: '',
            code: '',
            errorMessage: ''
        };
    },
    methods: {
        async handleSubmit() {
            try {
                const response = await axios.post('/newUsername', {
                    email: this.email,
                    newUsername: this.newUsername,
                    code: this.code
                });

                if (response.data) {
                    this.$router.push('/login');
                } else {
                    this.errorMessage = "Unexpected response format.";
                }
            } catch (error) {
                if (error.response?.status === 401) {
                    this.errorMessage = "Invalid email or code.";
                } else if (error.response?.status === 500) {
                    this.errorMessage = "Server error. Please try again later.";
                } else {
                    this.errorMessage = error.response?.data?.message || "Something went wrong.";
                }
                console.error('Error in handleSubmit():', error.response?.data || error.message);
            }
        }
    }
};
</script>
