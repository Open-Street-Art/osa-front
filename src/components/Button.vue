<template>
	<v-btn
		rounded
		class="button-white"
		color="primary"
		:width="width"
		:outlined="outlined"
		@click="$emit('click', $event)">
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
<style scoped lang="scss">
@import "../assets/styles/text.scss";
.v-btn__content {
  font: $em-font ;
  text-transform: none;
}

.v-btn {
	border-radius: 20px !important;
	box-shadow: none;
}
</style>
