import {createApp} from 'vue';
import { createPinia } from 'pinia'

import App from './App.vue';
import router from './router';
import Tag from '@/components/tag.vue';
import Modal from '@/components/modal.vue';
import Button from '@/components/button.vue';
import Loading from '@/components/loading.vue';
import AutoComplete from '@/components/autoComplete.vue'; 

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'weather-icons/css/weather-icons.css';
import '@/assets/style.css';


const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.component('Tag', Tag)
app.component('Modal', Modal)
app.component('Button', Button)
app.component('Loading', Loading)
app.component('AutoComplete', AutoComplete)
app.mount('#app')