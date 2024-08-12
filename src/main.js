import './assets/index.css'


import { createPinia } from 'pinia';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useUserStore } from './assets/state/userStore';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia());
app.use(router)


const userStore = useUserStore();
userStore.loadUserFromStorage(); 

app.mount('#app')
