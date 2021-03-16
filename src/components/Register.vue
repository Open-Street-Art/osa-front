<template>
	<Modal
		v-model="open"
		class="toto"
		@close="$emit('close')">
		<template v-slot:header>
			<Header
				big-header="true"
				title="Titre du modal" />
		</template><br>
		<TextInput
			label-string="Adresse mail"
			show
			:input-rules="[null]" />
		<TextInput
			label-string="Nom d'utiisateur"
			show
			:input-rules="[null]" />
		<TextInput
			label-string="Mot de passe"
			show
			:input-rules="[null]" />
		<TextInput
			label-string="Confirmation de mot de passe"
			show
			:input-rules="[null]" />
		<v-row
			justify="space-between"
			class="v-input__slot">
			<p class="base">
				Profil artiste
			</p>
			<CheckBoxInput />
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
	}
};
</script>

<style lang="scss">
@import "../assets/styles/input.scss";
@import "../assets/styles/text.scss";

.toto {
	z-index: 99999 !important;
}
</style>
