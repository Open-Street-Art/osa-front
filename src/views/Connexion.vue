<template>
	<div class="viewInscription">
		<BaseWrapper>
			<Modal>
				<template v-slot:header>
					<Header
						big-header="true"
						title="Titre du modal" />
				</template>
				<TextInput
					label-string="Adresse mail ou nom d'utilisateur"
					show
					:input-rules="[null]" />
				<TextInput
					label-string="Mot de passe"
					show
					:input-rules="[null]" />	
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
		</BaseWrapper>
	</div>
</template>

<script>
import BaseWrapper from '../components/BaseWrapper.vue';
import TextInput from '../components/TextInput.vue';
import Button from '../components/Button.vue';
import Modal from '../components/Modal.vue';
import Header from '../components/Header.vue';


export default {
	name: 'Connexion',
	components: {
		BaseWrapper,
		TextInput,
		Button,
		Modal,
		Header,
		
	}
};
</script>
<style lang="scss">
@import "../assets/styles/input.scss";
@import "../assets/styles/text.scss";
</style>
