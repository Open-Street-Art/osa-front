import axios from 'axios';

export default {
	methods: {
		registerUser(email, username, psw, confirmPsw, profileType) {
			return axios
				.post('/api/register', {
					email: email,
					username: username,
					password: psw,
					confirmPassword: confirmPsw,
					role: profileType ? 'ROLE_ARTIST' : 'ROLE_USER'
				});
		},
		loginUser(username, psw) {
			return axios
				.post('/api/authenticate', {
					username: username,
					password: psw
				});
		},
		getOwnProfile() {
			return axios.get('/api/user/profile');
		},
		getUserProfile(userId) {
			return axios.get('/api/user/' + userId);
		},
		patchProfile(desc, profilePic, isPublic) {
			return axios.patch('/api/user/profile', {
				description: desc,
				profilePicture: profilePic,
				isPublic: isPublic,
			});
		},
		patchEmail(mail) {
			return axios.patch('/api/user/email', {
				newMail: mail
			});
		},
		patchPassword(oldPassword, newPassword) {
			return axios.patch('/api/user/password', {
				oldPassword: oldPassword,
				newPassword: newPassword
			});
		}
	}
};
