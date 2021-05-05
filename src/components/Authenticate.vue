<template>
	<Modal
		v-model="data"
		@close="$emit('close')">
		<Header
			class="header">
			<h1 class="header-text header-title">
				{{ this.$t('authenticate.title') }}
			</h1>
		</Header>
		<v-container>
			<v-container>
				<v-row class="mt-2">
					<TextInput
						v-model="username"
						label-string="authenticate.username" />
				</v-row>
				<v-row>
					<TextInput
						v-model="password"
						label-string="authenticate.password"
						:show="false" />
				</v-row>
			</v-container>
		</v-container>
		<v-container
			class="buttons">
			<v-divider />
			<v-row class="footer justify-space-around">
				<Button
					:width="155"
					text-button="authenticate.cancel"
					:outlined="true"
					@click="$emit('close')" />
				<Button
					:width="155"
					text-button="authenticate.login"
					@click="sendAuthentication" />
			</v-row>
		</v-container>
		<snackbar
			v-model="error"
			color="error"
			content="authenticate.error" />
	</Modal>
</template>

<script>
import TextInput from '../components/TextInput.vue';
import Modal from '../components/Modal.vue';
import Button from '../components/Button.vue';
import Header from  '../components/Header.vue';
import router from '../router';
import Snackbar from './Snackbar.vue';
import axiosUserService from './mixins/axiosUserService';
import axios from 'axios';

export default {
	name: 'Authenticate',
	components: {
		TextInput,
		Modal,
		Button,
		Header,
		Snackbar
	},
	mixins: [
		axiosUserService
	],
	props: {
		data: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			username: '',
			password: '',
			error: false
		};
	},
	methods: {
		sendAuthentication() {
			this.loginUser(this.username, this.password)
				.then((response) => {
					localStorage.setItem('authtoken', response.data.data.token);
					axios.defaults.headers.common = { 'Authorization': `Bearer ${response.data.data.token}` };
					router.push('/');
					router.go();
				})
				.catch((error) => {
					console.error(error);
					this.error = true;
				});
		}
	}
};
</script>

<style scoped lang="scss">
@import "../assets/styles/input.scss";
@import "../assets/styles/text.scss";

.header {
	min-height: 100px;
}

.header-text {
	margin-top: 58px;
	text-align: center;
}

.footer {
	margin-top: 12px;
	margin-bottom: 12px;
}

.buttons {
	position: absolute;
	bottom:0%;
	left: 50%;
	transform: translateX(-50%);
	padding-bottom:0%;
}

.v-bottom-sheet .buttons {
	bottom: 10px;
}

</style>
