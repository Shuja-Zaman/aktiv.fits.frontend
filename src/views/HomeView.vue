<template>

  <div class="main ">
    <!-- title -->
    <div class="hidden lg:flex h-[80vh] p-10">
      <!-- screen -->
      <div class="brand-line w-[75%] my-10">
        <h1 class="kanit-bold screen-big">
         <span class="screen-medium">
           Stay 
          </span>
           <span class="gradient">Strong,</span>
         <br>
          <span class="ml-28 screen-medium">Stay 
          </span>
            <span class="gradient">Aktiv.</span>
        </h1>
        
        <RouterLink class="inline-block py-10 kanit-semibold text-2xl" to="/shop">
          <span class=" border-[3px] py-2 px-5 border-zinc-900 hover:bg-zinc-800 hover:text-slate-100 duration-300">
            Shop Now
          </span>
        </RouterLink>
  
      </div>
      <div class="kanit-light supported flex items-end w-[30%] text-xl">
        <p>
          "Aktiv Fits empowers you to break boundaries, embrace your strength, and live every moment with unstoppable energy."
        </p>
      </div>
    </div>
  
    <!-- mobile -->
    <div class="lg:hidden block brand-line p-10 mt-10">
      <h1 class="kanit-bold mob-big flex flex-col">
       <span class="mob-medium ">
        Stay
      </span>
        <span class="gradient">Strong,</span>
        <span class="mob-medium">
          Stay
        </span>
          <span class="gradient">Aktiv.</span>
      </h1>
      
      <RouterLink class="block text-center py-10 kanit-semibold text-2xl" to="/">
        <span class=" border-[3px] py-2 px-5 border-zinc-700 hover:bg-zinc-700 hover:text-slate-100 duration-300">
          Shop Now
        </span>
      </RouterLink>
  
      <div class="kanit-light my-10 supported flex items-end text-xl">
        <p class="text-center">
          "Aktiv Fits empowers you to break boundaries, embrace your strength, and live every moment with unstoppable energy."
        </p>
      </div>
    </div>

      <hr>
    
      <!-- video -->
      <div>
        <Video/>
    </div>

    <!-- parallax -->
    <div>
        <Parallax/>
    </div>

    <!--  products -->
    <Products/>

    <!-- footer -->
    <Footer/>
  </div>
</template>

<script setup>
import Parallax from "../components/Parallax.vue";
import Products from "../components/Products.vue";
import Video from "../components/Video.vue";
import Footer from '../components/Footer.vue';

</script>

<style>

</style>