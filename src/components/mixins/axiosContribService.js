import axios from 'axios';

export default {
	methods: {
		postNewContrib(name, desc, pic1, pic2, pic3, authorName, lat, long) {
			return axios
				.post('/api/contribs', {
					name: name,
					description: desc,
					picture1: pic1,
					picture2: pic2,
					picture3: pic3,
					authorName: authorName,
					latitude: lat,
					longitude: long
				});
		},
		postContrib(artId, name, desc, pic1, pic2, pic3, authorName) {
			return axios
				.post('/api/contribs/' + artId, {
					name: name,
					description: desc,
					picture1: pic1,
					picture2: pic2,
					picture3: pic3,
					authorName: authorName
				});
		},
		getContrib(contribId) {
			return axios.get('/api/contribs/' + contribId);
		},
		getOwnContribs() {
			return axios.get('/api/contribs/personnal');
		},
		getUserContribs(userId) {
			return axios.get('/api/contribs/users/' + userId); 
		},
		acceptContrib(contribId) {
			return axios.post('/api/contribs/' + contribId + '/accept');
		},
		denyContrib(contribId) {
			return axios.post('/api/contribs/' + contribId + '/deny');
		},
		removeContrib(contribId) {
			return axios.delete('/api/contribs/' + contribId);
		},
		getUnapprovedContribs() {
			return axios.get('/api/contribs/unapproved');
		}
	}
};
