<template>
    <div class="cart-card flex items-center justify-between p-4 bg-white shadow rounded-lg mb-4">
      <div class="flex items-center">
        <img :src="product.image" alt="product image" class="w-16 h-16 object-cover rounded-lg mr-4">
        <div>
          <h3 class="text-lg font-semibold">{{ product.name }}</h3>
          <p class="text-sm text-gray-500">{{ product.description }}</p>
        </div>
      </div>
      <div class="text-right">
        <p class="text-lg font-semibold">${{ product.price }}</p>
        <button @click="removeFromCart" class="text-red-500 hover:text-red-700 mt-2">Remove</button>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    product: Object
  });
  
  const emit = defineEmits(['remove']);
  
  const removeFromCart = () => {
    emit('remove', product.id);
  };
  </script>
  
  <style scoped>
  .cart-card {
    transition: transform 0.2s;
  }
  
  .cart-card:hover {
    transform: translateY(-5px);
  }
  </style>
  