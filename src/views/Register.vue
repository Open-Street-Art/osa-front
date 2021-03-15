<template>
	<div class="viewInscription">
		<BaseWrapper>
			<v-btn
				class="tempButton"
				color="primary"
				fab="">
				Clic
			</v-btn>
			<Modal :value="false">
				<Header />
				<Header>
					<h1 class="center emphase">
						Inscription
					</h1>
				</Header>
				<br>
				<div class="left right">
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
					<v-divider class="top" />
					<v-row
						justify="space-between">
						<Button
							class="mx-auto my-4 logButton"
							text-button="Annuler"
							:outlined="true" />
						<Button
							class="mx-auto my-4 logButton"
							text-button="Valider"
							:outlined="false" />
					</v-row>
				</div>
			</Modal>
		</BaseWrapper>
	</div>
</template>

<script>
import BaseWrapper from '../components/BaseWrapper.vue';
import TextInput from '../components/TextInput.vue';
import CheckBoxInput from '../components/CheckBoxInput.vue';
import Button from '../components/Button.vue';
import Modal from '../components/Modal.vue';
import Header from '../components/Header.vue';


export default {
	name: 'Inscription',
	components: {
		BaseWrapper,
		TextInput,
		CheckBoxInput,
		Button,
		Modal,
		Header,
		
	}
};
</script>
<style lang="scss">
@import "../assets/styles/input.scss";
@import "../assets/styles/text.scss";
.center{
	text-align: center;
}
.left{
margin-left:50px;
}
.right{
margin-right:50px;
}
.top{
margin-top:120px;	
}
.logButton {
	width: 48%;
}
</style>
