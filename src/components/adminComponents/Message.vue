<template>
  <div class="admin-home flex flex-col items-center min-h-screen py-8">
    <div class="messages-section shadow-lg shadow-cyan-400 rounded-lg p-6 w-[90%] lg:w-2/3 space-y-6">
      <h1 class="text-2xl font-semibold text-gray-700">Inbox</h1>
      <div v-if="messages.length === 0" class="text-center text-gray-500">
        No messages found.
      </div>
      <div v-else class="messages space-y-4">
        <div v-for="msg in visibleMessages" :key="msg._id" class="message bg-gray-100 rounded-lg p-4 shadow-md flex justify-between items-center">
          <div>
            <h3 class="text-xl font-semibold text-gray-800">{{ msg.name }}</h3>
            <p class="text-sm text-gray-600"><strong>Email:</strong> {{ msg.email }}</p>
            <p class="text-gray-700 mt-2">{{ msg.message }}</p>
          </div>
          <button @click="removeMessage(msg._id)" class="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition">Delete</button>
        </div>
        <div v-if="messages.length > 5" class="text-center mt-4">
          <button @click="toggleShowMore" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
            {{ showMore ? 'Hide' : 'Show More' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const messages = ref([]);
const showMore = ref(false);

const fetchMessages = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/messages');
    messages.value = response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};

const removeMessage = async (id) => {
  try {
    await axios.post('http://localhost:3000/api/messages/remove', { id });
    messages.value = messages.value.filter(msg => msg._id !== id);
  } catch (error) {
    console.error('Error deleting message:', error);
  }
};

const visibleMessages = computed(() => {
  return showMore.value ? messages.value : messages.value.slice(0, 5);
});

const toggleShowMore = () => {
  showMore.value = !showMore.value;
};

onMounted(() => {
  fetchMessages();
});
</script>

<style scoped>
.messages-section {
  background-color: #ffffff; /* Tailwind White */
}

.message {
  background-color: #f3f4f6; /* Tailwind Gray 200 */
}

.message h3 {
  color: #1f2937; /* Tailwind Gray 800 */
}

.message p {
  color: #4b5563; /* Tailwind Gray 600 */
}

button {
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  transform: scale(1.02);
}
</style>
