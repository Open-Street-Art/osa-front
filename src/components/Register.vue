<template>
	<Modal
		v-model="open"
		class="toto"
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
