<template>
  <div class="profile-page flex flex-col items-center min-h-screen py-8">
    <div class="profile-info bg-white shadow-lg shadow-cyan-400 rounded-lg p-6 w-[90%] lg:w-1/2 space-y-6">
      <h1 class="text-3xl font-semibold text-gray-800">User Profile</h1>
        <div class="data space-y-5 lg:text-xl sm:text-md">
          <div class="flex gap-3"> 
            <h1 class="font-semibold">Name:</h1>
            <p class="capitalize">{{ user.name }}</p>
          </div>
          <div class="flex gap-3"> 
            <h1 class="font-semibold">Email:</h1>
            <p>{{ user.email }}</p>
          </div>
          <div class="flex gap-3">
            <h1 class="font-semibold">Email Verification Status:</h1>
            <p :class="{ 'text-red-500': !user.isVerified, 'text-cyan-500': user.isVerified }">
              {{ user.isVerified ? 'Verified' : 'Not Verified' }}
            </p>
          </div>
          <div v-if="!user.isVerified" class="flex gap-3">
            <button @click="requestVerification" class="bg-cyan-800 text-white py-2 px-4 rounded-lg hover:bg-cyan-900 transition duration-300">
              Verify Email
            </button>
          </div>
        </div>
      <button @click="logout" class="w-full bg-cyan-800 text-white py-2 rounded-lg hover:bg-cyan-900 transition duration-300">
        Logout
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useUserStore } from '../assets/state/userStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const user = ref({
  name: '',
  email: '',
  isVerified: false
});

const fetchUser = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/users/${userStore.id}`);
    user.value = response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

const requestVerification = async () => {
  try {
    await axios.post(`http://localhost:3000/api/verify/resend/`,{email:userStore.email});
    router.push('/user/verification');
  } catch (error) {
    console.error('Error sending verification request:', error);
  }
};

const logout = async () => {
  try {
    userStore.clearUser();
    router.push('/');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

onMounted(() => {
  fetchUser();
});
</script>

<style scoped>
.profile-page {
  gap: 2rem;
}

.profile-info {
  gap: 1.5rem;
}

.profile-info .flex {
  align-items: center;
}

.profile-info .font-semibold {
  color: #4b5563; /* Gray 700 */
}

.profile-info .text-gray-600 {
  color: #6b7280; /* Gray 600 */
}

button {
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  transform: scale(1.02);
}
</style>
