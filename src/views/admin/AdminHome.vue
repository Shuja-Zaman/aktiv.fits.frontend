<template>
  <div class="toggle-components py-8">
    <div class="button-group flex space-x-4 mb-8">
      <button
        @click="toggleComponent('order')"
        :class="['toggle-button', { 'active-button': components.order }]"
      >
        Toggle Order
      </button>
      <button
        @click="toggleComponent('product')"
        :class="['toggle-button', { 'active-button': components.product }]"
      >
        Toggle Product
      </button>
      <button
        @click="toggleComponent('message')"
        :class="['toggle-button', { 'active-button': components.message }]"
      >
        Toggle Message
      </button>
      <button
        @click="toggleComponent('category')"
        :class="['toggle-button', { 'active-button': components.category }]"
      >
        Toggle Category
      </button>
    </div>

    <div v-if="components.order">
      <Order />
    </div>
    <div v-if="components.product">
      <Product />
    </div>
    <div v-if="components.message">
      <Message />
    </div>
    <div v-if="components.category">
      <Category />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Order from '@/components/adminComponents/Order.vue';
import Product from '@/components/adminComponents/Product.vue';
import Message from '@/components/adminComponents/Message.vue';
import Category from '@/components/adminComponents/Category.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAdminStore } from '@/assets/state/adminStore';


const adminStore = useAdminStore();
const router = useRouter();
const components = ref({
  order: false,
  product: false,
  message: false,
  category: false
});

const toggleComponent = (component) => {
  components.value[component] = !components.value[component];
};

const checkAuth = ()=>{
  if(adminStore.id && adminStore.role){
    // console.log('stored');
  }else{
    router.push('/');
  }
}


onMounted(()=>{
  checkAuth();
})
</script>

<style scoped>
.toggle-components {
  background-color: #f3f4f6; /* Tailwind Gray 200 */
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.toggle-button {
  background-color: #3b82f6; /* Tailwind Blue 500 */
  color: #ffffff; /* Tailwind White */
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.toggle-button:hover {
  background-color: #2563eb; /* Tailwind Blue 700 */
  transform: scale(1.05);
}

.active-button {
  background-color: #06b6d4; /* Tailwind Cyan 400 */
}
</style>
