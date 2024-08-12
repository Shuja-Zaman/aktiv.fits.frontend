<template>
  <div class="product-component flex flex-col items-center min-h-screen py-8">
    <!-- Product List Section -->
    <div class="products-section shadow-lg shadow-cyan-400 rounded-lg p-6 w-[90%] lg:w-2/3 space-y-6">
      <h1 class="text-3xl font-semibold text-gray-800">Products</h1>
      <div v-if="products.length === 0" class="text-center text-gray-500">
        No products found.
      </div>
      <div v-else>
        <div v-for="(product) in displayedProducts" :key="product._id" class="product bg-gray-100 rounded-lg p-4 shadow-md space-y-4">
          <div class="product-header flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-800">{{ product.name }}</h2>
            <button @click="removeProduct(product._id)" class="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition">Delete</button>
          </div>
          <div class="product-details">
            <p class="text-gray-700"><strong>Price:</strong> ${{ product.price }}</p>
            <p class="text-gray-700"><strong>Description:</strong> {{ product.description }}</p>
            <p class="text-gray-700"><strong>Category:</strong> {{ product.category_id }}</p>
            <p v-if="product.sizes.length" class="text-gray-700"><strong>Sizes:</strong> {{ product.sizes.join(', ') }}</p>
            <img :src="product.imgurl" alt="Product Image" class="w-full h-48 object-cover rounded">
          </div>
        </div>
        <div v-if="products.length > 5" class="text-center mt-4">
          <button @click="toggleShowMore" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
            {{ showMore ? 'Hide' : 'Show More' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Create Product Section -->
    <div class="new-product-section shadow-lg shadow-cyan-400 rounded-lg p-6 w-[90%] lg:w-2/3 mt-8">
      <h2 class="text-2xl font-semibold text-gray-800">Create New Product</h2>
      <form @submit.prevent="createProduct" class="space-y-4">
        <!-- Existing form fields -->
        <div>
          <label for="name" class="block text-gray-700">Name</label>
          <input v-model="newProduct.name" type="text" id="name" class="w-full p-2 border border-gray-300 rounded">
        </div>
        <div>
          <label for="price" class="block text-gray-700">Price</label>
          <input v-model="newProduct.price" type="number" id="price" class="w-full p-2 border border-gray-300 rounded">
        </div>
        <div>
          <label for="description" class="block text-gray-700">Description</label>
          <textarea v-model="newProduct.description" id="description" class="w-full p-2 border border-gray-300 rounded"></textarea>
        </div>
        <div>
          <label for="image" class="block text-gray-700">Image</label>
          <input @change="onFileChange" type="file" id="image" class="w-full p-2 border border-gray-300 rounded">
        </div>
        <div>
          <label for="category_id" class="block text-gray-700">Category</label>
          <select v-model="newProduct.category_id" id="category_id" class="w-full p-2 border border-gray-300 rounded">
            <option v-for="category in categories" :key="category._id" :value="category._id">{{ category.name }}</option>
          </select>
        </div>
        <!-- New Sizes Field -->
        <div>
          <label for="sizes" class="block text-gray-700">Sizes (comma separated)</label>
          <input v-model="newProduct.sizes" type="text" id="sizes" class="w-full p-2 border border-gray-300 rounded" placeholder="e.g. large, medium">
        </div>
        <button type="submit" class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">Create Product</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const products = ref([]);
const categories = ref([]);
const showMore = ref(false);

let file = null;

const onFileChange = (event) => {
  file = event.target.files[0];
};

const newProduct = ref({
  name: '',
  price: '',
  description: '',
  imgurl: '',
  category_id: '',
  sizes: '' // Add sizes field
});

const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/products');
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/categories');
    categories.value = response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

const createProduct = async () => {
  try {
    if (!file) {
      alert('Please select an image to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', newProduct.value.name);
    formData.append('price', newProduct.value.price);
    formData.append('description', newProduct.value.description);
    formData.append('category_id', newProduct.value.category_id);

    // Convert sizes string to array and append to formData
    const sizesArray = newProduct.value.sizes.split(',').map(size => size.trim()).filter(size => size);
    formData.append('sizes', JSON.stringify(sizesArray));

    const response = await axios.post('http://localhost:3000/api/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    products.value.push(response.data);
    newProduct.value = { name: '', price: '', description: '', category_id: '', sizes: '' };
    file = null;
    alert('product added successfully')
  } catch (error) {
    console.error('Error creating product:', error);
  }
};

const removeProduct = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/api/products/${id}`);
    products.value = products.value.filter(product => product._id !== id);
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

const toggleShowMore = () => {
  showMore.value = !showMore.value;
};

const displayedProducts = computed(() => {
  return showMore.value ? products.value : products.value.slice(0, 5);
});

onMounted(() => {
  fetchProducts();
  fetchCategories();
});
</script>


<style scoped>
.products-section, .new-product-section {
  background-color: #ffffff; /* Tailwind White */
}

.product {
  background-color: #f3f4f6; /* Tailwind Gray 200 */
}

.product h2 {
  color: #1f2937; /* Tailwind Gray 800 */
}

.product p {
  color: #4b5563; /* Tailwind Gray 600 */
}

button {
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  transform: scale(1.02);
}
</style>