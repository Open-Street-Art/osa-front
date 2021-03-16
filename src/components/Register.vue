<template>
	<Modal
		v-model="open"
		@close="$emit('close')">
		<template v-slot:header>
			<Header
				big-header="true"
				title="Titre du modal" />
		</template><br>
		<TextInput
			v-model="email"
			label-string="register.mailLabel"
			show
			:input-rules="rules.mail" />
		<TextInput
			v-model="username"
			label-string="Nom d'utiisateur"
			show
			:input-rules="rules.username" />
		<TextInput
			v-model="password"
			label-string="Mot de passe"
			show
			:input-rules="rules.password" />
		<TextInput
			v-model="confirmPassword"
			label-string="Confirmation de mot de passe"
			show
			:input-rules="rules.confirmPassword" />
		<v-row
			justify="space-between"
			class="v-input__slot">
			<p class="base">
				Profil artiste
			</p>
			<CheckBoxInput @update="changeRole" />
		</v-row><br>
		<v-divider /><br>
		<v-row justify="space-between">
			<Button
				text-button="Annuler"
				:outlined="true"
				:width="235" />
			<LocaleChanger />
			<Button
				text-button="Valider"
				:outlined="false"
				:width="235" />
		</v-row>
	</Modal>
</template>

<script>
import TextInput from './TextInput.vue';
import CheckBoxInput from './CheckBoxInput.vue';
import Button from './Button.vue';
import Modal from './Modal.vue';
import Header from './Header.vue';
import axios from 'axios';

export default {
	name: 'Register',
	components: {
		TextInput,
		CheckBoxInput,
		Button,
		Modal,
		Header,

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
			role: 'ROLE_USER'

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

				})
				.catch((error) => console.error(error));
		}
	}
};
</script>

<style lang="scss">
@import "../assets/styles/input.scss";
@import "../assets/styles/text.scss";
</style>
