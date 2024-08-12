<template>
  <div class="product-view flex flex-col">
    <!-- Product Details Card -->
    <section class="container mx-auto mt-8 flex-1 px-4 md:px-8 lg:px-12">
      <div class="product-details-card p-8 bg-white rounded-md shadow-md shadow-cyan-400">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Product Image -->
          <div class="img-container h-[350px] my-2 overflow-hidden">
            <img :src="product.imgurl" alt="Product Image" class="product-image w-full h-full object-cover rounded-md mb-4">
          </div>
          <!-- Product Details -->
          <div>
            <h2 class="text-2xl font-bold mb-4 capitalize">{{ product.name }}</h2>
            <p class="text-lg text-cyan-600 font-semibold mb-4">Rs. {{ product.price }}</p>
            <p class="text-base mb-4">{{ product.description }}</p>
            <!-- Sizes Radio Buttons -->
            <div v-if="product.sizes && product.sizes.length" class="mb-4">
              <p class="block text-sm font-medium text-gray-700 mb-2">Select Size</p>
              <div v-for="size in product.sizes" :key="size" class="mb-2">
                <label :for="size" class="flex items-center space-x-2">
                  <input required type="radio" :id="size" :value="size" v-model="selectedSize" class="form-radio h-5 w-5 text-cyan-600">
                  <span>{{ size }}</span>
                </label>
              </div>
            </div>
            <!-- Quantity Input -->
            <div class="mb-4">
              <label for="quantity" class="block text-sm font-medium text-gray-700">Quantity</label>
              <input type="number" v-model="quantity" id="quantity" min="1" class="mt-1 block w-20 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm">
            </div>
            <button @click="addToCart" class="px-4 py-2 bg-cyan-500 text-white rounded-md shadow-sm hover:bg-cyan-600 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Review Form -->
    <section class="container mx-auto mt-8 px-4 md:px-8 lg:px-12">
      <div class="review-form bg-white rounded-md shadow-md p-8">
        <h3 class="text-xl font-semibold mb-4">Add a Review</h3>
        <form @submit.prevent="submitReview">
          <div class="mb-4">
            <label for="comment" class="block text-sm font-medium text-gray-700">Comment</label>
            <textarea v-model="review.comment" id="comment" rows="4" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"></textarea>
          </div>
          <button type="submit" class="px-4 py-2 bg-cyan-500 text-white rounded-md shadow-sm hover:bg-cyan-600 transition">
            Submit Review
          </button>
        </form>
      </div>
    </section>

    <!-- Reviews Section -->
    <section class="container mx-auto my-8 px-4 md:px-8 lg:px-12">
      <div class="reviews bg-white rounded-md shadow-md p-8">
        <h3 class="text-xl font-semibold mb-4">Product Reviews</h3>
        <div v-if="reviews.length === 0" class="text-gray-600">
          <div class="flex items-center">
            <div class="flex space-x-1 text-yellow-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="20" height="20" class="star-icon">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="20" height="20" class="star-icon">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="20" height="20" class="star-icon">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="20" height="20" class="star-icon">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="20" height="20" class="star-icon">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            </div>
            <span class="ml-4">Be the first one to write a review!</span>
          </div>
        </div>
        <div v-else>
          <div v-for="review in reviews" :key="review._id" class="review-card border-t border-gray-200 pt-4 mt-4">
            <div class="flex items-center mb-2">
              <div class="bg-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                <span class="text-sm font-semibold">{{ review.userName.charAt(0).toUpperCase() }}</span>
              </div>
              <h4 class="text-lg font-medium text-gray-700">{{ review.userName }}</h4>
              <p class="ml-4 text-sm">{{ review.formattedDate }}</p> <!-- Display the formatted date -->
            </div>
            <p class="text-base mt-2">{{ review.comment }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { format } from 'date-fns'; // Import date formatting function
import { useUserStore } from '@/assets/state/userStore';

const product = ref({});
const quantity = ref(1);
const selectedSize = ref('');
const review = ref({
  comment: ''
});
const reviews = ref([]);
const useStore = useUserStore();
const route = useRoute();
const router = useRouter();

const fetchProduct = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/products/${route.params.id}`);
    product.value = response.data;

    // Set default size if available
    if (product.value.sizes && product.value.sizes.length > 0) {
      selectedSize.value = product.value.sizes[0]; // Set the first size as default
    } else {
      selectedSize.value = 'none';
    }
    fetchReviews(); // Fetch reviews after getting the product
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};

const fetchReviews = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/reviews/product/${route.params.id}`);
    reviews.value = response.data.map(review => ({
      ...review,
      formattedDate: format(new Date(review.createdAt), 'MMMM dd, yyyy, h:mm a'), // Format the date
    }));
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
};

const addToCart = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/cart/add', {
      productId: product.value._id,
      quantity: quantity.value,
      size: selectedSize.value,
      name: product.value.name,
      price: product.value.price,
    }, { withCredentials: true });

    alert('Product added to Cart successfully.');
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

const submitReview = async () => {
  try {
    checkAuth();
    await axios.post('http://localhost:3000/api/reviews', {
      userId: useStore.id,
      userName: useStore.name,
      productId: product.value._id,
      comment: review.value.comment
    });
    review.value = { comment: '' }; // Reset review form
    fetchReviews(); // Fetch reviews again after submitting
    alert('Review submitted successfully.');
  } catch (error) {
    console.error('Error submitting review:', error);
  }
};

const checkAuth = () => {
  if (!useStore.id) {
    alert("Please Login to add a Review.");
    router.push('/user/login');
  }
};

onMounted(() => {
  fetchProduct();
});
</script>


<style scoped>
.product-details-card {
  background: #fff;
  border-radius: 0.5rem;
  padding: 2rem;
}

.product-details-card img {
  border-radius: 0.5rem;
}

.review-form {
  background: #fff;
  border-radius: 0.5rem;
}

.review-form textarea {
  resize: vertical;
}

.review-card {
  padding: 1rem;
}

.review-card .reviewer-initial {
  background-color: #3b82f6; /* Tailwind Blue 500 */
  color: #ffffff; /* Tailwind White */
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 700;
}

@media (max-width: 768px) {
  .product-details-card {
    padding: 1rem;
  }

  .product-details-card img {
    width: 100%;
    height: auto;
  }
}
</style>
