<template>
  <div class="shop flex flex-col pb-5">

    <!-- Search Bar and Filters -->
    <div class="container mx-auto pt-8 flex flex-col md:flex-row justify-between items-center px-4 md:px-8 lg:px-12">
      <input 
        type="text" 
        v-model="searchQuery" 
        @input="fetchProducts" 
        placeholder="Search products..." 
        class="font-normal tracking-normal w-full max-w-lg px-4 py-2 border rounded-md shadow-md shadow-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition">
      <select v-model="selectedCategory" @change="fetchProducts" class="mt-4 md:mt-0 w-full md:w-auto px-4 py-2 border rounded-md shadow-sm shadow-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category._id" :value="category._id">{{ category.name }}</option>
      </select>
    </div>

    
    <!-- Products -->
    <section class="container mx-auto mt-8 flex-1 px-4 md:px-8 lg:px-12">
      <h2 class="text-2xl font-bold mb-4 text-center md:text-left">Products</h2>
      <!-- Loading Spinner -->
      <div v-if="loading" class="flex justify-center items-center min-h-screen">
        <svg class="animate-spin h-8 w-8 text-cyan-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v2a6 6 0 0 0 0 12v2a8 8 0 0 1-8-8z"></path>
        </svg>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RouterLink 
          v-for="product in filteredProducts"
          :key="product._id"
          :to="`/shop/product/${product._id}`"
        >
          <ProductCard
            :id="product._id"
            :name="product.name"
            :price="product.price"
            :description="product.description"
            :imgurl="product.imgurl"
          />
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { RouterLink, useRouter } from 'vue-router';
import ProductCard from '@/components/ProductCard.vue';
import { useUserStore } from '@/assets/state/userStore';

const router = useRouter();
const categories = ref([]);
const products = ref([]);
const searchQuery = ref('');
const selectedCategory = ref('');
const loading = ref(false);
const userStore = useUserStore();

const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/categories');
    categories.value = response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

const fetchProducts = async () => {
  loading.value = true;  // Set loading to true before fetching data
  try {
    let url = 'http://localhost:3000/api/products';
    const params = {};
    if (selectedCategory.value) {
      params.category_id = selectedCategory.value;
    }
    if (searchQuery.value) {
      params.name = searchQuery.value;
    }
    const response = await axios.get(url, { params });
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    loading.value = false;  // Set loading to false after fetching data
  }
};

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    return product.name.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});

// const user = ref({
//   isVerified: false
// });

// const checkAuth = async () => {
//   if (userStore.id) {
//     const response = await axios.get(`http://localhost:3000/api/users/${userStore.id}`);
//     user.value = response.data;
//     if (!user.value.isVerified) {
//       alert('Email not verified. Please verify Email from profile.');
//       router.push(`/user/${userStore.id}`);
//     }
//   } else {
//     alert('Login to view Shop.');
//     router.push('/user/login');
//   }
// };

onMounted(() => {
  // checkAuth();
  fetchCategories();
  fetchProducts();
});
</script>

<style scoped>

svg {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.products-container {
  height: 32rem; /* Adjust the height as needed */
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: #22d3ee #021c50; /* Custom colors for scrollbar */
}

.products-container::-webkit-scrollbar {
  width: 12px; /* Width of the scrollbar */
}

.products-container::-webkit-scrollbar-track {
  background: #f3f4f6; /* Track color */
}

.products-container::-webkit-scrollbar-thumb {
  background-color: #22d3ee; /* Scrollbar thumb color */
  border-radius: 10px; /* Rounded edges */
  border: 3px solid #f3f4f6; /* Padding around the thumb */
}

@media (max-width: 768px) {
  .products-container {
    height: auto;
  }
}
</style>
