import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import Clipboard from 'v-clipboard';
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false;
Vue.use(Clipboard);

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app');
