<template>
	<v-text-field
		:label="this.$t(labelString)"
		:type="show ? 'text' : 'password'"
		outlined
		class="light rounded-pill"
		color="light"
		:rules="rules"
		dense
		:value="value"
		@input="$emit('update', $event)" />
</template>

<script>

export default {
	name: 'TextInput',
	model: {
		prop: 'value',
		event: 'update'
	},
	props: {
		labelString: {
			type: String,
			default: 'testMessage'
		},
		show: {
			default: true,
			type: Boolean
		},
		inputRules: {
			default: () => [],
			type: Array
		},
		value: {
			default: '',
			type: String
		}
	},
	data: function() {
		return {
			rules: this.inputRules,
		};
	}
};
</script>

<style lang="scss">
	@import "../assets/styles/input.scss";
</style>
