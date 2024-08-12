<template>
    <div class="category-component flex flex-col items-center min-h-screen py-8">
      <div class="categories-section shadow-lg shadow-cyan-400 rounded-lg p-6 w-[90%] lg:w-2/3 space-y-6">
        <h1 class="text-3xl font-semibold text-gray-800">Categories</h1>
        <div v-if="categories.length === 0" class="text-center text-gray-500">
          No categories found.
        </div>
        <div v-else>
          <div v-for="category in categories" :key="category._id" class="category bg-gray-100 rounded-lg p-4 shadow-md space-y-4">
            <div class="category-header flex justify-between items-center">
              <h2 class="text-xl font-semibold text-gray-800">{{ category.name }}</h2>
              <button @click="removeCategory(category._id)" class="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition">Delete</button>
            </div>
          </div>
        </div>
      </div>
  
      <div class="new-category-section shadow-lg shadow-cyan-400 rounded-lg p-6 w-[90%] lg:w-2/3 mt-8">
        <h2 class="text-2xl font-semibold text-gray-800">Create New Category</h2>
        <form @submit.prevent="createCategory" class="space-y-4">
          <div>
            <label for="name" class="block text-gray-700">Name</label>
            <input v-model="newCategory.name" type="text" id="name" class="w-full p-2 border border-gray-300 rounded">
          </div>
          <button type="submit" class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">Create Category</button>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const categories = ref([]);
  const newCategory = ref({
    name: ''
  });
  
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/categories');
      categories.value = response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  const createCategory = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/categories', newCategory.value);
      categories.value.push(response.data);
      newCategory.value = { name: '' };
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };
  
  const removeCategory = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/categories/${id}`);
      categories.value = categories.value.filter(category => category._id !== id);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };
  
  onMounted(() => {
    fetchCategories();
  });
  </script>
  
  <style scoped>
  .categories-section, .new-category-section {
    background-color: #ffffff; /* Tailwind White */
  }
  
  .category {
    background-color: #f3f4f6; /* Tailwind Gray 200 */
  }
  
  .category h2 {
    color: #1f2937; /* Tailwind Gray 800 */
  }
  
  button {
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  button:hover {
    transform: scale(1.02);
  }
  </style>
  