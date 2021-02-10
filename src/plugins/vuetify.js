import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import Pin from '../components/Pin.vue';

Vue.use(Vuetify);

export default new Vuetify({
	icons: {
		iconfont: 'mdiSvg'
	},
	theme: {
		themes: {
			light: {
				primary: '#00BAAF'
			},
		},
	},
	icons: {
		values: {
			pin: {
				component: Pin
			},
		},
	},
});
