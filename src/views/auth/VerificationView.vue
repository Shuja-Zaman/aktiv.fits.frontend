<template>
    <div class="h-[70vh] flex items-center justify-center">
      <div class=" p-8 rounded-lg shadow-md shadow-cyan-400 max-w-md w-[75%] text-center">
        <h2 class="text-2xl font-bold mb-4 text-gray-800">Verification Email Sent</h2>
        <p class=" mb-6">
          A verification email has been sent to your inbox. Please check your email to verify your account.
        </p>
        <button
          @click="verifyUser"
          class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-4"
        >
          Already Verified
        </button>
        <button
          @click="resendVerificationEmail"
          class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Resend Verification Email
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import { useUserStore } from '@/assets/state/userStore'; // Import the user store

  const router = useRouter();
  const userStore = useUserStore(); // Create an instance of the user store
  
  const verifyUser = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/verify/isVerified', { email: userStore.email });
      alert(response.data.message);
      router.push('/user/login');
    } catch (error) {
      alert(error.response.data.message || 'An error occurred');
    }
  };
  
  const resendVerificationEmail = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/verify/resend', { email: userStore.email });
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message || 'An error occurred');
    }
  };

  </script>
  
  <style scoped>
  /* Add custom styles here if needed */
  </style>
  