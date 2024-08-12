// src/stores/userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    id: null,
    email: '',
    name:''
  }),
  actions: {
    setUser(user) {
      this.id = user.id;
      this.email = user.email;
      this.name = user.name;
      localStorage.setItem('user', JSON.stringify(user));
    },
    clearUser() {
      this.id = null;
      this.email = '';
      this.name = '';
      localStorage.removeItem('user');
    },
    loadUserFromStorage() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.setUser(user);
      }
    }
  },
  getters: {
    isLoggedIn: state => !!state.id
  }
});
