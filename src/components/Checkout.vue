<template>
  <div class="mt-10 w-screen flex items-center justify-center">
    <div class="bg-white p-10 rounded-lg shadow-md shadow-cyan-400 w-full max-w-2xl">
      <h2 class="text-3xl font-bold mb-6">Contact</h2>
      <form @submit.prevent="submitOrder" class="space-y-6">

        <!-- Email and Newsletter Subscription -->
        <div>
          <label for="email" class="block text-sm font-medium">
            Email <span class="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="mt-1 block w-full px-3 py-2 border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-400 focus:border-cyan-400"
            required
          />
          <div class="flex items-center mt-2">
            <input
              type="checkbox"
              id="newsletter"
              v-model="newsletter"
              class="mr-2"
            />
            <label for="newsletter" class="text-sm">
              Email me with news and offers
            </label>
          </div>
        </div>

        <h2 class="text-3xl font-bold mb-6">Delivery</h2>

        <!-- Country/Region -->
        <div>
          <label for="country" class="block text-sm font-medium">
            Country/Region
          </label>
          <input
            type="text"
            id="country"
            v-model="country"
            value="Pakistan"
            readonly
            class="mt-1 block w-full px-3 py-2 border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-400 focus:border-cyan-400"
          />
        </div>

        <!-- First and Last Name -->
        <div class="flex space-x-4">
          <div class="flex-1">
            <label for="firstName" class="block text-sm font-medium">
              First Name <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              v-model="firstName"
              class="mt-1 block w-full px-3 py-2 border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-400 focus:border-cyan-400"
              required
            />
          </div>
          <div class="flex-1">
            <label for="lastName" class="block text-sm font-medium">
              Last Name <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              v-model="lastName"
              class="mt-1 block w-full px-3 py-2 border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-400 focus:border-cyan-400"
              required
            />
          </div>
        </div>

        <!-- Complete Address -->
        <div>
          <label for="address" class="block text-sm font-medium">
            Complete Address <span class="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="address"
            v-model="address"
            class="mt-1 block w-full px-3 py-2 border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-400 focus:border-cyan-400"
            required
          />
        </div>

        <!-- City and Postal Code -->
        <div class="flex space-x-4">
          <div class="flex-1">
            <label for="city" class="block text-sm font-medium">
              City <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              v-model="city"
              class="mt-1 block w-full px-3 py-2 border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-400 focus:border-cyan-400"
              required
            />
          </div>
          <div class="flex-1">
            <label for="postalCode" class="block text-sm font-medium">
              Postal Code <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="postalCode"
              v-model="postalCode"
              class="mt-1 block w-full px-3 py-2 border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-400 focus:border-cyan-400"
              required
            />
          </div>
        </div>

        <!-- Mobile Number -->
        <div>
          <label for="phoneNumber" class="block text-sm font-medium">
            Mobile Number <span class="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="phoneNumber"
            v-model="phoneNumber"
            class="mt-1 block w-full px-3 py-2 border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-400 focus:border-cyan-400"
            required
            @input="validatePhoneNumber"
            maxlength="11"
            minlength="11"
          />
          <p v-if="phoneNumberError" class="text-red-500 text-sm">{{ phoneNumberError }}</p>
        </div>

        <!-- Payment Information -->
        <h2 class="text-3xl font-bold mb-6">Payment</h2>
        <div class="text-center">
          <p class="text-sm text-gray-600 mb-4">All transactions are secured and encrypted</p>
          <label for="paymentMethod" class="block text-sm font-medium">
            Payment Method
          </label>
          <input
            type="text"
            id="paymentMethod"
            v-model="paymentMethod"
            value="Cash on Delivery (COD)"
            readonly
            class="mt-1 block w-full px-3 py-2 border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-400 focus:border-cyan-400"
          />
        </div>

        <!-- Order Summary -->
        <div class="mt-6 border-t pt-6">
          <h2 class="text-3xl font-bold mb-4">Order Summary</h2>
          <div class="flex justify-between text-sm font-medium mb-2">
            <span>Total Amount:</span>
            <span>Rs. {{ totalAmount }}</span>
          </div>
          <div class="flex justify-between text-sm font-medium mb-2">
            <span>Shipping Cost:</span>
            <span>Rs. {{ shippingCost }}</span>
          </div>
          <div class="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>Rs. {{ totalAmountWithShipping }}</span>
          </div>
        </div>

        <!-- Complete Order Button -->
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-800 hover:bg-cyan-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-6"
        >
          Complete Order
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const props = defineProps({
  shippingCost: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  cartItems: Array,
});



const router = useRouter();

const email = ref('');
const newsletter = ref(false);
const firstName = ref('');
const lastName = ref('');
const address = ref('');
const country = ref('Pakistan');
const city = ref('');
const postalCode = ref('');
const phoneNumber = ref('');
const phoneNumberError = ref('');
const paymentMethod = ref('Cash on Delivery (COD)');

const totalAmountWithShipping = computed(() => {
  return (props.totalAmount + props.shippingCost).toFixed(2);
});

function validatePhoneNumber() {
  const regex = /^[0-9]{11}$/;
  phoneNumberError.value = regex.test(phoneNumber.value) ? '' : 'Phone number must be 11 digits.';
}

async function submitOrder() {
  if (!validateForm()) return;

  try {
    const response = await axios.post('http://localhost:3000/api/placeOrder', {
      orderItems: props.cartItems.map(item => ({
        productId: item.productId,
        productName: item.name,
        quantity: item.quantity,
        amount: item.price * item.quantity,
        size:item.size
      })),
      email: email.value,
      newsletter: newsletter.value,
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      country: country.value,
      city: city.value,
      postalCode: postalCode.value,
      phoneNumber: phoneNumber.value,
      paymentMethod: paymentMethod.value,
      totalAmount: props.totalAmount,
      shippingCost: props.shippingCost,
      totalAmountWithShipping: totalAmountWithShipping.value,
    });
    alert("Order placed successfully, Please check Email.")
    router.push('/');
  } catch (error) {
    console.error('Error submitting order:', error);
  }
}


function validateForm() {
  return email.value && firstName.value && lastName.value && address.value && city.value && postalCode.value && phoneNumber.value && !phoneNumberError.value;
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
