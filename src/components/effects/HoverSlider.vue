<template>
  <button :data-text="text"
   class="hover-button rounded-full text-lg py-[.4rem] px-5">
    {{ text }}
  </button>
</template>

<script setup>
const props = defineProps(['text'])

</script>

<style scoped>
.hover-button {
  position: relative;
  overflow: hidden;
  transition: background-color 0.5s;
}

.hover-button::before {
  content: attr(data-text);
  position: absolute;
  top: 50%;
  left: -100%;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(226, 232, 240); /* Change to your desired hover text color */
  background-color: rgb(23 ,39 ,42 ); /* Change to your desired hover background color */
  transition: left 0.3s;
  transform: translateY(-50%);
}

.hover-button:hover::before {
  left: 0;
}

.hover-button:hover{
  color: rgb(39, 39, 42);
}



</style>