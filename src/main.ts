import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { createVuetify } from 'vuetify';

// Import Vuetify styles
import 'vuetify/styles'; // Ensure your project is set up to handle CSS imports

const app = createApp(App);
const vuetify = createVuetify(); // New Vuetify instance
app.use(vuetify); // Use Vuetify as a plugin

// Add router and store
app.use(router);
app.use(store);

// Mount the app
app.mount('#app');
