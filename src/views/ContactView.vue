<template>
  <div class="contact-page flex flex-col items-center">
    <p class="text-lg mb-10 mx-5 text-center">
      We'd love to hear from you! Reach out to us with any questions or feedback.
    </p>

    <div class="mb-5 contact-container flex flex-col-reverse lg:flex-row w-[75%] lg:w-3/4 justify-around items-start gap-10">
      <!-- Contact Form -->
      <form @submit.prevent="submitForm" class="contact-form bg-slate-50 shadow-lg shadow-cyan-400 rounded-lg p-6 lg:w-1/2 space-y-4">
        <h2 class="text-2xl font-semibold mb-4">Send Us a Message</h2>
        <input v-model="form.name" type="text" placeholder="Your Name" class="w-full p-2 border border-zinc-300 rounded" required>
        <input v-model="form.email" type="email" placeholder="Your Email" class="w-full p-2 border border-zinc-300 rounded" required>
        <textarea v-model="form.message" placeholder="Your Message" class="w-full p-2 border border-zinc-300 rounded h-32" required></textarea>
        <button type="submit" class="w-full bg-cyan-800 text-white py-2 rounded hover:bg-cyan-950 transition">
          Submit
        </button>
        <p v-if="responseMessage" class=" mt-2">{{ responseMessage }}</p>
      </form>

      <!-- Contact Information -->
      <div class="contact-info bg-white shadow-lg shadow-cyan-400 rounded-lg p-6 w-full lg:w-1/3 space-y-4">
        <h2 class="text-2xl font-semibold mb-4">Get in Touch</h2>
        <div class="flex items-center">
          <font-awesome-icon icon="phone" class="text-cyan-900 mr-3"></font-awesome-icon>
          <span>03390252521 <span class="font-bold">(Whatsapp)</span></span>
        </div>
        <div class="flex items-center">
          <font-awesome-icon icon="envelope" class="text-cyan-900 mr-3"></font-awesome-icon>
          <span>aktiv.store.fits@gmail.com</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

const form = ref({
  name: '',
  email: '',
  message: '',
});

const responseMessage = ref('');

const submitForm = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/contact', {
      name: form.value.name,
      email: form.value.email,
      message: form.value.message,
    });

    if (response.status === 200) {
      responseMessage.value = 'Message sent successfully!';
      form.value.name = '';
      form.value.email = '';
      form.value.message = '';
    } else {
      responseMessage.value = 'Failed to send message.';
    }
  } catch (error) {
    console.error('Error:', error);
    responseMessage.value = 'Failed to send message.';
  }
};
</script>

<style scoped>

.contact-container {
  gap: 2rem;
}
.contact-form input,
.contact-form textarea {
  border-radius: 0.375rem;
  border-width: 1px;
}
.contact-form input:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: #22d3ee;
}
.contact-info .map iframe {
  border: none;
}
</style>
