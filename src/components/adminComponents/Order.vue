<template>
  <div class="order-component flex flex-col items-center min-h-screen py-8">
    <div class="orders-section shadow-lg shadow-cyan-400 rounded-lg p-6 w-[90%] lg:w-2/3 space-y-6">
      <h1 class="text-3xl font-semibold text-gray-800">Orders</h1>
      <div v-if="orders.length === 0" class="text-center text-gray-500">
        No orders found.
      </div>
      <div v-else>
        <div v-for="(order) in displayedOrders" :key="order._id" class="order bg-gray-100 rounded-lg p-4 shadow-md space-y-4">
          <div class="order-header flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-800">Order ID: {{ order._id }}</h2>
            <button @click="removeOrder(order._id)" class="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition">Delete</button>
          </div>
          <div class="order-details">
            <p class="text-gray-700"><strong>Phone Number:</strong> {{ order.phoneNumber }}</p>
            <p class="text-gray-700"><strong>Address:</strong> {{ order.address }}</p>
            <p class="text-gray-700"><strong>Postal Code:</strong> {{ order.postalCode }}</p>
            <p class="text-gray-700"><strong>Total Amount:</strong> RS{{ order.totalAmount }}</p>
            <p class="text-gray-700"><strong>Delivery Charges:</strong> RS{{ order.shippingCost }}</p>
            <p class="text-gray-700"><strong>Created At:</strong> {{ new Date(order.createdAt).toLocaleString() }}</p>
            <p class="text-gray-700"><strong>Updated At:</strong> {{ new Date(order.updatedAt).toLocaleString() }}</p>
            <p class="text-gray-700"><strong>Total Amount:</strong> RS{{ order.totalAmountWithShipping }}</p>
          
          </div>
          <div class="order-items">
            <h3 class="text-lg font-semibold text-gray-800">Items:</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li v-for="item in order.orderItems" :key="item.productId" class="text-gray-700">
                <strong>Product:</strong> {{ item.productName }} - <strong>Quantity:</strong> {{ item.quantity }} - <strong>Amount:</strong> ${{ item.amount }}
              </li>
            </ul>
          </div>
        </div>
        <div v-if="orders.length > 5" class="text-center mt-4">
          <button @click="toggleShowMore" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
            {{ showMore ? 'Hide' : 'Show More' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const orders = ref([]);
const showMore = ref(false);

const fetchOrders = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/orders');
    orders.value = response.data.orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};

const removeOrder = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/api/orders/${id}`);
    orders.value = orders.value.filter(order => order._id !== id);
  } catch (error) {
    console.error('Error deleting order:', error);
  }
};

const toggleShowMore = () => {
  showMore.value = !showMore.value;
};

const displayedOrders = computed(() => {
  return showMore.value ? orders.value : orders.value.slice(0, 5);
});

onMounted(() => {
  fetchOrders();
});
</script>

<style scoped>
.orders-section {
  background-color: #ffffff; /* Tailwind White */
}

.order {
  background-color: #f3f4f6; /* Tailwind Gray 200 */
}

.order h2, .order h3 {
  color: #1f2937; /* Tailwind Gray 800 */
}

.order p, .order li {
  color: #4b5563; /* Tailwind Gray 600 */
}

button {
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  transform: scale(1.02);
}
</style>
