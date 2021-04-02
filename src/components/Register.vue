<template>
	<Modal
		v-model="open"
		@close="$emit('close')">
		<Header class="header">
			<h1 class="header-text header-title">
				{{ this.$t('register.title') }}
			</h1>
		</Header>
		<v-container class="container">
			<TextInput
				v-model="email"
				label-string="register.email"
				show
				:input-rules="rules.mail" />
			<TextInput
				v-model="username"
				label-string="register.username"
				show
				:input-rules="rules.username" />
			<TextInput
				v-model="password"
				label-string="register.password"
				:show="false"
				:input-rules="rules.password" />
			<TextInput
				v-model="confirmPassword"
				label-string="register.confirmPassword"
				:show="false"
				:input-rules="rules.confirmPassword" />
			<v-row class="align-center d-flex justify-space-between pa-0 px-3">
				<p class="base ml-1">
					{{ this.$t("register.profilType") }}
				</p>
				<CheckBoxInput class="pt-0 pb-1" />
			</v-row>
		</v-container>
		<v-container
			class="buttons">
			<v-divider />
			<v-row
				class="footer justify-space-around">
				<Button
					:width="155"
					text-button="register.cancel"
					:outlined="true"
					@click="$emit('close')" />
				<Button
					:width="155"
					text-button="register.validate"
					:outlined="false"
					@click="register" />
			</v-row>
		</v-container>
		<snackbar
			v-model="error"
			color="error"
			content="register.error" />
	</Modal>
</template>

<script>
import TextInput from './TextInput.vue';
import CheckBoxInput from './CheckBoxInput.vue';
import Button from './Button.vue';
import Modal from './Modal.vue';
import Header from './Header.vue';
import axios from 'axios';
import router from '../router';
import Snackbar from './Snackbar.vue';

export default {
	name: 'Register',
	components: {
		TextInput,
		CheckBoxInput,
		Button,
		Modal,
		Header,
		Snackbar
	},
	model: {
		prop: 'open',
		event: 'update'
	},
	props: {
		open: {
			type: Boolean,
			default:false
		},
	},
	data() {
		var regexNumber = new RegExp('[0-9]');
		var regexMaj = new RegExp('[A-Z]');
		var regexMail = new RegExp('.+@.+\..+');
		return {
			rules: { // Modèle des règles : (val) => condition(s) || Message d'erreur
				mail: [(val) => regexMail.test((val || '')) || 'Mail invalide'],
				username: [(val) => (val || '').length > 0 || "Nom d'utilisateur trop court"],
				password: [(val) => (val || '').length > 8 || 'Mot de passe trop court',
					(val) => regexNumber.test((val || '')) || 'Le mot de passe doit contenir un chiffre',
					(val) => regexMaj.test((val || '')) || 'Le mot de passe doit contenir une majuscule'],
				confirmPassword: [(val) => val == this.password || 'Les mots de passe ne correspondent pas']
			},
			email: '',
			username: '',
			password: '',
			confirmPassword: '',
			role: 'ROLE_USER',
			error: false
		};
	},
	methods: {
		changeRole() {
			if(this.role === 'ROLE_USER') {
				this.role = 'ROLE_ARTIST';
			}
			else {
				this.role = 'ROLE_USER';
			}
		},
		register() {
			axios
				// requête post vers la route du back en lui donnant les arguments attendu
				.post('/api/register', {
					email: this.email,
					username: this.username,
					password:this.password,
					confirmPassword: this.confirmPassword,
					role: this.role
				})
				// le bloc then est exécuté lorsque le back renvoie la réponse car axios est asynchrone (système de promesse)
				.then((response) => {
					axios
						.post('/api/authenticate', {
							username: this.username,
							password: this.password
						})
						.then((response) => {
							localStorage.setItem('authtoken',response.data.data.token);
							axios.defaults.headers.common = {'Authorization': `Bearer ${response.data.data.token}`};
							router.push('/');
							router.go();
						})
						.catch((error) => console.error(error));
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

.center{
	text-align: center;
}

.footer {
	margin-top: 12px;
	margin-bottom: 12px;
}

.buttons {
	position: absolute;
	bottom:0%;
	left:0%;
	padding-bottom:0%;
}

.v-bottom-sheet .buttons {
	bottom: 10px;
}

</style>
