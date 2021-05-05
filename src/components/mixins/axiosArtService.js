import axios from 'axios';

export default {
	methods: {
		deleteArt(artId) {
			return axios.delete('/api/admin/arts/' + artId);
		},
		getArt(artId) {
			return axios.get('/api/arts/' + artId);
		},
		postArt(name, desc, pic1, pic2, pic3, artistName, lat, long) {
			return axios
				.post('/api/admin/arts', {
					name: name,
					description: desc,
					picture1: pic1,
					picture2: pic2,
					picture3: pic3,
					author: artistName,
					latitude: lat,
					longitude: long
				});
		},
		patchArt(artId, name, desc, pic1, pic2, pic3, artistName) {
			return axios
				.patch('/api/admin/arts/' + artId, {
					name: name,
					description: description,
					picture1: pic1,
					picture2: pic2,
					picture3: pic3,
					author: artistName,
				});
		}
	}
};
