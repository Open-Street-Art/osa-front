<template>
	<v-text-field
		:label="label"
		outlined
		class="light rounded-pill"
		color="light" />
</template>

<script>
export default {
	name: 'TextInput',
	props: {
		label: {
			default: 'default',
			type: String
		}
	},
	watch: {
      	label: function(newVal, oldVal) { // watch it
			console.log('Prop changed: ', newVal, ' | was: ', oldVal);
		}
	}
};
</script>

<style lang="scss">
	@import "../assets/styles/text.scss";
.v-text-field--outlined fieldset {
  border-color: $light-color
}

.v-text-field--outlined.v-input--is-focused fieldset{
	color: $main-color ;
  border-color: $main-color !important
}

.v-text-field--outlined.v-input--is-focused >>> label{
	color: $main-color !important
}

</style>
