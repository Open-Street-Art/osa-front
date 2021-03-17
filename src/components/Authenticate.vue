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
			<v-row class="mt-2">
				<TextInput
					v-model="username"
					:label-string="this.$t('authenticate.username')"
					:input-rules="[null]" />
			</v-row>
			<v-row>
				<TextInput
					v-model="password"
					:label-string="this.$t('authenticate.password')"
					:show="false"
					:input-rules="[null]" />
			</v-row>
			<v-divider />
			<v-row class="mt-5">
				<v-col>
					<Button
						:text-button="this.$t('authenticate.cancel')"
						:outlined="true" />
				</v-col>
				<v-col>
					<Button
						:text-button="this.$t('authenticate.login')"
						@click="sendAuthentication" />
				</v-col>
			</v-row>
		</v-container>
	</Modal>
</template>

<script>
import TextInput from '../components/TextInput.vue';
import Modal from '../components/Modal.vue';
import Button from '../components/Button.vue';
import Header from  '../components/Header.vue';
import axios from 'axios';

export default {
	name: 'Authenticate',
	components: {
		TextInput,
		Modal,
		Button,
		Header
	},
	props: {
		data: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			username: '',
			password: ''
		};
	},
	methods: {
		sendAuthentication() {
			axios
				.post('/api/authenticate', {
					username: this.username,
					password: this.password
				})
				.then((response) => {
					localStorage.setItem('authToken', response.data.data.token);
					axios.defaults.headers.common = { 'Authorization': `bearer ${response.data.data.token}` };
				})
				.catch((error) => console.error(error));
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

</style>
