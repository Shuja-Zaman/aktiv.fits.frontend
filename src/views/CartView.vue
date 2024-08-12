<template>
  <div class="cart-page p-8 flex flex-col items-center">
    <div class="cart-items bg-white shadow-lg shadow-cyan-400 rounded-lg p-6 w-full max-w-2xl">
      <div v-if="cartItems === null" class="loading flex flex-col items-center text-center py-16">
        <p>Loading your cart...</p>
      </div>
      <div v-else-if="cartItems.length === 0" class="empty-cart flex flex-col items-center text-center py-16">
        <svg class="w-24 h-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h18l-2 14H5L3 3z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 10-8 0v4m-2 4h12a2 2 0 110 4H6a2 2 0 110-4z"></path>
        </svg>
        <p class="text-lg text-gray-500">Your cart is empty.</p>
        <RouterLink to="/shop">
          <button class="mt-6 bg-cyan-800 text-white py-2 px-4 rounded hover:bg-cyan-900 transition">
            Continue Shopping
          </button>
        </RouterLink>
      </div>
      <div v-else>
        <h2 class="text-3xl font-bold capitalize" >Cart:</h2>
        <div v-for="item in cartItems" :key="item.productId" class="cart-item flex items-center justify-between py-4">
          
          <div>
            <img :src="item.imgUrl" alt="">
            <h3 class="text-xl font-bold capitalize">{{ item.name }}</h3>
            <p class="text-gray-500">Quantity: {{ item.quantity }}</p>
            <p class="text-lg">Rs. {{ item.price }}</p>
            <p v-if="item.size !== 'none' " class="text-lg capitalize">size: {{ item.size }} </p>
          </div>
          <button @click="removeFromCart(item.productId, item.size)" class="ml-4 bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700 transition">Remove</button>
        </div>
        <hr>
        <div class="total mt-4 text-lg">
          Total Amount: {{ totalAmount }}
        </div>
        <button @click="toggleCheckout = !toggleCheckout" class="mt-6 bg-cyan-800 text-white py-2 px-4 rounded hover:bg-cyan-900 transition w-full">
          Proceed to Checkout
        </button>
      </div>
    </div>

    <!-- Pass all cart items and the total amount as props to the Checkout component -->
    <Checkout
      v-if="toggleCheckout"
      :cartItems="cartItems"
      :totalAmount="totalAmount"
      :shippingCost="250"
      @orderPlaced="handleOrderPlaced"
    />
  </div>
</template>

<script setup>
import Checkout from '@/components/Checkout.vue';
import { ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';
import { useUserStore } from '@/assets/state/userStore';

const cartItems = ref(null);
const useStore = useUserStore();
const toggleCheckout = ref(false);

const totalAmount = computed(() => {
  if (!cartItems.value) return 0;
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

onMounted(async () => {
  try {
      const response = await axios.get(`http://localhost:3000/api/cart`,{withCredentials:true});

      if (Array.isArray(response.data)) {
        cartItems.value = response.data.map(item => ({
          ...item,
          product: item.productId,
        }));

      } else {
        console.error('Unexpected response data format:', response.data);
      }
    
  } catch (error) {
    console.error('Error fetching cart items:', error);
  }
});

const removeFromCart = async (productId, size) => {
  try {
    // Send a request to the backend to remove the item
    const response = await axios.delete(`http://localhost:3000/api/cart/remove/${productId}/${size}`, { withCredentials: true });

    // Update the cartItems state to remove the item locally
    cartItems.value = cartItems.value.filter(item => !(item.productId === productId && item.size === size));
    
    // Handle success (you can also show a message or perform other actions if needed)
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};

const handleOrderPlaced = () => {
  // Clear the cart after placing the order
  cartItems.value = [];
  toggleCheckout.value = false;
};
</script>

<style scoped>
.empty-cart svg {
  transition: transform 0.2s;
}

.empty-cart svg:hover {
  transform: scale(1.1);
}

.empty-cart button {
  transition: background-color 0.2s, transform 0.2s;
}

.empty-cart button:hover {
  transform: translateY(-2px);
}
</style>
