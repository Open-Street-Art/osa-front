<template>
	<v-btn
		class="button-white"
		color="primary"
		:width="width"
		:outlined="outlined">
		{{ this.$t(textButton) }}
	</v-btn>
</template>
<script>
export default {
	name: 'Button',
	props: {
		textButton: {
			default: ' defaultLabel ',
			type: String
		},
		outlined: {
			default: false,
			type: Boolean
		},
		width: {
			default: undefined,
			type: Number
		}
	},
	data: function() {
		return {
			button: '',
		};
	}
};
</script>
<style lang="scss">
@import "../assets/styles/text.scss";
.v-btn__content { 
  font: $em-font;
  text-transform: none;
}
</style>
