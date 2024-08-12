<template>
  <!-- Route to obj-id page -->
    <div class=" product-card p-4 bg-white rounded-md shadow-md hover:shadow-lg transition ">
      <div class="img-container h-[250px] my-2 overflow-hidden">
        <img :src="imgurl" alt="Product Image" class=" w-full h-full object-cover rounded-md mb-4">
      </div>
      <h3 class="capitalize text-xl mb-2">{{ name }}</h3>
      <p class=" my-2">Rs. {{ price }}</p>
      <button class="font-bold text-slate-200 bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-xl text-md ">Buy now</button>
    </div>
</template>


<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  id: String,
  name: String,
  price: Number,
  description: String,
  imgurl:String
});
</script>
<style scoped>
.product-card {
  transition: box-shadow 0.3s ease-in; /* Smooth shadow transition */
}

.product-card .img-container {
  position: relative; /* Ensure proper positioning */
}

.product-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out; /* Smooth transition for zoom effect */
}

.product-card:hover img {
  transform: scale(1.1); /* Zoom effect on hover */
}
</style>

