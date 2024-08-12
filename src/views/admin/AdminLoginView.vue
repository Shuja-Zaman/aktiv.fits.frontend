<template>
  <div class="h-[80vh] flex items-center justify-center">
    <div class="bg-white p-10 rounded-lg shadow-md shadow-cyan-400 lg:w-full lg:max-w-md">
      <h2 class="text-3xl font-bold text-center mb-6">Login to Aktiv</h2>
      <form @submit.prevent="loginAdmin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium">Email</label>
          <input v-model="email" type="email" id="email" name="email" required
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-400 focus:border-cyan-400">
        </div>
        <div>
          <label for="password" class="block text-sm font-medium">Password</label>
          <input v-model="password" type="password" id="password" name="password" required
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-400 focus:border-cyan-400">
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox"
                   class="h-4 w-4 focus:ring-cyan-500 border-gray-300 rounded">
            <label for="remember-me" class="ml-2 block text-sm "> Remember me </label>
          </div>
        </div>
        <button type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-800 hover:bg-cyan-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
          Sign in
        </button>
      </form>
      <p class="mt-6 text-center text-sm text-gray-600">
        Don't have an account? 
        <RouterLink to="/user/register" class="font-medium text-cyan-600 hover:text-cyan-500">
          Register
        </RouterLink>
      </p>
      <div v-if="errorMessage" class="text-red-700 text-center mt-4">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAdminStore } from '@/assets/state/adminStore';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const adminStore = useAdminStore();

const loginAdmin = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/admin/login', {
      email: email.value,
      password: password.value,
    });

    const { admin } = response.data;

    let Admin = {};
    if (admin) {
      Admin = {
      id: admin.id,
      email: admin.email,
      name:admin.name
    };


    adminStore.setAdmin(Admin);
    router.push('/user/admin');
    
  } 
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Failed to login';
  }
};
</script>

<style scoped>
</style>
