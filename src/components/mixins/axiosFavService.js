import axios from 'axios';

export default {
	methods: {
		addArtToFavourites(artId) {
			return axios.post('/api/fav/arts/' + artId);
		},
		removeArtFromFavourites(artId) {
			return axios.delete('/api/fav/arts/' + artId);
		},
		addCityToFavourites(cityId) {
			return axios.post('/api/fav/cities/' + cityId);
		},
		removeCityFromFavourites(cityId) {
			return axios.delete('/api/fav/cities/' + cityId);
		},
		addArtistToFavourites(userId) {
			return axios.post('/api/fav/artists/' + userId);
		},
		removeArtistFromFavourites(userId) {
			return axios.delete('/api/fav/artists/' + userId); 
		}
	}
};
