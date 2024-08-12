import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import ContactView from '@/views/ContactView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import CartView from '@/views/CartView.vue'
import ShopView from '@/views/ShopView.vue'
import VerificationView from '@/views/auth/VerificationView.vue'
import ProductView from '@/views/ProductView.vue'
import ProfileView from '@/views/ProfileView.vue';
import AdminLoginView from '@/views/admin/AdminLoginView.vue';
import AdminHome from '@/views/admin/AdminHome.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/contact',
      name:'contact',
      component: ContactView
    },
    {
      path:'/user/login',
      name:'login',
      component:LoginView
    },
    {
      path:'/user/register',
      name:'register',
      component:RegisterView
    },
    {
      path:'/cart',
      name:'cart',
      component:CartView
    },
    {
      path:'/shop',
      name:'shop',
      component:ShopView
    },
    {
      path:'/user/verification',
      name:'verification',
      component:VerificationView
    },
    {
      path:'/shop/product/:id',
      name:'product',
      component:ProductView
    },
    {
      path:'/user/:id',
      name:'profile',
      component:ProfileView
    },
    {
      path:'/user/admin/login',
      name:'adminLogin',
      component:AdminLoginView
    },{
      path:'/user/admin',
      name:'adminHome',
      component:AdminHome
    }

    
  ]
});


export default router
