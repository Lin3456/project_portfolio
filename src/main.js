import {createApp} from 'vue';
import { createPinia } from 'pinia'

import App from './App.vue';
import router from './router';
import Tag from '@/components/tag.vue'

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../src/assets/style.css';


const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.component('Tag', Tag)
app.mount('#app')