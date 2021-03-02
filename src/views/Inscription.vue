<template>
	<div class="viewInscription">
		<BaseWrapper>
			<Modal>
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
				<CheckBoxInput />

				<Button
					text-button="Annuler"
					outlined="false" />
				<LocaleChanger />
				<Button
					text-button="Valider"
					outlined="true" />
			</Modal>
		</BaseWrapper>
	</div>
</template>

<script>
import BaseWrapper from '../components/BaseWrapper.vue';
import TextInput from '../components/TextInput.vue';
import CheckBoxInput from '../components/CheckBoxInput.vue';
import Button from '../components/Button.vue';
//import Modal from '../components/Modal.vue';

export default {
	name: 'Inscription',
	components: {
		BaseWrapper,
		TextInput,
		CheckBoxInput,
		Button,
		//Modal
	}
};
</script>
<style lang="scss">
@import "../assets/styles/input.scss";
</style>

