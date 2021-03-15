import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		appLanguage: localStorage.getItem('appLanguage') || process.env.VUE_APP_I18N_LOCALE || 'fr'
	},
	getters: {
		getAppLanguage: (state) => state.appLanguage
	},
	mutations: {
		setAppLanguage(state, language) {
			state.appLanguage = language;
			localStorage.setItem('appLanguage', language);
			console.log('test : '+localStorage.getItem('appLanguage'));
		}
	},
	actions: {},
	modules: {}
});
