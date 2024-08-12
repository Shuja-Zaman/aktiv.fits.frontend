<template>
  <nav class=" w-full lg:p-10 py-10 pr-5 flex items-center justify-between">
    <div class="left">
        <RouterLink to="/" class="">
          <img src="../assets/images/img1.png" class="lg:h-[60px] h-[50px] w-full" alt="">
        </RouterLink>
    </div>
    <div class="right hidden lg:block space-x-2">
        <RouterLink exact-active-class="active" :to="item.path" v-for="item, index in items" :key="index">
            <HoverSlider :text="item.name"/>
        </RouterLink>
    </div>
    
    <div class="dropdown lg:hidden block" @click="isOpen = !isOpen">
      <font-awesome-icon @click="openMenu" class="text-3xl lg:hidden block cursor-pointer" :icon="isMenuOpen ? faXmark: faGripLines" />
      <transition name="slide-fade" appear>
          <div v-if="isMenuOpen" class=" z-50 h-screen bg-transparent items-list dropdown-content absolute flex flex-col left-0 w-full rounded-b-2xl py-5 mt-2 gap-5">
            <RouterLink exact-active-class="active" @click="openMenu" class=" text-5xl font-extrabold px-5" :to="item.path" v-for="item, index in items" :key="index">
              {{item.name}}
            </RouterLink>
            <hr class="mx-0">
        </div>
      </transition>
    </div>
    
  </nav>
</template>

<script setup>
import {RouterLink} from 'vue-router';
import HoverSlider from '../components/effects/HoverSlider.vue'
import { ref, computed } from 'vue';
import { faBars, faGripLines, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useUserStore } from '@/assets/state/userStore';

const useStore = useUserStore();

const items = computed(() => {
  const baseItems = [
    { name: 'Shop', path: '/shop' },
    { name: 'Contact', path: '/contact' },
    { name: 'Cart', path: `/cart` }
  ];

  if (useStore.id) {
    baseItems.push({ name: 'Profile', path: `/user/${useStore.id}` });
  } else {
    baseItems.push({ name: 'Sign in', path: '/user/login' });
  }

  return baseItems;
});

const isMenuOpen = ref(false);

const openMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
}

</script>

<style>

.items-list{
  backdrop-filter: blur(10px);
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity:0;
}

</style>
