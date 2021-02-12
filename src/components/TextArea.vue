<template>
	<v-textarea
		:placeholder="placeholder"
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
			default: 'Default',
			type: String
		},
		rows: {
			default: 160,
			type: Number
		},
		counter: {
			default: 5,
			type: Number
		}
	},
	data: function() {
		return {
			value: ''
		};
	}
};
</script>

<style lang="scss">
	@import "../assets/styles/input.scss";
</style>
