<script setup>
import { RouterLink } from 'vue-router';
import { ref, onMounted, onUnmounted } from 'vue';

const items = [
    {name:'Shop', path:'/shop'},
    {name:'Contact', path:'/contact'},
    {name:'Profile', path:'/user/login'}
  ];
const cursor = ref(null);

const handleMouseMove = (event) => {
  if (cursor.value) {
    cursor.value.style.left = `${event.clientX - cursor.value.offsetWidth / 2}px`;
    cursor.value.style.top = `${event.clientY - cursor.value.offsetHeight / 2}px`;
  }
};

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
});
</script>

<template>
  <div class="wrapper h-full relative w-full bg-zinc-950 text-zinc-200">
    <div class="footer h-screen flex flex-col justify-between">
      <div class="top block lg:flex items-center justify-between py-10 px-20">
        <div class='left flex flex-col gap-3'>
          <RouterLink :to="item.path"
            class="hover:text-zinc-400 transition-all text-5xl font-bold tracking-tighter"
            v-for="(item, index) in items"
            :key="index"
          >
            {{ item.name }}
          </RouterLink>
        </div>
        <div class="py-5 right block lg:flex flex-col">
          <h1 class="font-light py-3">
            Get industry insights and creative inspiration <br> straight to your inbox.
          </h1>
          <div class="flex flex-row">
            <input
              placeholder="example@gmail.com"
              type="email"
              class="bg-transparent border-b-[1px] focus:outline-none px-1 border-zinc-500"
            />
            <font-awesome-icon
              class="px-2 hover:px-3 transition-all hover:cursor-pointer"
              icon="arrow-right"
            ></font-awesome-icon>
          </div>
        </div>
      </div>
      
      <div class="bottom py-5">
        <h1
          class="px-10 pb-2 text-transparent bg-gradient-to-r from-zinc-800 via-slate-300 to-slate-200 bg-clip-text text-5xl lg:text-9xl font-extrabold"
        >
          Aktiv-Fits
        </h1>
        <hr class="border-zinc-500">
        <div class="items px-10 py-5 font-light flex flex-col lg:flex-row gap-2 justify-around">
          <p>Copyright © Aktiv-Fits</p>
          <p>
            <span>
              <font-awesome-icon class="px-1" icon="globe"></font-awesome-icon>
            </span>
            RWP, Punjab
          </p>
          <RouterLink to="">Instagram</RouterLink>
          <RouterLink to="">LinkedIn</RouterLink>
        </div>
        <div ref="cursor" class="absolute my-cursor lg:h-[2rem] lg:w-[2rem] "></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  animation: open linear;
  animation-timeline: view();
  animation-range: entry cover 50%;
}

.my-cursor {
  border-radius: 100%;
  top: 0;
  background-color: rgb(226, 232, 240);
  pointer-events: none;
  transition: all linear .3s;
  mix-blend-mode: difference;
}

@keyframes open {
  from {
    scale: 0.5;
    border-radius: 10rem;
  }
  to {
    scale: 1;
    border-radius: 0rem;
  }
}
</style>
