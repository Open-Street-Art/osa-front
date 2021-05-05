import axios from 'axios';

export default {
	methods: {
		searchArts(value) {
			return axios.get('/api/search/arts/' + value);
		},
		searchArtists(value) {
			return axios.get('/api/search/arts/artists/' + value);
		},
		searchCities(value) {
			return axios.get('/api/search/cities/' + value); 
		}
	}
};
