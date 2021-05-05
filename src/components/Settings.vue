<template>
	<Modal
		v-model="open"
		@close="settingsClosing">
		<Header class="header">
			<h1 class="header-text header-title">
				{{ this.$t('settings.title') }}
			</h1>
		</Header>
		<v-container
			v-if="!(onEmailMenu || onPswMenu)"
			class="menu">
			<actions-menu :outlined="true">
				<ActionsMenuItem
					icon="mdi-email"
					content="settings.changeEmail"
					@click="changeEmail" />
				<v-divider class="mx-auto" />
				<ActionsMenuItem
					icon="mdi-key"
					content="settings.changePsw"
					@click="changePsw" />
			</actions-menu>
		</v-container>
		<v-container
			v-if="onEmailMenu">
			<v-form v-model="valid">
				<TextInput
					v-model="mail"
					label-string="settings.newEmail"
					show
					:input-rules="rules.mail" />
				<TextInput
					v-model="confirmMail"
					label-string="settings.confirmEmail"
					show
					:input-rules="rules.confirmMail" />
			</v-form>
		</v-container>
		<v-container
			v-if="onPswMenu">
			<v-form v-model="valid">
				<TextInput
					v-model="oldPassword"
					label-string="settings.oldPsw" />
				<TextInput
					v-model="newPassword"
					label-string="settings.newPsw"
					:input-rules="rules.password" />
				<TextInput
					v-model="confirmPassword"
					label-string="settings.confirmPsw"
					:input-rules="rules.confirmPassword" />
			</v-form>
		</v-container>
		<v-container
			v-if="onEmailMenu || onPswMenu"
			class="buttons">
			<v-divider />
			<v-row
				class="footer justify-space-around">
				<Button
					:width="155"
					text-button="settings.cancel"
					:outlined="true"
					@click="cancelAction" />
				<Button
					:width="155"
					text-button="settings.save"
					:outlined="false"
					@click="save" />
			</v-row>
		</v-container>
	</Modal>
</template>

<script>
import Button from './Button.vue';
import Modal from './Modal.vue';
import Header from './Header.vue';
import ActionsMenu from './ActionsMenu.vue';
import ActionsMenuItem from './ActionsMenuItem.vue';
import TextInput from './TextInput.vue';
import axios from 'axios';
import { EventBus } from '@/event-bus';
import axiosUserService from './mixins/axiosUserService';

export default {
	name: 'Settings',
	components: {
		Button,
		Modal,
		Header,
		ActionsMenu,
		ActionsMenuItem,
		TextInput
	},
	mixins: [
		axiosUserService
	],
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
				confirmMail: [(val) => val == this.mail || 'Les addresses mails ne correspondent pas'],
				password: [(val) => (val || '').length > 8 || 'Mot de passe trop court',
					(val) => regexNumber.test((val || '')) || 'Le mot de passe doit contenir un chiffre',
					(val) => regexMaj.test((val || '')) || 'Le mot de passe doit contenir une majuscule'],
				confirmPassword: [(val) => val == this.newPassword || 'Les mots de passe ne correspondent pas']
			},
			onEmailMenu: false,
			onPswMenu: false,
			mail: '',
			confirmMail: '',
			oldPassword: '',
			newPassword: '',
			confirmPassword: '',
			valid: false
		};
	},
	methods: {
		changeEmail() {
			this.onEmailMenu = true;
		},
		changePsw() {
			this.onPswMenu = true;
		},
		settingsClosing() {
			this.onPswMenu = false;
			this.onEmailMenu = false;
			this.mail = '';
			this.confirmMail = '';
			this.oldPassword = '';
			this.newPassword = '';
			this.confirmPassword = '';
			this.$emit('close');
		},
		cancelAction() {
			this.onPswMenu = false;
			this.onEmailMenu = false;
		},
		save() {
			if (this.onEmailMenu && this.valid) {
				this.patchEmail(this.mail).then((response) => {
					EventBus.$emit('success', 'settings.emailModified');
					this.settingsClosing();
				}).catch((error) => console.error(error));
			}
			else if (this.onPswMenu && this.valid) {
				this.patchPassword(this.oldPassword, this.newPassword)
					.then((response) => {
						EventBus.$emit('success', 'settings.pswModified');
						this.settingsClosing();
					})
					.catch((error) => console.error(error));
			}
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
