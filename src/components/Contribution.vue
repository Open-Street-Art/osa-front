<template>
			<Modal>
				<template v-slot:header>
					<Header
						big-header="true"
						title="Contribution à une œuvre" />
				</template><br>
				<MediaInput />
				<MediaInput />
				<MediaInput />
				<TextInput
					label-string="Nom de l’œuvre"
					show
					:input-rules="[null]" />
				<TextInput
					label-string="Artiste"
					show
					:input-rules="[null]" />
				<TextArea
					placeholder="Description de l’œuvre"
					show
					:input-rules="[null]" />
        <Button
					text-button="Placer l’œuvre sur la carte"
					:outlined="false" 
          :width="323" />
        <br><v-divider /><br>
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
import TextInput from '../components/TextInput.vue';
import TextArea from '../components/TextArea.vue';
import Button from '../components/Button.vue';
import Modal from '../components/Modal.vue';
import Header from '../components/Header.vue';


export default {
	name: 'Contribution',
	components: {
		TextInput,
		TextArea,
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
