<template>
  <div class="h-[100vh] flex items-center justify-center">
    <div class="bg-white p-10 rounded-lg shadow-md shadow-cyan-400 lg:w-full lg:max-w-md">
      <h2 class="text-3xl font-bold text-center mb-6">Register for Aktiv</h2>
      <form @submit.prevent="registerUser" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium ">Name</label>
          <input v-model="name" type="text" id="name" name="name" required
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-400 focus:border-cyan-400">
        </div>
        <div>
          <label for="email" class="block text-sm font-medium ">Email</label>
          <input v-model="email" type="email" id="email" name="email" required
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-400 focus:border-cyan-400">
        </div>
        <div>
          <label for="password" class="block text-sm font-medium ">Password</label>
          <input v-model="password" type="password" id="password" name="password" required
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-400 focus:border-cyan-400">
        </div>
        <div>
          <label for="confirmPassword" class="block text-sm font-mediumcyan">Confirm Password</label>
          <input v-model="confirmPassword" type="password" id="confirmPassword" name="confirmPassword" required
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-400 focus:border-cyan-400">
        </div>
        <div v-if="errorMessage" class="text-red-700">{{ errorMessage }}</div>
        <button type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-800 hover:bg-cyan-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
          Register
        </button>
      </form>
      <p class="mt-6 text-center text-sm text-gray-600">
        Already have an account?
        <RouterLink to="/user/login" class="font-medium text-cyan-600 hover:text-cyan-500">
          Login
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/assets/state/userStore';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');

const router = useRouter();
const useStore = useUserStore(); // Create an instance of the user store

const registerUser = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match!";
    return;
  }

  try {
    const response = await axios.post('http://localhost:3000/api/users/register', {
      name: name.value,
      email: email.value,
      password: password.value
    });

    const { user } = response.data;
    // console.log(user);

    let User = {};
    if (user) {
      User = {
      id: user.id,
      email: user.email,
      name:user.name
    };

    useStore.setUser(User); 

    if (user) { 
        router.push('/user/verification');
      }
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Failed to register';
  }
};

onMounted(()=>{
  if(useStore.id){
    router.push('/');
  }
  else{
    router.push('/user/register');
  }
})
</script>

<style scoped>
</style>
