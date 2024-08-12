import { defineStore } from 'pinia';

export const useAdminStore = defineStore('adminStore', {
  state: () => ({
    id: null,
    email: null,
    role: null
  }),
  actions: {
    setAdmin(admin) {
      this.id = admin.id;
      this.email = admin.email;
      this.role = 'admin';
    },
    clearAdmin() {
      this.id = null;
      this.email = null;
      this.role = null;
    }
  },
  getters: {
    isLoggedIn: state => !!state.id
  }
});
