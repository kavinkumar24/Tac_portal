import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import ToastPlugin from 'vue-toast-notification';

import './index.css'
const app = createApp(App)

app.use(router)
app.use(ToastPlugin);

app.use(PrimeVue);


// router.beforeEach((to, from, next) => {
//   const isAuthenticated = localStorage.getItem('LoggedIn') === 'true';
//   if (to.meta.requiresAuth && !isAuthenticated) {
//     next('/'); 
//   } else if (!to.meta.requiresAuth && isAuthenticated) {
//     next('/home'); 
//   } else {
//     next(); // Continue navigation
//   }
// });


app.mount('#app')



