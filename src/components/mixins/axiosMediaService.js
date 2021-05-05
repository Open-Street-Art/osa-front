import axios from 'axios';

export default {
	methods: {
		exportArtsInPDF(cityId) {
			return axios.get('/api/media/pdf/' + cityId, { responseType: 'blob' });
		},
		exportArtsInCSV(cityId) {
			return axios.get('/api/media/csv/' + cityId);
		}
	}
};
