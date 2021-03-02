import '@mdi/font/css/materialdesignicons.css';
import 'leaflet/dist/leaflet.css';
import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import i18n from './plugins/i18n';
import axios from 'axios';

Vue.config.productionTip = false;

axios.defaults.baseURL = 'http://localhost:8080';

new Vue({
	router,
	store,
	vuetify,
	i18n,
	axios,
	render: h => h(App)
}).$mount('#app');
