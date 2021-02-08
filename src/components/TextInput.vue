<template>
	<v-text-field
		v-model="input"
		:label="labelString"
		:type="show ? 'text' : 'password'"
		outlined
		class="light rounded-pill"
		color="light"
		:rules="rules"
		dense />
</template>

<script>
export default {
	name: 'TextInput',
	props: {
		labelString: {
			default: 'standard',
			type: String
		},
		show: {
			default: true,
			type: Boolean
		},
		inputRules: {
			default: () => [],
			type: Array
		}
	},
	data: function() {
		return {
			input: '',
			rules: this.inputRules
		};
	},
	watch: {
      	labelString: function(newVal, oldVal) { // watch it
			console.log('Prop changed: ', newVal, ' | was: ', oldVal);
		},
		show: function(newVal, oldVal) {
			console.log('Prop change: ', newVal, ' | was: ', oldVal);
		},
		rules: function(newVal, oldVal) {
			console.log('Prop change: ', newVal, ' | was: ', oldVal);
		},
	}
};
</script>

<style lang="scss">
	@import "../assets/styles/input.scss";
</style>
