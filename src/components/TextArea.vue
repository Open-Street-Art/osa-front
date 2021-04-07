<template>
	<v-textarea
		:placeholder="this.$t(placeholder)"
		outlined
		:counter="counter"
		rounded
		no-resize
		:rows="rows"
		:value="value"
		@input="$emit('update', $event)" />
</template>

<script>
export default {
	name: 'TextArea',
	model: {
		prop: 'value',
		event: 'update'
	},
	props: {
		placeholder: {
			default: 'defaultLabel',
			type: String
		},
		rows: {
			default: 5,
			type: Number
		},
		counter: {
			default: 160,
			type: Number
		},
		value: {
			default: '',
			type: String
		}
	},
};
</script>

<style lang="scss">
	@import "../assets/styles/input.scss";
</style>
