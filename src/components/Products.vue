<template>
  <div class="featured relative">
    <div class="top flex items-center gap-3 mx-10 mt-10 mb-14">
      <div class="h-6 w-6 bg-cyan-800 rounded-full"></div>
      <HoverSlider text="Featured Products"/>
    </div>
    <div>
      <div v-for="(category, index) in categories" :key="index" class="relative hover-wrapper">
        <RouterLink class="bottom hover-down flex justify-between items-center px-10" :to="category.path">
          <span class="px-1 py-7 block text-3xl lg:text-5xl font-bold">
            {{ category.name }}
          </span>
          <p>Aktive-Fits</p>
        </RouterLink>
        <img class="lg:hidden sm:block" :src="category.ima" alt="">
        <hr class="m-0">
      </div>
    </div>
    <div class="m-10">
      <RouterLink to="/shop">
        <HoverSlider text="All-Products"/>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import HoverSlider from '../components/effects/HoverSlider.vue';
import tShirtsImage from '../assets/images/7.png';
import trousersImage from '../assets/images/8.png';
import hoodiesImage from '../assets/images/9.png';
import kitsImage from '../assets/images/10.png';

const categories = [
  { name: 'T-Shirts', path: '/shop', ima: tShirtsImage },
  { name: 'Trousars', path: '/shop', ima: trousersImage },
  { name: 'Hoodies', path: '/shop', ima: hoodiesImage },
  { name: 'Kits', path: '/shop', ima: kitsImage }
];
</script>

<style scoped>
.bottom:hover {
  color: rgb(226, 232, 240);
  transition: all linear .2s;
}

.hover-wrapper:hover .image {
  opacity: 1;
  z-index: 99;
  transition: opacity 0.3s ease-in-out;
}

.hover-down {
  position: relative;
  overflow: hidden;
}

.hover-down::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: -100%;
  background-color: rgb(21, 94, 117);
  z-index: -1;
  transition: top 0.3s ease-in-out;
}

.hover-down:hover::before {
  top: 0;
}

.bottom:hover {
  cursor: pointer;
}

.bottom {
  animation: slide linear;
  animation-timeline: view();
  animation-range: entry cover 40%;
}

@keyframes slide {
  from {
    transform: translateX(-100px);
    opacity: 0;
  }

  to {
    transform: translateX(0px);
    opacity: 1;
  }
}
</style>
