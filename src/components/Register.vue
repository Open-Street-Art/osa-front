<template>
	<Modal
		v-model="open"
		@close="$emit('close')">
		<Header><h1 class="center emphase" /></Header>
		<Header>
			<h1 class="center emphase">
				Inscription
			</h1>
		</Header>
		<br>
		<div class="left right">
			<TextInput
				v-model="email"
				label-string="register.email"
				show
				:input-rules="[null]" />
			<LocaleChanger />
			<TextInput
				label-string="register.username"
				show
				:input-rules="[null]" />
			<LocaleChanger />
			<TextInput
				label-string="register.password"
				show
				:input-rules="[null]" />
			<LocaleChanger />
			<TextInput
				label-string="register.confirmPassword"
				show
				:input-rules="[null]" />
			<LocaleChanger />
			<div class="row">
				<div class="col-9 v-input__slot">
					<p class="base">
						Profil artiste
					</p>
				</div>
				<div
					class="col-3">
					<CheckBoxInput class="c" />
				</div>
			</div>
			<br>
			
			<v-divider class="top" />
			<v-row />
			<v-row
				justify="space-between">
				<Button
					text-button="register.cancel"
					:outlined="true"
					class="mx-auto my-4 logButton" />
				<LocaleChanger />
				<Button
					text-button="register.validate"
					:outlined="false"
					class="mx-auto my-4 logButton" />
				<LocaleChanger />
			</v-row>
			<div class="left right" />
		</div>
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

.toto {
	z-index: 99999 !important;
}
.center{
	text-align: center;
}
.left{
margin-left:20px;
}
.right{
margin-right:20px;
}
.top{
margin-top:40%;	
}
.logButton {
	width: 48%;
}
.c{	
margin-right:0%;
}
</style>
