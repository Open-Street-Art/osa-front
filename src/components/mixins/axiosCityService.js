import axios from 'axios';

export default {
	methods: {
		getCity(cityId) {
			return axios.get('/api/cities/' + cityId);
		},
		getCityArts(cityId) {
			return axios.get('/api/cities/' + cityId + '/arts');
		},
	}
};
