<template>
  <div id="app" class=" relative text-md kanit-semibold">
    <!-- Loading Screen -->
    <transition name="slide-up">
      <div v-if="isLoading" class=" loader absolute top-0 left-0 h-screen w-full z-50 flex items-center justify-center bg-cyan-800 text-slate-200">
        <div class="text-container">
          <h1 class="text-6xl lg:text-9xl text-center uppercase " v-if="currentWord === 'Active'">Active</h1>
          <h1 class="text-6xl lg:text-9xl text-center uppercase " v-if="currentWord === 'Fitness'">Fitness</h1>
          <h1 class="text-6xl lg:text-9xl text-center uppercase " v-if="currentWord === 'Motion'">Motion</h1>
        </div>
      </div>
    </transition>

    <!-- Main Content -->
    <transition name="fade">
      <div v-if="!isLoading">
        <Navbar />
        <RouterView />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';

const isLoading = ref(true);
const currentWord = ref('');

onMounted(() => {
  let wordIndex = 0;
  const words = ['Active', 'Fitness', 'Motion'];

  const interval = setInterval(() => {
    currentWord.value = words[wordIndex];
    wordIndex++;
    if (wordIndex === words.length) {
      clearInterval(interval);
      setTimeout(() => {
        isLoading.value = false;
      }, 900); // Wait a little before hiding the loader
    }
  }, 900); // Change word every 0.9 seconds
});
</script>

<style scoped>
/* Loader Styles */
.loader {
  background-color: rgba(0, 128, 128, 0.9); /* Semi-transparent background */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Slide-up Transition */
.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.5s ease;
}
.slide-up-enter, .slide-up-leave-to /* .slide-up-leave-active in <2.1.8 */ {
  transform: translateY(-100vh);
}

/* Fade Transition for Main Content */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>